# IRCL Event Details

```mmpdb
db_id: ircl-events-001
db_name: IRCL Event Details (meet configuration for meets.html)
coord_increment:
  lat: 10
  lon: 1
collision_policy: reject
timestamp_kind: unix
umwelt:
  umwelt_id: meet-config
  role: configuration store
  perspective: what meets.html needs to know to run a given IRCL meet
  scope: meets.html match control, and agents preparing a meet
  constraints:
    - roster-lives-in-the-cards-store: bots are read from cards/cards/IRCL_TTDB.md, never copied here
    - one-event-record-per-meet: a changed meet plan is a new record with a revises edge
    - the-cursor-selects-the-live-meet
  globe:
    frame: layer-grid
    origin: "@LAT0LON0"
    mapping: "lat = lane (10 contract, 30 events), lon = item within lane; event lons mirror the MEET records in meet_ttdb.md lane 30"
cursor_policy:
  max_preview_chars: 256
  max_nodes: 64
typed_edges:
  enabled: true
  syntax: "type@LATxLONy"
  note: "depends_on / refines / supports / derived_from / revises"
librarian:
  enabled: false
  primitive_queries: []
```

```cursor
selected:
  - "@LAT30LON2"
preview:
  "@LAT30LON2": "Cosmic Chaos 2026 — ant arena only (Full Combat + Plastic Antweight); beetleweight excluded; outcome lane 70"
agent_note: "meets.html loads the event named by the first `selected` entry above (override with meets.html?event=<event_id>). To prepare a new meet: generate its cards into cards/cards/IRCL_TTDB.md, append an event record here, and point `selected` at it."
```

---

@LAT0LON0 | created:1791504000 | updated:1791504000 | relates:depends_on@LAT10LON1

**Home — meet configuration**

One record per meet, lane 30. Each record tells meets.html which bots,
classes, and arenas a meet uses, and where its outcomes go. The roster is
not stored here: an event record names its event record in the cards store
(cards/cards/IRCL_TTDB.md), and meets.html reads the bots, card images, and
weight classes from there. Any bot whose weight class is not listed in the
event record's `class:` lines is left off the page — that is how a class is
excluded from a meet. Outcomes are written to meet_ttdb.md, not here.

---

@LAT10LON1 | created:1791504000 | updated:1791504000 | relates:depends_on@LAT0LON0
[ew]
conf:195
rev:0
sal:180
touched:1791504000
[/ew]

**Event record fields — what meets.html parses**
src: meets.html (loadEvent / parseEventRecord)

Body lines of the form `key: value`; unknown keys are ignored, so notes
can sit alongside. Keys:
`event_id` — slug used by `meets.html?event=<event_id>`.
`title` — shown in the page header and in outcome provenance.
`date` — ISO date, informational.
`timer_min` — default match length in minutes.
`cards_store` — path to the cards TTDB, relative to the site root.
`cards_event` — the event record in that store; its `has_bot` edges are the roster.
`class: <key> | <weight class>` — one line per class that competes; `<weight
class>` must match the cards store's `Weight class:` text exactly; `<key>`
picks the colour (full, plastic, beetle).
`arena: <key> | <label> | <class keys, comma-separated> | <note>` — one line
per arena that runs; a bot may only be staged in an arena that lists its
class. The note is optional.
`outcome_lat` — the meet's outcome lane in meet_ttdb.md.
`meet_record` — the MEET record in meet_ttdb.md that outcomes derive from.

---

@LAT30LON1 | created:1791504000 | updated:1791504000 | relates:supports@LAT10LON1
[ew]
conf:220
rev:0
sal:60
touched:1791504000
[/ew]

**EVENT — Spring Bot Breaker 2026** (Past)
src: meets.html BOTS table as of 2026-07-21; cards/cards/IRCL_TTDB.md @LAT-45LON-10

event_id: spring-bot-breaker-2026
title: Spring Bot Breaker 2026
date: 2026-03-28
timer_min: 3
cards_store: cards/cards/IRCL_TTDB.md
cards_event: @LAT-45LON-10
class: full | Full Combat Antweight
class: plastic | Plastic Antweight
class: beetle | Beetleweight
arena: ant | Ant Arena | full,plastic | no beetles
arena: beetle | Beetle Arena | full,plastic,beetle
outcome_lat: 60
meet_record: @LAT30LON1

The configuration meets.html had hard-coded before this store existed,
kept so the meet's history can still be opened with
meets.html?event=spring-bot-breaker-2026.

---

@LAT30LON2 | created:1791504000 | updated:1791504000 | relates:supports@LAT10LON1
[ew]
conf:200
rev:0
sal:200
touched:1791504000
[/ew]

**EVENT — IRCL: Cosmic Chaos 2026** (Upcoming — ant arena only)
src: league decision 2026-10-09; cards/cards/IRCL_TTDB.md @LAT-45LON10

event_id: cosmic-chaos-2026
title: Cosmic Chaos 2026
date: 2026-10-17
timer_min: 3
cards_store: cards/cards/IRCL_TTDB.md
cards_event: @LAT-45LON10
class: full | Full Combat Antweight
class: plastic | Plastic Antweight
arena: ant | Ant Arena | full,plastic | 4×4×2 ft · no beetles
outcome_lat: 70
meet_record: @LAT30LON2

The meet now runs on the ant arena (the 4×4×2 ft arena) only. Beetleweight and the beetle
arena are not running, so Beetleweight is left out of the `class:` lines.
The two registered beetles (Adam Smasher, HellTongue) stay in the cards
store and are not shown on the page.
