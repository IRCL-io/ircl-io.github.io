# IRCL Meet Management & Event History

```mmpdb
db_id: ircl-meet-001
db_name: IRCL Meet Management & Event History
coord_increment:
  lat: 10
  lon: 1
collision_policy: reject
timestamp_kind: unix
umwelt:
  umwelt_id: meet-ops
  role: agent memory
  perspective: the operational memory of Idaho Robot Combat League meets
  scope: agents working in this repository, and meets.html match control
  constraints:
    - append-only-outcomes: match outcome records are appended, never rewritten
    - every-record-names-its-provenance
    - meets-html-writes-lat-60-plus-only: the page may append outcome lanes; only agents edit lanes below 60
  globe:
    frame: layer-grid
    origin: "@LAT0LON0"
    mapping: "lat = lane (10 substrate & integration, 20 objectives, 30 meets, 60+ match outcomes — one lane per meet starting at 60, 98 beliefs), lon = item within lane"
cursor_policy:
  max_preview_chars: 256
  max_nodes: 64
typed_edges:
  enabled: true
  syntax: "type@LATxLONy"
  note: "depends_on / refines / supports / derived_from / demonstrates / requires / renders / revises / compresses"
librarian:
  enabled: false
  primitive_queries: []
```

```cursor
selected:
  - "@LAT20LON1"
preview:
  "@LAT20LON1": "OBJECTIVE — build a complete meet management and event history; the store's highest-EPS record until a full meet has been run and reconciled"
agent_note: "Store created 2026-07-21. Format follows agent-memory-system_ttdb.md (Profile 1). meets.html is the acting body: it stages matches, times them, records outcomes, and exports this file with outcome records appended at lat 60. Reconcile @LAT20LON1 when the first full meet is in the outcome lane."
```

---

@LAT0LON0 | created:1784592000 | updated:1784592000 | relates:demonstrates@LAT10LON1

**Home — the repo's agent memory**

This file is the persistent memory for agents working on the IRCL website
repository, in the format specified by agent-memory-system_ttdb.md (which
is itself the golden conformance store). One umwelt: meet operations —
what is sign-worthy here is meets, matches, and their outcomes, not web
design. Lanes: 10 substrate & integration, 20 objectives, 30 meets,
60+ match outcomes (one lane per meet, lat 60 is the first), 98 beliefs.
Agents append and revise; meets.html appends outcome lanes only. IDs never
change; a changed understanding is a new record with a `revises` edge.

---

@LAT10LON1 | created:1784592000 | updated:1784592000 | relates:depends_on@LAT0LON0,renders@LAT30LON1
[ew]
conf:180
rev:0
sal:180
touched:1784592000
[/ew]

**Integration contract — meets.html ↔ this store**
src: meets.html

