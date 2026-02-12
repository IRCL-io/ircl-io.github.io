#!/usr/bin/env python3
import math
import re
from fractions import Fraction
from pathlib import Path
import tkinter as tk
from tkinter import ttk
from tkinter import font as tkfont
import webbrowser

DB_PATH = Path("cards/IRCL_TTDB.md")

REFRESH_MS = 1500
ANIMATION_MS = 16
CYCLE_START_DELAY_MS = 3000
CYCLE_STEP_MS = 3000
SELECT_SCALE_EXP = 4.0


class NavigatorApp(tk.Tk):
    def __init__(self) -> None:
        super().__init__()
        self.title("IRCL TTDB Navigator")
        self.geometry("1200x800")
        self.minsize(900, 600)

        self._file_mtimes = {}
        self._auto_refresh = tk.BooleanVar(value=True)
        self._db_records: dict[str, dict] = {}
        self._db_order: list[str] = []
        self._db_selected_id: str | None = None
        self._db_coords: dict[str, tuple[float, float]] = {}

        self._globe_rot_lat = 0.0
        self._globe_rot_lon = 0.0
        self._globe_target_lat = 0.0
        self._globe_target_lon = 0.0
        self._globe_animating = False
        self._globe_items: dict[int, str] = {}
        self._globe_item_meta: dict[int, dict] = {}
        self._image_cache: dict[str, tk.PhotoImage] = {}
        self._image_scaled_cache: dict[tuple[str, int, int], tk.PhotoImage] = {}
        self._cycle_after_id: str | None = None
        self._cycle_list: list[str] = []
        self._cycle_index = 0
        self._cycle_source_id: str | None = None

        self._init_fonts()
        self._build_ui()
        self._refresh_all(force=True)
        self.after(REFRESH_MS, self._poll_files)

    def _init_fonts(self) -> None:
        base = tkfont.nametofont("TkDefaultFont")
        self.font_body = base.copy()
        self.font_body.configure(size=11)

        self.font_h1 = base.copy()
        self.font_h1.configure(size=18, weight="bold")
        self.font_h2 = base.copy()
        self.font_h2.configure(size=16, weight="bold")
        self.font_h3 = base.copy()
        self.font_h3.configure(size=14, weight="bold")
        self.font_h4 = base.copy()
        self.font_h4.configure(size=13, weight="bold")

        self.font_code = tkfont.Font(
            family="Courier New",
            size=10,
        )

    def _build_ui(self) -> None:
        top = ttk.Frame(self, padding=10)
        top.pack(fill="x")

        self.current_selection_var = tk.StringVar(value="Selected: (loading)")
        current_selection = ttk.Label(
            top,
            textvariable=self.current_selection_var,
            font=("TkDefaultFont", 12, "bold"),
        )
        current_selection.pack(side="left")

        refresh_btn = ttk.Button(top, text="Refresh", command=self._refresh_all)
        refresh_btn.pack(side="right")

        auto_refresh = ttk.Checkbutton(
            top,
            text="Auto refresh",
            variable=self._auto_refresh,
            onvalue=True,
            offvalue=False,
        )
        auto_refresh.pack(side="right", padx=(0, 12))

        pane = ttk.Panedwindow(self, orient="horizontal")
        pane.pack(fill="both", expand=True)

        left = ttk.Frame(pane, padding=(8, 8, 4, 8))
        right = ttk.Frame(pane, padding=(4, 8, 8, 8))
        pane.add(left, weight=1)
        pane.add(right, weight=3)

        list_label = ttk.Label(left, text="Records")
        list_label.pack(anchor="w")

        self.db_listbox = tk.Listbox(
            left,
            font=self.font_body,
            background="#111318",
            foreground="#e9e9f0",
            selectbackground="#364156",
            selectforeground="#ffffff",
            relief="flat",
            activestyle="none",
        )
        self.db_listbox.pack(side="left", fill="both", expand=True)
        list_scroll = ttk.Scrollbar(left, orient="vertical", command=self.db_listbox.yview)
        list_scroll.pack(side="right", fill="y")
        self.db_listbox.configure(yscrollcommand=list_scroll.set)
        self.db_listbox.bind("<<ListboxSelect>>", self._on_db_list_select)

        globe_frame = ttk.Frame(right)
        globe_frame.pack(fill="both", expand=True)

        self.globe = tk.Canvas(
            globe_frame,
            background="#08090c",
            highlightthickness=0,
        )
        self.globe.pack(fill="both", expand=True)
        self.globe.bind("<Configure>", self._on_globe_resize)
        self.globe.bind("<Button-1>", self._on_globe_click)

    def _poll_files(self) -> None:
        if self._auto_refresh.get():
            self._refresh_all()
        self.after(REFRESH_MS, self._poll_files)

    def _refresh_all(self, force: bool = False) -> None:
        db_text = self._read_if_changed(DB_PATH, force=force)
        if db_text is not None:
            self._update_db_data(db_text)

    def _read_if_changed(self, path: Path, force: bool = False) -> str | None:
        try:
            stat = path.stat()
        except FileNotFoundError:
            return f"File not found: {path}"

        last = self._file_mtimes.get(path)
        if not force and last == stat.st_mtime:
            return None

        self._file_mtimes[path] = stat.st_mtime
        return path.read_text(encoding="utf-8")

    def _update_db_data(self, content: str) -> None:
        if content.startswith("File not found:"):
            self._db_records = {}
            self._db_order = []
            self._db_selected_id = None
            self._db_coords = {}
            self._populate_db_list()
            self._render_globe()
            self._update_header()
            self._cancel_cycle()
            return

        records, order, selected, coords = self._parse_db_records(content)
        self._db_records = records
        self._db_order = order
        self._db_coords = coords
        self._image_cache = {}
        self._image_scaled_cache = {}

        if self._db_selected_id not in self._db_records:
            self._db_selected_id = selected or (order[0] if order else None)

        self._populate_db_list()
        self._update_header()
        self._center_on_selected()
        self._render_globe()
        self._schedule_cycle_from_selected()

    def _parse_db_records(
        self, content: str
    ) -> tuple[dict, list[str], str | None, dict[str, tuple[float, float]]]:
        selected = None
        cursor_match = re.search(r"```cursor(.*?)```", content, re.S)
        if cursor_match:
            in_selected = False
            for line in cursor_match.group(1).splitlines():
                stripped = line.strip()
                if stripped.startswith("selected:"):
                    in_selected = True
                    continue
                if in_selected:
                    item_match = re.match(r"-\s*(\S+)", stripped)
                    if item_match:
                        selected = item_match.group(1)
                        break
                    if stripped and not stripped.startswith("-"):
                        break

        records: dict[str, dict] = {}
        order: list[str] = []
        coords: dict[str, tuple[float, float]] = {}
        for block in re.split(r"^\s*---+\s*$", content, flags=re.M):
            lines = [line.rstrip("\n") for line in block.splitlines()]
            header_index = None
            for idx, line in enumerate(lines):
                if line.startswith("@"):
                    header_index = idx
                    break
            if header_index is None:
                continue
            header_line = lines[header_index].strip()
            record_id = header_line.split()[0]
            body = "\n".join(lines[header_index + 1 :]).strip("\n")
            title = None
            for line in body.splitlines():
                title_match = re.match(r"^##\s+(.*)$", line)
                if title_match:
                    title = title_match.group(1).strip()
                    break
            card_image = self._extract_card_image(body)
            url = self._extract_field_value(body, ("URL",))

            edges = []
            relates_match = re.search(r"relates:([^|]+)", header_line)
            if relates_match:
                for token in relates_match.group(1).split(","):
                    token = token.strip()
                    if not token:
                        continue
                    if ">" in token:
                        edge_type, target = token.split(">", 1)
                    else:
                        edge_type, target = "relates", token
                    edges.append(
                        {
                            "type": edge_type.strip(),
                            "target": target.strip(),
                        }
                    )

            record_coords = self._parse_coords(record_id)
            if record_coords:
                coords[record_id] = record_coords

            records[record_id] = {
                "header": header_line,
                "body": body,
                "title": title,
                "edges": edges,
                "card_image": card_image,
                "url": url,
            }
            order.append(record_id)

        return records, order, selected, coords

    def _parse_coords(self, record_id: str) -> tuple[float, float] | None:
        match = re.match(r"@LAT(-?\d+(?:\.\d+)?)LON(-?\d+(?:\.\d+)?)", record_id)
        if not match:
            return None
        lat = float(match.group(1))
        lon = float(match.group(2))
        return lat, lon

    def _populate_db_list(self) -> None:
        self.db_listbox.delete(0, "end")
        for record_id in self._db_order:
            title = self._db_records.get(record_id, {}).get("title")
            label = f"{record_id} - {title}" if title else record_id
            self.db_listbox.insert("end", label)

        if self._db_selected_id in self._db_order:
            idx = self._db_order.index(self._db_selected_id)
            self.db_listbox.selection_set(idx)
            self.db_listbox.activate(idx)
            self.db_listbox.see(idx)

    def _on_db_list_select(self, event: tk.Event) -> None:
        selection = self.db_listbox.curselection()
        if not selection:
            return
        record_id = self._db_order[selection[0]]
        self._select_db_record(record_id, from_list=True)

    def _select_db_record(
        self,
        record_id: str | None,
        from_list: bool = False,
        from_cycle: bool = False,
    ) -> None:
        if not record_id or record_id not in self._db_records:
            return
        self._db_selected_id = record_id
        if not from_list and record_id in self._db_order:
            idx = self._db_order.index(record_id)
            self.db_listbox.selection_clear(0, "end")
            self.db_listbox.selection_set(idx)
            self.db_listbox.activate(idx)
            self.db_listbox.see(idx)
        self._update_header()
        self._center_on_selected()
        self._render_globe()
        if not from_cycle:
            self._schedule_cycle_from_selected()

    def _update_header(self) -> None:
        if self._db_selected_id:
            label = self._get_record_label(self._db_selected_id)
            self.current_selection_var.set(f"Selected: {label}")
        else:
            self.current_selection_var.set("Selected: (none)")

    def _schedule_cycle_from_selected(self) -> None:
        self._cancel_cycle()
        source_id = self._db_selected_id
        if not source_id:
            return
        record = self._db_records.get(source_id, {})
        edges = record.get("edges", [])
        bots = [
            edge.get("target")
            for edge in edges
            if edge.get("type") == "has_bot" and edge.get("target") in self._db_records
        ]
        if not bots:
            return
        self._cycle_source_id = source_id
        self._cycle_list = bots
        self._cycle_index = 0
        self._cycle_after_id = self.after(CYCLE_START_DELAY_MS, self._cycle_step)

    def _cancel_cycle(self) -> None:
        if self._cycle_after_id:
            self.after_cancel(self._cycle_after_id)
        self._cycle_after_id = None
        self._cycle_list = []
        self._cycle_index = 0
        self._cycle_source_id = None

    def _cycle_step(self) -> None:
        if not self._cycle_list or not self._cycle_source_id:
            self._cancel_cycle()
            return
        record_id = self._cycle_list[self._cycle_index]
        self._cycle_index = (self._cycle_index + 1) % len(self._cycle_list)
        if record_id in self._db_records:
            self._select_db_record(record_id, from_cycle=True)
        self._cycle_after_id = self.after(CYCLE_STEP_MS, self._cycle_step)

    def _center_on_selected(self) -> None:
        record_id = self._db_selected_id
        if not record_id:
            return
        coords = self._db_coords.get(record_id)
        if not coords:
            return
        lat, lon = coords
        # Rotate so the selected point is centered on the front of the globe.
        lat_r = math.radians(lat)
        lon_r = math.radians(lon)
        x = math.cos(lat_r) * math.sin(lon_r)
        y = math.sin(lat_r)
        z = math.cos(lat_r) * math.cos(lon_r)
        rot_lon = -math.atan2(x, z)
        z1 = math.hypot(x, z)
        rot_lat = math.atan2(y, z1)
        self._globe_target_lat = rot_lat
        self._globe_target_lon = rot_lon
        if not self._globe_animating:
            self._globe_animating = True
            self.after(ANIMATION_MS, self._animate_globe)

    def _animate_globe(self) -> None:
        if not self._globe_animating:
            return

        delta_lat = self._angle_delta(self._globe_target_lat, self._globe_rot_lat)
        delta_lon = self._angle_delta(self._globe_target_lon, self._globe_rot_lon)

        if abs(delta_lat) < 0.002 and abs(delta_lon) < 0.002:
            self._globe_rot_lat = self._globe_target_lat
            self._globe_rot_lon = self._globe_target_lon
            self._globe_animating = False
            self._render_globe()
            return

        self._globe_rot_lat += delta_lat * 0.15
        self._globe_rot_lon += delta_lon * 0.15
        self._render_globe()
        self.after(ANIMATION_MS, self._animate_globe)

    def _angle_delta(self, target: float, current: float) -> float:
        delta = target - current
        while delta > math.pi:
            delta -= 2 * math.pi
        while delta < -math.pi:
            delta += 2 * math.pi
        return delta

    def _on_globe_resize(self, event: tk.Event) -> None:
        self._render_globe()

    def _on_globe_click(self, event: tk.Event) -> None:
        item = self.globe.find_withtag("current")
        if not item:
            return
        record_id = self._globe_items.get(item[0])
        if not record_id:
            return
        if record_id != self._db_selected_id:
            self._select_db_record(record_id)
            return
        meta = self._globe_item_meta.get(item[0], {})
        if meta.get("z", 0) >= 0.95:
            url = self._db_records.get(record_id, {}).get("url")
            if url:
                webbrowser.open(url)

    def _project_point(self, lat: float, lon: float) -> tuple[float, float, float]:
        lat_r = math.radians(lat)
        lon_r = math.radians(lon)

        x = math.cos(lat_r) * math.sin(lon_r)
        y = math.sin(lat_r)
        z = math.cos(lat_r) * math.cos(lon_r)

        rot_y = self._globe_rot_lon
        cos_y = math.cos(rot_y)
        sin_y = math.sin(rot_y)
        x1 = x * cos_y + z * sin_y
        z1 = -x * sin_y + z * cos_y

        rot_x = self._globe_rot_lat
        cos_x = math.cos(rot_x)
        sin_x = math.sin(rot_x)
        y1 = y * cos_x - z1 * sin_x
        z2 = y * sin_x + z1 * cos_x

        return x1, y1, z2

    def _render_globe(self) -> None:
        globe = self.globe
        globe.delete("all")
        self._globe_items = {}
        self._globe_item_meta = {}

        width = max(globe.winfo_width(), 200)
        height = max(globe.winfo_height(), 200)
        padding = 6
        radius = width / 2 - padding
        if radius <= 10:
            return

        cx = width / 2
        cy = height / 2

        globe.create_oval(
            cx - radius,
            cy - radius,
            cx + radius,
            cy + radius,
            fill="#0e1117",
            outline="#2a2f3a",
            width=2,
        )
        globe.create_oval(
            cx - radius * 0.92,
            cy - radius * 0.92,
            cx + radius * 0.92,
            cy + radius * 0.92,
            outline="#141824",
            width=1,
        )

        self._draw_graticule(cx, cy, radius)

        if not self._db_coords:
            return

        selected = self._db_selected_id
        nodes_front = []
        nodes_back = []
        selected_point = None
        projections: dict[str, tuple[float, float, float]] = {}
        for record_id, (lat, lon) in self._db_coords.items():
            x, y, z = self._project_point(lat, lon)
            projections[record_id] = (x, y, z)
            if record_id == selected:
                selected_point = (record_id, x, y, z)
            elif z > 0:
                nodes_front.append((record_id, x, y, z))
            else:
                nodes_back.append((record_id, x, y, z))

        for record_id, x, y, z in nodes_back:
            px = cx + x * radius
            py = cy - y * radius
            size = 3
            globe.create_oval(
                px - size,
                py - size,
                px + size,
                py + size,
                fill="#2b303b",
                outline="",
            )

        # Draw typed edges for visible nodes.
        for source_id, record in self._db_records.items():
            edges = record.get("edges", [])
            if not edges:
                continue
            source_proj = projections.get(source_id)
            if not source_proj:
                continue
            sx, sy, sz = source_proj
            if sz <= 0:
                continue
            sxp = cx + sx * radius
            syp = cy - sy * radius
            for edge in edges:
                target_id = edge.get("target")
                if not target_id:
                    continue
                target_proj = projections.get(target_id)
                if not target_proj:
                    continue
                tx, ty, tz = target_proj
                if tz <= 0:
                    continue
                txp = cx + tx * radius
                typ = cy - ty * radius
                is_selected_edge = source_id == selected or target_id == selected
                color = "#2a3a4d" if not is_selected_edge else "#7cc7ff"
                width = 1 if not is_selected_edge else 2
                globe.create_line(sxp, syp, txp, typ, fill=color, width=width)

        for record_id, x, y, z in nodes_front:
            self._draw_globe_node(
                record_id,
                x,
                y,
                z,
                cx,
                cy,
                radius,
                height,
                selected=False,
            )

        if selected_point:
            record_id, x, y, z = selected_point
            self._draw_globe_node(
                record_id,
                x,
                y,
                z,
                cx,
                cy,
                radius,
                height,
                selected=True,
            )

    def _draw_globe_node(
        self,
        record_id: str,
        x: float,
        y: float,
        z: float,
        cx: float,
        cy: float,
        radius: float,
        panel_height: float,
        selected: bool,
    ) -> None:
        globe = self.globe
        px = cx + x * radius
        py = cy - y * radius

        image = self._get_record_image(record_id, z, radius, panel_height, selected)
        if image:
            item = globe.create_image(px, py, image=image, tags=("node",))
        else:
            size = 6 if selected else 4
            fill = "#ffd166" if selected else "#7cc7ff"
            outline = "#f4a261" if selected else "#0b0b10"
            item = globe.create_oval(
                px - size,
                py - size,
                px + size,
                py + size,
                fill=fill,
                outline=outline,
                width=2,
                tags=("node",),
            )

        self._globe_items[item] = record_id
        self._globe_item_meta[item] = {"record_id": record_id, "z": z}

        if selected:
            label = self._get_record_label(record_id)
            globe.create_text(
                px,
                py - 18,
                text=label,
                fill="#e9e9f0",
                font=("TkDefaultFont", 9, "bold"),
            )

    def _draw_graticule(self, cx: float, cy: float, radius: float) -> None:
        for lon in range(-150, 180, 30):
            points = []
            for lat in range(-90, 91, 6):
                x, y, z = self._project_point(lat, lon)
                visible = z > 0
                if visible:
                    px = cx + x * radius
                    py = cy - y * radius
                    points.append((px, py, visible))
                else:
                    points.append((0, 0, visible))
            self._draw_visible_line(points)

        for lat in range(-60, 90, 30):
            points = []
            for lon in range(-180, 181, 6):
                x, y, z = self._project_point(lat, lon)
                visible = z > 0
                if visible:
                    px = cx + x * radius
                    py = cy - y * radius
                    points.append((px, py, visible))
                else:
                    points.append((0, 0, visible))
            self._draw_visible_line(points)

    def _draw_visible_line(self, points: list[tuple[float, float, bool]]) -> None:
        line = []
        for px, py, visible in points:
            if visible:
                line.append((px, py))
            elif line:
                if len(line) >= 2:
                    self.globe.create_line(
                        *self._flatten(line),
                        fill="#1a1f2a",
                        width=1,
                    )
                line = []
        if len(line) >= 2:
            self.globe.create_line(
                *self._flatten(line),
                fill="#1a1f2a",
                width=1,
            )

    def _flatten(self, points: list[tuple[float, float]]) -> list[float]:
        flat: list[float] = []
        for x, y in points:
            flat.extend([x, y])
        return flat

    def _get_record_label(self, record_id: str) -> str:
        record = self._db_records.get(record_id, {})
        return record.get("title") or record_id

    def _extract_field_value(self, body: str, field_names: tuple[str, ...]) -> str | None:
        if not body:
            return None
        field_pattern = "|".join(re.escape(name) for name in field_names)
        regex = re.compile(rf"^\s*-\s*({field_pattern})\s*:\s*(.+)$", re.I)
        for line in body.splitlines():
            match = regex.match(line)
            if match:
                return match.group(2).strip()
        return None

    def _extract_card_image(self, body: str) -> str | None:
        value = self._extract_field_value(body, ("Card image",))
        if not value:
            value = self._extract_field_value(body, ("Image",))
        if not value:
            return None
        md_match = re.search(r"!\[[^]]*\]\(([^)]+)\)", value)
        if md_match:
            return md_match.group(1).strip()
        return value.strip()

    def _resolve_image_path(self, image_ref: str) -> Path | None:
        if not image_ref:
            return None
        if image_ref.startswith(("http://", "https://")):
            return None
        path = Path(image_ref)
        if not path.is_absolute():
            path = DB_PATH.parent / path
        return path

    def _get_record_image(
        self,
        record_id: str,
        z: float,
        radius: float,
        panel_height: float,
        selected: bool,
    ) -> tk.PhotoImage | None:
        record = self._db_records.get(record_id, {})
        image_ref = record.get("card_image")
        if not image_ref:
            return None
        path = self._resolve_image_path(image_ref)
        if not path or not path.exists():
            return None

        raw = self._image_cache.get(record_id)
        if raw is None:
            try:
                raw = tk.PhotoImage(file=str(path))
            except tk.TclError:
                return None
            self._image_cache[record_id] = raw

        base_scale = 0.10
        if not selected:
            scale = base_scale
        else:
            t = max(0.0, min(1.0, (z + 1) / 2))
            t_exp = t**SELECT_SCALE_EXP
            max_dim = max(raw.width(), raw.height())
            target_pixels = max(panel_height * 0.8, 1.0)
            target_scale = target_pixels / max_dim if max_dim > 0 else base_scale
            if target_scale < base_scale:
                target_scale = base_scale
            scale = base_scale + (target_scale - base_scale) * t_exp

        max_dim = max(raw.width(), raw.height())
        max_allowed = radius * 1.9
        if max_dim > 0:
            scale = min(scale, max_allowed / max_dim)

        if scale <= 0:
            return None

        ratio = Fraction(scale).limit_denominator(12)
        num = max(1, ratio.numerator)
        den = max(1, ratio.denominator)
        cache_key = (record_id, num, den)
        cached = self._image_scaled_cache.get(cache_key)
        if cached is not None:
            return cached

        scaled = raw.zoom(num, num).subsample(den, den)
        self._image_scaled_cache[cache_key] = scaled
        return scaled


def main() -> None:
    app = NavigatorApp()
    app.mainloop()


if __name__ == "__main__":
    main()
