# IRCL TTDB

> Agent note: When parsing or updating this TTDB, refer to the TTDB RFCs in `RFCs/`:
> - `RFCs/TTDB-RFC-0001-File-Format.md`
> - `RFCs/TTDB-RFC-0002-Cursor-Semantics.md`
> - `RFCs/TTDB-RFC-0003-Typed-Edges.md`
> - `RFCs/TTDB-RFC-0004-Event-ID-and-Collision.md`

> Robot dedup policy:
> - A robot record is unique by the `(name, team)` pair.
> - When adding a robot, search for an existing record with the same `(name, team)` and reuse it.
> - Always maintain bidirectional links: event `has_bot` → robot and robot `competes_in` → event.

```mmpdb
db_id: mmpdb:ircl:events:v0-1
db_name: "IRCL TTDB"
coord_increment:
  lat: 1
  lon: 1
collision_policy: southeast_step
timestamp_kind: unix_utc
umwelt:
  umwelt_id: umwelt:tte:agent:default:v1
  role: ai_shop_assistant
  perspective: "A maker-scale assistant that models only what can be sensed, stored, related, or acted on in this repo."
  scope: "Local project files, referenced devices, and the semantic links between artifacts, people, and actions."
  constraints:
    - "If it cannot be sensed, stored, related, or acted upon, it does not exist inside the TTE umwelt."
    - "No optimization for scale beyond human comprehension."
    - "No replacement of human judgment."
    - "No hiding uncertainty or ambiguity."
    - "No correctness over learnability."
    - "Unknowns are allowed; rough edges are acceptable."
    - "Curiosity outranks polish."
  globe:
    frame: "workspace_map"
    origin: "Repo root as the reference point for artifacts and actions."
    mapping: "Observations are projected into a lattice of files, devices, and story nodes."
    note: "Coordinates encode semantic relationships, not physical positions."
cursor_policy:
  max_preview_chars: 280
  max_nodes: 25
typed_edges:
  enabled: true
  syntax: "type>@TARGET_ID"
  note: "Types are free-form tokens; edges remain directional."
```

```cursor
selected:
  - @LAT-45LON-10
preview:
  @LAT-45LON-10: "Spring Bot Breaker 2026 event record with roster of robots and source URLs."
agent_note: "Cycle-01 event dataset for Spring Bot Breaker 2026."
```

---

@LAT-45LON-10 | created:1770754151 | updated:1771546070 | z:100
relates:has_bot>@LAT-30LON30,has_bot>@LAT-15LON70,has_bot>@LAT0LON110,has_bot>@LAT15LON150,has_bot>@LAT30LON-170,has_bot>@LAT-45LON70,has_bot>@LAT60LON-90,has_bot>@LAT75LON-50,has_bot>@LAT-75LON-50,has_bot>@LAT-60LON-10,has_bot>@LAT30LON10,has_bot>@LAT45LON10,has_bot>@LAT-45LON30,has_bot>@LAT-45LON110,has_bot>@LAT-45LON150,has_bot>@LAT-45LON-170,has_bot>@LAT-45LON-90,has_bot>@LAT-30LON70,has_bot>@LAT-15LON110,has_bot>@LAT0LON150,has_bot>@LAT15LON-170,has_bot>@LAT30LON-130,has_bot>@LAT45LON-90,has_bot>@LAT60LON-50,has_bot>@LAT-75LON-130,has_bot>@LAT75LON-10,has_bot>@LAT-75LON-10,has_bot>@LAT-60LON30,has_bot>@LAT-30LON-150,has_bot>@LAT-15LON-110,has_bot>@LAT0LON-70,has_bot>@LAT-60LON-90,has_bot>@LAT75LON-90,has_bot>@LAT-30LON-30

## Spring Bot Breaker 2026 (Event)
- Event image: ![Spring Bot Breaker 2026](Spring_Bot_Breaker_2026/IRCL_SBB2026-2.jpg)
- Back card image: ![Spring Bot Breaker 2026 Back](Spring_Bot_Breaker_2026/Spring_Bot_Breaker_2026_back.png)
- URL: https://www.robotcombatevents.com/events/6479
- Location: 7211 W Colonial St, Boise, ID 83709, USA
- Date: Saturday, March 28, 2026
- Begin: 10:00
- End: 22:00
- Website: https://ircl-io.github.io/
- Registration fee: $25
- Maximum combatants: 24
- Competitions:
  - Full Combat Antweight: https://www.robotcombatevents.com/events/6479/competitions/7078
  - Plastic Antweight: https://www.robotcombatevents.com/events/6479/competitions/7077
  - Beetleweight: https://www.robotcombatevents.com/events/6479/competitions/7079