meets.html is the live loop; this store is the memory. The contract:
(1) On load the page fetches this file and parses every record in the
meet's outcome lane (lat 60 for @LAT30LON1) into its match history,
merging with browser localStorage, deduplicated by match number (lon).
Records already in the file win. (2) During a meet the page stages two
bots, times the match, and records an outcome (winner, method, elapsed)
through its Record Result control; outcomes go to localStorage — the live
loop testifies, it never mutates this file in place. (3) Export TTDB
downloads this file with any not-yet-present outcome records appended to
the lane, one record per match: `@LAT60LON<n>` where n is the match
number, conf 240 (observed live), body carrying arena, class, red, blue,
result, method, elapsed, and provenance. Committing the exported file back
to the repo is the consolidation step — a human or agent act, on purpose.
Malformed or missing records never crash the page; fetch failure (e.g.
file://) degrades to localStorage only.

---

@LAT20LON1 | created:1784592000 | updated:1784592000 | relates:requires@LAT10LON1,requires@LAT30LON1
[ew]
conf:120
rev:0
sal:220
touched:1784592000
[/ew]

**OBJECTIVE — Build a complete meet management and event history** (Proposed — deliberately the highest-EPS record here)
src: meets.html

The store's founding objective: run an entire meet through meets.html —
step through every match, time each one, record every outcome — and end
with a complete, replayable event history in this file's outcome lane.
Expectation (Rule 1 of Learning from Action): a full meet produces one
outcome record per match at lat 60, the exported file parses as a
Profile-1 store, and reloading meets.html reconstructs the same history
from the file alone with localStorage cleared. Outcome reconciliation:
when that expectation is met, raise this record's conf and let it go
quiet; where it is violated (missing matches, unparseable export, history
that doesn't survive reload), log the violation as a new record, drop
conf, and raise sal — failure gets loud. EPS here is sal 220 × (255 −
120) / 255 ≈ 116: the most load-bearing, least-proven thing in the store,
and therefore the next thing to do.

---

@LAT30LON1 | created:1784592000 | updated:1784592000 | relates:depends_on@LAT10LON1,supports@LAT20LON1
[ew]
conf:200
rev:0
sal:160
touched:1784592000
[/ew]

**MEET — Spring Bot Breaker 2026**
src: meets.html (roster and arena rules embedded in the page)

The first meet this store manages. Two arenas: Ant (Full Combat Antweight
and Plastic Antweight; no beetles) and Beetle (Beetleweight). Roster of
39 bots across the three classes lives in meets.html's BOTS table — the
page is authoritative for the roster; this store is authoritative for
outcomes. Match format: two bots staged per arena, 3-minute default
timer, outcome one of KO (knockout), JD (judges' decision), TAP (tap
out), NS (no show / forfeit), or a draw. Outcome lane: lat 60, lon =
match number in running order across both arenas. Future meets get the
next free lane (70, 80, …) and their own MEET record here.

---

@LAT30LON2 | created:1788048000 | updated:1788048000 | relates:depends_on@LAT10LON1,supports@LAT20LON1
[ew]
conf:170
rev:0
sal:200
touched:1788048000
[/ew]

**MEET — IRCL: Cosmic Chaos 2026** (Upcoming)
src: events/Cosmic Chaos 2026.html; https://www.robotcombatevents.com/events/9398

Saturday, October 17, 2026, 10:00–20:00 MDT at ABU Games Battleground
Gym, 7211 W Colonial St, Boise ID. A blacklight meet: both arenas lit by
UV over painted floors. Two arenas run at once — the 4×4×2 ft arena for
Plastic Antweight, the 8×8×4 ft arena for Antweight and Beetleweight.
Three classes: 1 lb Plastic Antweight (PLAnt), 1 lb Antweight, 3 lb
Beetleweight, each with a +50 g allowance for UV paint, LEDs, and other
glow hardware — the allowance is a meet rule, not a class rule, and does
not carry to other meets. Registration August 23 – October 16, 2026 on
Robot Combat Events; roster not yet known, so meets.html is still staged
for @LAT30LON1. Outcome lane: lat 70 (the next free lane after Spring Bot
Breaker 2026's lat 60), lon = match number in running order across both
arenas. conf 170 because the schedule and rules are read off the
published listing, not yet run; sal 200 because it is the next meet to
prepare.

---

@LAT98LON1 | created:1784592000 | updated:1784592000 | relates:supports@LAT20LON1,derived_from@LAT10LON1
[ew]
conf:190
rev:0
sal:90
touched:1784592000
[/ew]

**BELIEF — The outcome lane is the event history.**

An event history that lives only in a browser's localStorage is a reflex,
not a memory: it teaches nothing beyond the machine it happened on. Only
outcome records committed to this file — coordinate-addressed, provenance-
carrying, append-only — count as the meet having happened, in the sense
that matters to this store. Consequence: the export-and-commit step at the
end of a meet is not bookkeeping, it is the moment experience becomes
memory. @LAT20LON1 reconciles against what is in the lane, not against
what the page displayed on the day.