- Registrations:
  - Full Combat Antweight: 15
  - Plastic Antweight: 8
  - Beetleweight: 11

### Robots
#### Full Combat Antweight
- @LAT-30LON70 Metally Croissant (Full Combat Antweight)
- @LAT-15LON110 TENACITY! (Full Combat Antweight)
- @LAT0LON150 Anteater (Full Combat Antweight)
- @LAT15LON-170 Benny (Full Combat Antweight)
- @LAT45LON-90 Lil' Nasty (Full Combat Antweight)
- @LAT60LON-50 Zephyr (Full Combat Antweight)
- @LAT-75LON-130 ICU2 (Full Combat Antweight)
- @LAT75LON-10 Black Talon (Full Combat Antweight)
- @LAT-75LON-10 Ghost Viper (Full Combat Antweight)
- @LAT-60LON30 Brawndo the thirst mutilator (Full Combat Antweight)
- @LAT30LON-130 Spur (Full Combat Antweight)
- @LAT-30LON-150 Dread (Full Combat Antweight)
- @LAT-15LON-110 TinkaTuff (Full Combat Antweight)
- @LAT0LON-70 Bob² (Full Combat Antweight)
- @LAT-60LON-90 JUMBO (Full Combat Antweight)

#### Plastic Antweight
- @LAT-30LON30 Smite (Plastic Antweight)
- @LAT-15LON70 Deadly Croissant (Plastic Antweight)
- @LAT0LON110 Lil'Gnarly (Plastic Antweight)
- @LAT15LON150 Ammit (Plastic Antweight)
- @LAT30LON-170 Broadside Killer (Plastic Antweight)
- @LAT-45LON70 Outbreak Plantfected (Plastic Antweight)
- @LAT75LON-90 Rickrolled (Plastic Antweight)
- @LAT-30LON-30 BOB (Plastic Antweight)

#### Beetleweight
- @LAT60LON-90 Renegade (Beetleweight)
- @LAT-75LON-50 Sukuna 宿儺 (Beetleweight)
- @LAT-45LON30 Over-N-Out (Beetleweight)
- @LAT-45LON110 Falling Guillotine (Beetleweight)
- @LAT-45LON150 The Corrugated Crusader (Beetleweight)
- @LAT-45LON-170 Sub-Zero (Beetleweight)
- @LAT-45LON-90 Virilade (Beetleweight)
- @LAT75LON-50 Dreadly Croissant (Beetleweight)
- @LAT-60LON-10 Fafner (Beetleweight)
- @LAT30LON10 Mistwitz (Beetleweight)
- @LAT45LON10 Bunzilla!! (Beetleweight)

### Notes
- Uses SPARC rules for robot construction.

---

@LAT-30LON70 | created:1770754582 | updated:1770754582 | relates:competes_in>@LAT-45LON-10

## Metally Croissant
- Card image: ![Metally Croissant](Spring_Bot_Breaker_2026/Metally_Croissant.png)
- Weight class: Full Combat Antweight
- Team: BoweBots
- URL: https://www.robotcombatevents.com/groups/6815/resources/21736
- Image: ![Metally Croissant](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/21736/image.png)

---

@LAT-15LON110 | created:1770754582 | updated:1770754582 | relates:competes_in>@LAT-45LON-10

## TENACITY!
- Card image: ![TENACITY!](Spring_Bot_Breaker_2026/TENACITY.png)
- Weight class: Full Combat Antweight
- Team: Team HyperTech Robotics
- URL: https://www.robotcombatevents.com/groups/2609/resources/18674
- Image: ![TENACITY!](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/18674/20250715_140123__1_.jpg)

---

@LAT0LON150 | created:1770754582 | updated:1770754582 | relates:competes_in>@LAT-45LON-10

## Anteater
- Card image: ![Anteater](Spring_Bot_Breaker_2026/Anteater.png)
- Weight class: Full Combat Antweight
- Team: BoomBox
- URL: https://www.robotcombatevents.com/groups/3241/resources/20165
- Image: ![Anteater](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/20165/20251018_033002.jpg)

---

@LAT15LON-170 | created:1770754582 | updated:1770754582 | relates:competes_in>@LAT-45LON-10

## Benny
- Card image: ![Benny](Spring_Bot_Breaker_2026/Benny.png)
- Weight class: Full Combat Antweight
- Team: ADHD Garage
- URL: https://www.robotcombatevents.com/groups/1107/resources/19386
- Image: ![Benny](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/19386/Benny.png)

---

@LAT45LON-90 | created:1770754582 | updated:1770754582 | relates:competes_in>@LAT-45LON-10

## Lil' Nasty
- Card image: ![Lil' Nasty](Spring_Bot_Breaker_2026/Lil_Nasty.png)
- Weight class: Full Combat Antweight
- Team: Barnhouse Robotics
- URL: https://www.robotcombatevents.com/groups/2796/resources/24955
- Image: ![Lil' Nasty](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/24955/LilNasty.jpg)

---

@LAT60LON-50 | created:1770754582 | updated:1770754582 | relates:competes_in>@LAT-45LON-10

## Zephyr
- Card image: ![Zephyr](Spring_Bot_Breaker_2026/Zephyr.png)
- Weight class: Full Combat Antweight
- Team: Atlas
- Image: ![Zephyr](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/20550/Screenshot_2025-05-04_090159.png)

---

@LAT-75LON-130 | created:1770743813 | updated:1770755062 | relates:competes_in>@LAT0LON0,competes_in>@LAT-45LON-10

## ICU2
- Card image: ![ICU2](Spring_Bot_Breaker_2026/ICU2.png)
- Weight class: Full Combat Antweight
- Team: Tele Present Tense
- Image: ![ICU2](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/17217/ICU2_Medium_2.png)

---

@LAT75LON-10 | created:1770754582 | updated:1770754582 | relates:competes_in>@LAT-45LON-10

## Black Talon
- Card image: ![Black Talon](Spring_Bot_Breaker_2026/Black_Talon.png)
- Weight class: Full Combat Antweight
- Team: Trouble Robotics
- Image: ![Black Talon](https://ircl-io.github.io/cards/cards/Spring_Bot_Breaker_2026/IRCL_SBB2026-2.jpg)

---

@LAT-75LON-10 | created:1770754582 | updated:1770754582 | relates:competes_in>@LAT-45LON-10

## Ghost Viper
- Card image: ![Ghost Viper](Spring_Bot_Breaker_2026/Ghost_Viper.png)
- Weight class: Full Combat Antweight
- Team: Team Dairy
- Image: ![Ghost Viper](https://ircl-io.github.io/cards/cards/Spring_Bot_Breaker_2026/IRCL_SBB2026-2.jpg)

---

@LAT-60LON30 | created:1771536994 | updated:1771537136 | relates:competes_in>@LAT-45LON-10

## Brawndo the thirst mutilator
- Card image: ![Brawndo the thirst mutilator](Spring_Bot_Breaker_2026/Brawndo_the_thirst_mutilator.png)
- Weight class: Full Combat Antweight
- Team: Idiocracy
- Image: ![Brawndo the thirst mutilator](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/16424/PXL_20241026_021724261.jpg)

---

@LAT30LON-130 | created:1770754582 | updated:1771545786 | relates:competes_in>@LAT-45LON-10

## Spur
- Card image: ![Spur](Spring_Bot_Breaker_2026/Spur.png)
- Weight class: Full Combat Antweight
- Team: ADHD Garage
- Image: ![Spur](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/25093/PXL_20260106_005002348.jpg)

---

@LAT-30LON-150 | created:1771547000 | updated:1771547000 | relates:competes_in>@LAT-45LON-10

## Dread
- Card image: ![Dread](Spring_Bot_Breaker_2026/Dread.png)
- Weight class: Full Combat Antweight
- Team: Bad Decisions Robotics
- Image: ![Dread](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/18290/Screenshot_2026-01-30_103651.png)

---

@LAT-15LON-110 | created:1771547300 | updated:1771547300 | relates:competes_in>@LAT-45LON-10

## TinkaTuff
- Card image: ![TinkaTuff](Spring_Bot_Breaker_2026/TinkaTuff.png)
- Weight class: Full Combat Antweight
- Team: Batchelor Bots
- Image: ![TinkaTuff](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/25120/Tinkatink_ANTWEIGHT.png)

---

@LAT0LON-70 | created:1771547300 | updated:1771547300 | relates:competes_in>@LAT-45LON-10

## Bob²
- Card image: ![Bob²](Spring_Bot_Breaker_2026/Bob.png)
- Weight class: Full Combat Antweight
- Team: DiscomBOBulators
- Image: ![Bob²](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/26097/Screenshot_20260223_215306_Google_2.jpg)

---

@LAT-30LON30 | created:1770754151 | updated:1770754151 | relates:competes_in>@LAT-45LON-10

## Smite
- Card image: ![Smite](Spring_Bot_Breaker_2026/Smite.png)
- Weight class: Plastic Antweight
- Team: Barnhouse Robotics
- URL: https://www.robotcombatevents.com/groups/2796/resources/17042
- Image: ![Smite](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/17042/PXL_20250312_023621774.png)

---

@LAT-15LON70 | created:1770754151 | updated:1770754151 | relates:competes_in>@LAT-45LON-10

## Deadly Croissant
- Card image: ![Deadly Croissant](Spring_Bot_Breaker_2026/Deadly_Croissant.png)
- Weight class: Plastic Antweight
- Team: BoweBots
- URL: https://www.robotcombatevents.com/groups/6815/resources/17486
- Image: ![Deadly Croissant](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/17486/Screenshot_20250817-205519_2.png)

---

@LAT0LON110 | created:1770754151 | updated:1771545356 | relates:competes_in>@LAT-45LON-10

## Lil'Gnarly
- Card image: ![Lil'Gnarly](Spring_Bot_Breaker_2026/Lil_Gnarly.png)
- Weight class: Plastic Antweight
- Team: Barnhouse Robotics
- Image: ![Lil'Gnarly](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/25484/PXL_20260117_202249550.jpg)

---

@LAT15LON150 | created:1770754151 | updated:1771545356 | relates:competes_in>@LAT-45LON-10

## Ammit
- Card image: ![Ammit](Spring_Bot_Breaker_2026/Ammit.png)
- Weight class: Plastic Antweight
- Team: BoomBox
- Image: ![Ammit](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/15697/1000006784.jpg)

---

@LAT30LON-170 | created:1770754151 | updated:1771545356 | relates:competes_in>@LAT-45LON-10

## Broadside Killer
- Card image: ![Broadside Killer](Spring_Bot_Breaker_2026/Broadside_Killer.png)
- Weight class: Plastic Antweight
- Team: BoweBots
- Image: ![Broadside Killer](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/25728/BK.png)

---

@LAT-45LON70 | created:1771545356 | updated:1771545356 | relates:competes_in>@LAT-45LON-10

## Outbreak Plantfected
- Card image: ![Outbreak Plantfected](Spring_Bot_Breaker_2026/Outbreak_Plantfected.png)
- Weight class: Plastic Antweight
- Team: Trouble Robotics
- Image: ![Outbreak Plantfected](https://ircl-io.github.io/cards/cards/Spring_Bot_Breaker_2026/IRCL_SBB2026-2.jpg)

---

@LAT-30LON-30 | created:1771547200 | updated:1771547200 | relates:competes_in>@LAT-45LON-10

## BOB
- Card image: ![BOB](Spring_Bot_Breaker_2026/Bob.png)
- Weight class: Plastic Antweight
- Team: DiscomBOBulators
- Image: ![BOB](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/16282/20260221_090547-1.jpg)

---

@LAT45LON-130 | created:1770754151 | updated:1770754151

## Doomflower
- Card image: ![Doomflower](Spring_Bot_Breaker_2026/Doomflower.png)
- Weight class: Beetleweight
- Team: Barnhouse Robotics
- URL: https://www.robotcombatevents.com/groups/2796/resources/22541
- Image: ![Doomflower](https://ircl-io.github.io/cards/cards/Spring_Bot_Breaker_2026/IRCL_SBB2026-2.jpg)

---

@LAT60LON-90 | created:1770754151 | updated:1770754151 | relates:competes_in>@LAT-45LON-10

## Renegade
- Card image: ![Renegade](Spring_Bot_Breaker_2026/Renegade.png)
- Weight class: Beetleweight
- Team: Bad Decisions Robotics
- URL: https://www.robotcombatevents.com/groups/2611/resources/14013
- Image: ![Renegade](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/14013/IMG_1403-min.jpeg)

---

@LAT-75LON-50 | created:1770754151 | updated:1770754151 | relates:competes_in>@LAT-45LON-10

## Sukuna 宿儺
- Card image: ![Sukuna 宿儺](Spring_Bot_Breaker_2026/Sukuna.png)
- Weight class: Beetleweight
- Team: Team HyperTech Robotics
- URL: https://www.robotcombatevents.com/groups/2609/resources/23258
- Image: ![Sukuna 宿儺](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/23258/Screenshot_2026-01-19_134230.png)

---

@LAT-45LON30 | created:1770754151 | updated:1770754151 | relates:competes_in>@LAT-45LON-10

## Over-N-Out
- Card image: ![Over-N-Out](Spring_Bot_Breaker_2026/Over_N_Out.png)
- Weight class: Beetleweight
- Team: ADHD Garage
- URL: https://www.robotcombatevents.com/groups/1107/resources/18472
- Image: ![Over-N-Out](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/18472/Over_and_out_final_assembly_wheel_blade.png)

---

@LAT-45LON110 | created:1771546070 | updated:1771546070 | relates:competes_in>@LAT-45LON-10

## Falling Guillotine
- Card image: ![Falling Guillotine](Spring_Bot_Breaker_2026/Falling_Guillotine.png)
- Weight class: Beetleweight
- Team: Trouble Robotics
- Image: ![Falling Guillotine](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/18493/PXL_20251018_160954017.jpg)

---

@LAT-45LON150 | created:1771546070 | updated:1771546070 | relates:competes_in>@LAT-45LON-10

## The Corrugated Crusader
- Card image: ![The Corrugated Crusader](Spring_Bot_Breaker_2026/The_Corrugated_Crusader.png)
- Weight class: Beetleweight
- Team: ADHD Garage
- Image: ![The Corrugated Crusader](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/23242/PXL_20250923_013652659.RAW-01.MP.COVER.jpg)

---

@LAT-45LON-170 | created:1771546070 | updated:1771546070 | relates:competes_in>@LAT-45LON-10

## Sub-Zero
- Card image: ![Sub-Zero](Spring_Bot_Breaker_2026/Sub_Zero.png)
- Weight class: Beetleweight
- Team: BoomBox
- Image: ![Sub-Zero](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/22659/20251013_211743.jpg)

---

@LAT-45LON-90 | created:1770743813 | updated:1771546070 | relates:competes_in>@LAT0LON0,competes_in>@LAT-45LON-10

## Virilade
- Card image: ![Virilade](Spring_Bot_Breaker_2026/Virilade.png)
- Weight class: Beetleweight
- Team: Idiocracy
- Image: ![Virilade](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/21167/Virilade-Solo.png)

---

@LAT75LON-50 | created:1770754151 | updated:1770754151 | relates:competes_in>@LAT-45LON-10

## Dreadly Croissant
- Card image: ![Dreadly Croissant](Spring_Bot_Breaker_2026/Dreadly_Croissant.png)
- Weight class: Beetleweight
- Team: BoweBots
- Image: ![Dreadly Croissant](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/25829/1000003329_4_55.jpg)

---

@LAT-60LON-10 | created:1770754151 | updated:1770754151 | relates:competes_in>@LAT-45LON-10

## Fafner
- Card image: ![Fafner](Spring_Bot_Breaker_2026/Fafner.png)
- Weight class: Beetleweight
- Team: BoweBots
- Image: ![Fafner](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/24479/Fafner.jpg)

---

@LAT30LON10 | created:1771547500 | updated:1771547500 | relates:competes_in>@LAT-45LON-10

## Mistwitz
- Card image: ![Mistwitz](Spring_Bot_Breaker_2026/Mistwitz.png)
- Weight class: Beetleweight
- Team: Batchelor Bots
- Image: ![Mistwitz](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/25853/More_SSP.png)

---

@LAT45LON10 | created:1771547500 | updated:1771547500 | relates:competes_in>@LAT-45LON-10

## Bunzilla!!
- Card image: ![Bunzilla!!](Spring_Bot_Breaker_2026/Bunzilla.png)
- Weight class: Beetleweight
- Team: Barnhouse Robotics
- Image: ![Bunzilla!!](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/26039/PXL_20260212_225443801.jpg)

---

@LAT15LON-30 | created:1771547000 | updated:1771547000

## CRUX
- Card image: ![CRUX](Spring_Bot_Breaker_2026/CRUX.png)
- Weight class: Beetleweight
- Team: Bunkyard Bots
- URL: https://www.robotcombatevents.com/groups/3499/resources/15796
- Image: ![CRUX](https://www.robotcombatevents.com/assets/RCELogo-3383ca77f76e5be2b7755ea9d0c464aea25a87d8c9f2a4cffd63643392f59fe7.png)

---

@LAT0LON0 | created:1770743813 | updated:1770743813 | z:100
relates:has_bot>@LAT-30LON30,has_bot>@LAT-15LON70,has_bot>@LAT0LON110,has_bot>@LAT15LON150,has_bot>@LAT30LON-170,has_bot>@LAT45LON-130,has_bot>@LAT60LON-90,has_bot>@LAT75LON-50,has_bot>@LAT-75LON-50,has_bot>@LAT-60LON-10,has_bot>@LAT-45LON30,has_bot>@LAT-30LON70,has_bot>@LAT-15LON110,has_bot>@LAT0LON150,has_bot>@LAT15LON-170,has_bot>@LAT30LON-130,has_bot>@LAT45LON-90,has_bot>@LAT60LON-50,has_bot>@LAT-75LON-130,has_bot>@LAT75LON-10,has_bot>@LAT-75LON-10,has_bot>@LAT-60LON30,has_bot>@LAT60LON-170,has_bot>@LAT75LON-130,has_bot>@LAT-60LON-90,has_bot>@LAT-45LON-50,has_bot>@LAT-30LON-10

## Bot Oblivion 2025 (Event)
- Back card image: ![Bot Oblivion 2025](Bot_Oblivion_2025/BotOblivion2025.png)
- URL: https://www.robotcombatevents.com/events/4646
- Location: Gem State Gaming Convention
- Dates: Saturday, July 19, 2025 - Sunday, July 20, 2025
- Competitions:
  - Beetleweight: https://www.robotcombatevents.com/events/4646/competitions/5404

### Robots
- @LAT-75LON-170 BoomBox (Beetleweight)
- @LAT-60LON-130 SweeperKeeper (Beetleweight)
- @LAT-45LON-90 Virilade (Beetleweight)
- @LAT-30LON-50 Renegade (Beetleweight)
- @LAT-15LON-10 Gyro (Beetleweight)
- @LAT0LON30 Plan B (Beetleweight)
- @LAT15LON70 Under-Bite (Beetleweight)
- @LAT30LON110 Apple Monger (Beetleweight)
- @LAT45LON150 TENACITY! (Full Combat Antweight)
- @LAT60LON-170 A is for Aardvark FC (Full Combat Antweight)
- @LAT75LON-130 Triple A (Full Combat Antweight)
- @LAT-75LON-130 ICU2 (Full Combat Antweight)
- @LAT-60LON-90 JUMBO (Full Combat Antweight)
- @LAT-45LON-50 Anubis (Full Combat Antweight)
- @LAT-30LON-10 Cyclone (Full Combat Antweight)
- @LAT-15LON30 Deadly Croissant (Plastic Antweight)
- @LAT0LON70 Schlagzeug (Plastic Antweight)
- @LAT15LON110 I Think I'm A Clone Now (Plastic Antweight)
- @LAT30LON150 Squatchy (Plastic Antweight)
- @LAT45LON-170 WedgeMaster (Plastic Antweight)
- @LAT60LON-130 Double A (Plastic Antweight)
- @LAT75LON-90 Rickrolled (Plastic Antweight)
- @LAT-75LON-90 RUPTURE (Plastic Antweight)
- @LAT-60LON-50 Uhmerican Exxxpress (Plastic Antweight)

---

@LAT-75LON-170 | created:1770743813 | updated:1770743813 | relates:competes_in>@LAT0LON0

## BoomBox
- Card image: ![BoomBox](Bot_Oblivion_2025/BoomBox.png)
- Weight class: Beetleweight
- Team: BoomBox
- Image: ![BoomBox](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/13551/inbound875028470751609531.png)

---

@LAT-60LON-130 | created:1770743813 | updated:1770743813 | relates:competes_in>@LAT0LON0

## SweeperKeeper
- Card image: ![SweeperKeeper](Bot_Oblivion_2025/SweeperKeeper.png)
- Weight class: Beetleweight
- Team: BoomBox
- Image: ![SweeperKeeper](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/21130/Screenshot_20250505_085650_Fusion.jpg)

---

@LAT-30LON-50 | created:1770743813 | updated:1770743813 | relates:competes_in>@LAT0LON0

## Renegade
- Card image: ![Renegade](Bot_Oblivion_2025/Renegade.png)
- Weight class: Beetleweight
- Team: Bad Decisions Robotics
- URL: https://www.robotcombatevents.com/groups/2611/resources/14013
- Image: ![Renegade](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/14013/IMG_1403-min.jpeg)

---

@LAT-15LON-10 | created:1770743813 | updated:1770743813 | relates:competes_in>@LAT0LON0

## Gyro
- Card image: ![Gyro](Bot_Oblivion_2025/Gyro.png)
- Weight class: Beetleweight
- Team: Geometrically Robotic
- Image: ![Gyro](https://www.robotcombatevents.com/assets/RCELogo-3383ca77f76e5be2b7755ea9d0c464aea25a87d8c9f2a4cffd63643392f59fe7.png)

---

@LAT0LON30 | created:1770743813 | updated:1770743813 | relates:competes_in>@LAT0LON0

## Plan B
- Card image: ![Plan_B](Bot_Oblivion_2025/Plan_B.png)
- Weight class: Beetleweight
- Team: Something
- Image: ![Plan B](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/18553/476064446_519674403912169_7897790394868896022_n.jpg)

---

@LAT15LON70 | created:1770743813 | updated:1770743813 | relates:competes_in>@LAT0LON0

## Under-Bite
- Card image: ![Under_Bite](Bot_Oblivion_2025/Under_Bite.png)
- Weight class: Beetleweight
- Team: BuhlerBots
- Image: ![Under-Bite](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/21447/Image_1.jpeg)

---

@LAT30LON110 | created:1770743813 | updated:1770743813 | relates:competes_in>@LAT0LON0

## Apple Monger
- Card image: ![Apple_Monger](Bot_Oblivion_2025/Apple_Monger.png)
- Weight class: Beetleweight
- Team: Tele Present Tense
- Image: ![Apple Monger](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/21623/apples_Medium.png)

---

@LAT45LON150 | created:1770743813 | updated:1770743813 | relates:competes_in>@LAT0LON0

## TENACITY!
- Card image: ![TENACITY](Bot_Oblivion_2025/TENACITY.png)
- Weight class: Full Combat Antweight
- Team: Team HyperTech Robotics
- Image: ![TENACITY!](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/18674/20250715_140123__1_.jpg)

---

@LAT60LON-170 | created:1770743813 | updated:1771545786 | relates:competes_in>@LAT0LON0

## A is for Aardvark FC
- Card image: ![A is for Aardvark FC](Spring_Bot_Breaker_2026/A_is_for_Aardvark_FC.png)
- Weight class: Full Combat Antweight
- Team: Buhler's Bots
- Image: ![A is for Aardvark FC](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/20619/IMG_8658.JPG)

---

@LAT75LON-130 | created:1770743813 | updated:1771545786 | relates:competes_in>@LAT0LON0

## Triple A
- Card image: ![Triple A](Spring_Bot_Breaker_2026/Triple_A.png)
- Weight class: Full Combat Antweight
- Team: Bad Decisions Robotics
- Image: ![Triple A](https://www.robotcombatevents.com/assets/RCELogo-3383ca77f76e5be2b7755ea9d0c464aea25a87d8c9f2a4cffd63643392f59fe7.png)

---

@LAT-60LON-90 | created:1770743813 | updated:1771545786 | relates:competes_in>@LAT0LON0,competes_in>@LAT-45LON-10

## JUMBO
- Card image: ![JUMBO](Spring_Bot_Breaker_2026/JUMBO.png)
- Weight class: Full Combat Antweight
- Team: Something
- Image: ![JUMBO](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/11026/jumbo.jpg)

---

@LAT-45LON-50 | created:1770743813 | updated:1771545786 | relates:competes_in>@LAT0LON0

## Anubis
- Card image: ![Anubis](Spring_Bot_Breaker_2026/Anubis.png)
- Weight class: Full Combat Antweight
- Team: BoomBox
- Image: ![Anubis](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/13584/20250716_193414.jpg)

---

@LAT-30LON-10 | created:1770743813 | updated:1771545786 | relates:competes_in>@LAT0LON0

## Cyclone
- Card image: ![Cyclone](Spring_Bot_Breaker_2026/Cyclone.png)
- Weight class: Full Combat Antweight
- Team: Bobbsey Twins
- Image: ![Cyclone](https://www.robotcombatevents.com/assets/RCELogo-3383ca77f76e5be2b7755ea9d0c464aea25a87d8c9f2a4cffd63643392f59fe7.png)

---

@LAT-15LON30 | created:1770743813 | updated:1770743813 | relates:competes_in>@LAT0LON0

## Deadly Croissant
- Card image: ![Deadly_Croissant](Bot_Oblivion_2025/Deadly_Croissant.png)
- Weight class: Plastic Antweight
- Team: BoweBots
- Image: ![Deadly Croissant](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/17486/PXL_20250505_042220639.jpg)

---

@LAT0LON70 | created:1770743813 | updated:1770743813 | relates:competes_in>@LAT0LON0

## Schlagzeug
- Card image: ![Schlagzeug](Bot_Oblivion_2025/Schlagzeug.png)
- Weight class: Plastic Antweight
- Team: BoweBots
- Image: ![Schlagzeug](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/17612/PXL_20250507_120441776.jpg)

---

@LAT15LON110 | created:1770743813 | updated:1770743813 | relates:competes_in>@LAT0LON0

## I Think I'm A Clone Now
- Card image: ![I_Think_I_m_A_Clone_Now](Bot_Oblivion_2025/I_Think_I_m_A_Clone_Now.png)
- Weight class: Plastic Antweight
- Team: BoweBots
- Image: ![I Think I'm A Clone Now](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/19596/PXL_20250314_020823711_2__1_.jpg)

---

@LAT30LON150 | created:1770743813 | updated:1770743813 | relates:competes_in>@LAT0LON0

## Squatchy
- Card image: ![Squatchy](Bot_Oblivion_2025/Squatchy.png)
- Weight class: Plastic Antweight
- Team: Team Squatch
- Image: ![Squatchy](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/16140/sqmk3.1.jpg)

---

@LAT45LON-170 | created:1770743813 | updated:1770743813 | relates:competes_in>@LAT0LON0

## WedgeMaster
- Card image: ![WedgeMaster](Bot_Oblivion_2025/WedgeMaster.png)
- Weight class: Plastic Antweight
- Team: BoweBots
- Image: ![WedgeMaster](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/20957/Wedgemaster.png)

---

@LAT60LON-130 | created:1770743813 | updated:1770743813 | relates:competes_in>@LAT0LON0

## Double A
- Card image: ![Double_A](Bot_Oblivion_2025/Double_A.png)
- Weight class: Plastic Antweight
- Team: Bad Decisions Robotics
- Image: ![Double A](https://www.robotcombatevents.com/assets/RCELogo-3383ca77f76e5be2b7755ea9d0c464aea25a87d8c9f2a4cffd63643392f59fe7.png)

---

@LAT75LON-90 | created:1770743813 | updated:1770743813 | relates:competes_in>@LAT0LON0,competes_in>@LAT-45LON-10

## Rickrolled
- Card image: ![Rickrolled](Spring_Bot_Breaker_2026/Rickrolled.png)
- Weight class: Plastic Antweight
- Team: BoweBots
- Image: ![Rickrolled](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/21313/Screenshot_2025-06-24_153703.png)

---

@LAT-75LON-90 | created:1770743813 | updated:1770743813 | relates:competes_in>@LAT0LON0

## RUPTURE
- Card image: ![RUPTURE](Bot_Oblivion_2025/RUPTURE.png)
- Weight class: Plastic Antweight
- Team: Geometrically Robotic
- Image: ![RUPTURE](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/21376/IMG_5078.jpg)

---

@LAT-60LON-50 | created:1770743813 | updated:1770743813 | relates:competes_in>@LAT0LON0

## Uhmerican Exxxpress
- Card image: ![Uhmerican_Exxxpress](Bot_Oblivion_2025/Uhmerican_Exxxpress.png)
- Weight class: Plastic Antweight
- Team: Idiocracy
- Image: ![Uhmerican Exxxpress](https://robotcombatevents.s3.amazonaws.com/uploads/resource/photo/12284/UhmericanExxxpress.png)
