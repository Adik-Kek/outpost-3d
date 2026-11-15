# Outpost 3D: Walk the Base

**Play it:** https://outpost-3d.vercel.app (redeploys automatically from GitHub on every push to `main`)

A 3D mission-commander game for the NASA Space Apps Challenge. You are the commander, a playable astronaut inside a cutaway lunar or Martian outpost. Walk between stations, fix what breaks, and make one hard call every night. Real NASA data decides when the Sun sets, when solar storms hit, and how much your crew breathes and eats.

- **One file:** `index.html`. Nothing to install, no libraries, no textures, models, sounds or fonts. Everything is drawn by code with a hand-written WebGL renderer: cel shading with three flat light bands, plus inverted-hull ink outlines.
- **No network requests** while it runs. All NASA data is embedded in one `NASA_DATA` object at the top of the file.
- If WebGL is not available, the page shows a clear message instead of a blank screen.
- **Solid habitat:** from outside, the base is a ribbed metal hut with an airlock. Inside, the camera stays within the walls, so you can't see out except through the airlock door, which slides open when someone walks up to it.
- **Endless, round ground:** the terrain curves away like a small planet (drop = distance² ÷ 2R), so its edge always sits below the horizon. It's covered in craters with shadowed bowls, bright raised rims and boulders. Mars craters are shallower because dust fills them in.
- **Saving:** the game autosaves every morning and when you leave to the menu. **▶ Continue** on the menu resumes the last game, **Load game** lists the autosave and 3 slots, and **Save** in the crew panel writes to a slot. Saves live in this browser's `localStorage`.
- **Menu → confirmation:** pressing Menu pauses the game and asks "Leave this mission?" (Keep playing / Save to a slot / Leave).

## Look and feel

A gritty helmet-cam style, all drawn by code:
- **Rendering:** cel shading with ink outlines, a dark visor frame, and faint scanlines.
- **HUD text:** red, orange, purple and white terminal-style text in a built-in typewriter font (Courier New), floating on the visor with corner brackets instead of boxes.
- **Status colors** stay readable without color: every gauge shows the word OK, LOW or CRITICAL. LOW is amber, and CRITICAL is a flashing white-on-red block.
- **HUD layout (helmet-cam style):**
  - top left: a white turning person with an orange health arc, and the budget in orange;
  - top center: a red clock box showing the day and the time of day (the work day runs 6 AM–6 PM);
  - top right: white control hints that change with the station you're next to (e.g. `Repair & run the scrubber : [E]`);
  - right: the crew list in purple;
  - bottom center: three action slots for today (done, empty or busy);
  - bottom left: the mission log in purple.

  Panels and cards use corner brackets instead of boxes, and choice cards have red corners.
- **More keys:** **Esc**/**M** pause menu, **K** save, **T** tutorial.
- **Solar arrays:** each array is a wing of 12 NASA-blue cells in a frame that tilts toward the Sun and folds flat in the dark. The Moon starts with 2 arrays (24 cells) and Mars with 6 (72 cells).
- **Main menu:** NASA blue, with white text and NASA-red accents (colors only, no logos). It has corner bracket marks, a distressed title stamp, a red satellite dot circling on a faint orbit line, and twinkling stars. The `> Continue / New mission / Load game / Demo mode / Learn` list sits on the left, a center mission-setup panel opens like a screen switching on, and a "Save Files" panel slides in from the right.
- **Transitions:**
  - a short boot screen when the page opens;
  - a mission-loading sequence that links each NASA dataset line by line (DONKI, BVAD, Moon Trek or RAD), checks the crew, then shuts off like an old CRT monitor (any key skips it);
  - a fade to black between days ("DAY 5 · 06:00 · SUNLIT");
  - night cards that type themselves in.
- **Night cards** read like a message from a real person: "FROM: RORY · ENGINEERING", "FROM: SPACE WEATHER DESK · DONKI". Each option has a big number key and plain cost and gain lines (▾ costs, ▴ gains).
- **Gauges** are compact one-line readouts. Click a gauge's name (marked ?) for the "Why?" explanation. A warning word (LOW, HIGH, CRITICAL) appears only when something needs attention.
- **Pause menu (Esc or M):** Resume, Save game, Tutorial, switch view, Learn & NASA data, Quit to main menu.
- **Crew suits:** orange, with twin yellow air tanks, an X harness and dark helmets. A colored armband and helmet stripe tell the crew apart.
- **Vitals (top left):** a hand-drawn outline of a person that slowly turns, inside a red tick ring showing your health. Each part turns from white, to light red, to deep red and flashing as its need fails: chest = air, belly = food and water, head = radiation, and arms and legs = overall health.
- **First-person mode:** press **V**. Click to mouse-look; Esc frees the mouse. You hold a flashlight and your helmet lamp lights the scene.

## How to run

Double-click `index.html`. It opens in Chrome, Edge, Firefox or Safari.

- **Self-test:** open `index.html?selftest`, or use Learn → Self-test. From a terminal you can also run:

```bash
node selftest.js
```

## Controls

| Action | Keyboard / mouse | Touch |
|---|---|---|
| Walk | WASD or arrow keys | On-screen joystick |
| Jump (real Moon / Mars gravity) | **Space** | JUMP button |
| Look around / zoom | Drag the mouse / scroll wheel | Drag on the right side of the screen |
| Use a station (repair, water, reroute, build, ration, drill) | **E** | **E** button |
| Explain a station | **Q** (or the Why? button in the prompt) | **?** button |
| Pick a night choice | **1** or **2** | Tap the card |
| Learn panel (data, glossary, numbers, self-test) | **L** | button |
| Skip the 3-second briefing | **Enter** | |
| First-person / third-person view | **V** (click to mouse-look) | VIEW button |
| Close a dialog | **Esc** | Close button |
| Spectator / cinematic camera | **O + P** together (Esc to leave) | |

## How a day works (about 30 seconds; set in `CONFIG`)

1. **Briefing (3 s):** the day's forecast, with NASA data tags. It covers sunlight or dark (Moon Trek), Earth in view (Moon Trek), solar storm warnings (DONKI), dust storms, and cargo.
2. **Work (27 s):** walk to stations and press E. You get up to 3 actions, each taking 3–5 s. Each action shows its **cost and gain** before you commit:
   - **Repair & run the scrubber:** −4 budget, −4 kg water, −30 kWh. Gives +3.58 kg O₂ and resets the scrubber to 100%.
   - **Water the plants:** −8 kg water. The plants keep growing.
   - **Reroute power to life support:** turns the grow lights off for the day. The air system runs at 150%.
   - **Build a shield layer:** −12 budget. Each berm layer cuts storm particles ×0.6 and cosmic rays ×0.9.
   - **Pack lean rations:** −30% food today, −4 morale.
   - **Ice drill on/off:** 6.7 kW for +3.1 kg of water a day (BVAD).
3. **Night choice:** the clock pauses and a card offers two options, each with a stated cost and gain. Cards are generated from the current state plus NASA data (12 kinds, with cooldowns), so no two missions match.
4. **Result (2 s):** the tanks, plants and berm change in 3D, a night report appears, and the next day begins.

The crew work visibly at their stations: **Mira** (dark ponytail, green suit) in the greenhouse, **Rory** (red hair, mustard suit) at the scrubber, and **Tomas** (vest over a teal suit) at the solar array outside, with his helmet on. They eat at the game table, rest in the bunks when sick, and walk into the storm shelter during solar particle events.

**Tutorial (11 steps, skippable, Back/Next):** welcome and goal → walking → reading the dashboard → the day clock, actions and budget → follow the arrow to the scrubber → reading the cost/gain prompt → press E to repair → water the greenhouse → the other stations and the airlock → night decision cards and NASA data tags → the crew, saving and the Learn panel. Steps that ask you to do something continue on their own once you do it. The day clock is paused throughout.

**Win:** finish 20 days (`CONFIG.missionDays`) with everyone alive and no system failed. **Score** = crew health + budget + O₂ kg + water/5 + food/2 − dose/2. The best score per mode is saved in `localStorage`.
**Lose:** any system at zero two days in a row, a crew member's health reaches 0 (they "must fly home"), or the dose reaches 60 mSv. The debrief traces the chain of failure.

## NASA data → mechanic → 3D object

| Data field | Value used | Mechanic and the 3D object it changes |
|---|---|---|
| DONKI SEP events, window 2024-05-01 → 2024-06-29 (archived) | 27 SEP records → 6 storm days: May 9, 10, 11, 13; Jun 8, 12. Each mission replays 20 days from a random start in the window. | Storm days trigger the "Solar particle event tomorrow" card. The **storm shelter alarm** blinks, the **crew walk into the shelter**, and the dose gauge rises. |
| DONKI GOES ">100 MeV" flag + instrument count | Strong (May 11, Jun 8) 30 mSv base, moderate 10 mSv, +5% per detecting instrument (dose scale **simplified**) | Storm dose before shielding, shown on the radiation gauge and in the card's cost text |
| DONKI linked flare/CME (`linkedEvents`) | Warning 0–2 days before particles (e.g. May 10 SEP ← May 8 flares) | "Flare seen" in the briefing gives time to build **berm layers** |
| Curiosity RAD surface dose (MSL-M-RAD-3-RDR-V1.0, published summary) | 0.64 mSv/day at Gale Crater | Mars background dose. The **regolith berm ring** grows with each layer and cuts it ×0.9 per layer. |
| Curiosity RAD cruise dose (published summary) | 1.84 mSv/day × ½ (the Moon blocks half the sky) = 0.92 mSv/day | Moon background dose |
| Moon Trek `WAC_POLE_ILL_PCT_SOUTH_100M` (**simplified estimates**) | Connecting Ridge 86%, Shackleton Rim 75%, Malapert 62% | Dark spell = (1 − illum.) × 29.5 days, starting Day 9: 4, 7 or 11 dark days. **Solar panels fold flat and stop glowing**, the **sky darkens**, and the "Sunset" card asks about grow lights. The darkest site needs the **reactor** (it appears outside). |
| Moon Trek `AVGVISIB_85S_060M_201608_EARTH_SP` (**simplified estimates**) | 35%, 55%, 85% | Comm windows: the **blue Earth sphere appears in the sky** only when visible. Orders wait for Earth to rise, and calls home are possible. |
| BVAD Table 3-31: O₂ consumed | 0.895 kg/CM-d → 3.58 kg/day for 4 crew | O₂ use. The **O₂ tank fill height** falls and rises; the **scrubber alarm** blinks when low. |
| BVAD Table 3-31: CO₂ produced | 1.085 kg/CM-d → 4.34 kg/day | CO₂ build-up as the scrubber wears out (ppm gauge, scrubber alarm) |
| BVAD Table 3-31: food solids | 0.800 kg/CM-d (dry) | Food use; **galley alarm** |
| BVAD water use, planetary base | 2.5 + 0.4 hygiene + 0.5 flush = 3.4 kg/CM-d | Water use; short showers remove the 0.4 hygiene share. **Water tank level.** |
| BVAD ISS urine processor recovery | 85% | Recycler returns 85%, so about 2 kg is lost every day |
| NASA Planetary Fact Sheets: surface gravity | Moon 1.62 m/s², Mars 3.71 m/s² (Earth 9.81). Hop push-off 1.5 m/s is a **simplified** estimate matching Apollo surface hops. | **Space** makes your astronaut jump with real ballistics (h = v²/2g): **0.69 m and 1.85 s in the air on the Moon, 0.30 m and 0.81 s on Mars** (0.11 m on Earth). The first hop logs the numbers. |
| BVAD Tables 4-90/4-91: white potato | 21.06 g food, 32.23 g O₂, 45.23 g CO₂, 4.0 kg water per m²·day | 40 m² bed: 0.84 kg food and 1.29 kg O₂ per day. **Plant cones grow, and turn yellow when dry and brown when dead.** |
| BVAD Table 4-85: lunar O₂ from polar water | 1 t O₂/yr at 6.7 kW → 3.1 kg water/day | **Ice drill** (its bit spins while on) |
| Fallback: Moon day/night 14.75 days | Lunar cycle 29.5 days | Length of the lunar month |
| Fallback: Mars dust storms cut solar power | Storm sunlight 30% (50% if brushed) | **Dust fog thickens** and the panels dim |

### Values still on fallbacks or simplified

- **Moon Trek site values.** The layer values were not pasted, so these are rounded estimates, labeled "simplified" in the Learn panel. Edit `NASA_DATA.moonTrek.sites` with real readings.
- **DONKI dose sizes** (DONKI lists events, not doses), the **mission dose limit** (60 mSv), and **RAD**, which uses the published mission summary rather than numbers re-derived from raw PDS files.
- **Game engineering values**, all named constants with comments: 10 kW solar array, 200 kWh battery, 10 kW reactor, scrubber/recycler/base loads, 60% electrolyzer efficiency, 150 W/m² grow lights, 6-day crop growth, 500 m³ cabin, berm factors, scrubber wear per day.

**Physics formulas** (in code with comments):
- Electrolysis: 285.8 kJ/mol × 2 ÷ 32 g = 4.96 kWh per kg O₂.
- Water per kg O₂: 36.03 g water ÷ 32.00 g O₂ = 1.126.
- Mars sunlight: 1 ÷ 1.524² = 43% of the Moon's.
- CO₂: 1 kg ≈ 0.55 m³ of gas, which in a 500 m³ cabin is ≈ 1,100 ppm.

## Demo Mode (about 23 seconds, same day loop)

From the menu: **Demo mode → Watch** or **Play by hand**.

**Demo mode → Cinematic (30 s)** plays a hands-free trailer with captions. It starts on the Moon with the base, the solar wings and a walk through the airlock ("Learn to operate a space outpost", "Power it with real Moon sunlight data", "Keep four crew alive for 20 days"). A black "Next stop: Mars" card cuts to the Mars base for the greenhouse and the storm shelter ("Grow food · recycle air and water", "Survive real solar storms"). It ends with a crane shot and the title card, then returns to the menu (Esc skips it). Use it to film the trailer for your submission video.

- **Watch** looks exactly like someone playing: no captions or demo text. It is short enough to screen-record as the Space Apps 30-second video demo. Esc exits.
- **Play by hand** adds captions for each step, naming the NASA dataset behind it.

| Time (Watch) | What happens | NASA data shown on screen |
|---|---|---|
| 0–3 s | Day 6 briefing: oxygen is **LOW**, the scrubber is worn, its alarm blinks red. | BVAD tag in the briefing |
| 1–4 s | The commander walks straight to the **O₂ scrubber** and presses **E**. The prompt shows the cost: −4 kg water, −30 kWh, −4 budget. | BVAD rates in the prompt |
| 4–8 s | The repair runs; the **O₂ tanks visibly refill** and the mission log records the result. | BVAD tag in the log |
| 8–18 s | The day ends and a night card arrives from the **Space Weather Desk**: a real solar particle event, May 9, 2024. The crew shelters. | DONKI tag on the card |
| 18–23 s | Day 7: the crew heads into the storm shelter, then the demo returns to the menu. | DONKI in the briefing |

### 30-second video script (Space Apps demo)

> **(0–5 s)** "Outpost 3D: Walk the Base. You run a Moon or Mars base where real NASA data decides the sunlight, the storms and how much your crew breathes."
>
> **(5–15 s)** "Oxygen is low, so I walk to the scrubber and press E. Before I commit, I see the trade-off: making oxygen uses water and power. NASA's BVAD handbook says four people breathe 3.58 kg a day."
>
> **(15–25 s)** "At night the game turns real NASA space-weather records into decisions: this solar storm really happened in May 2024. I shelter the crew: they stay safe, but we lose a day of work."
>
> **(25–30 s)** "Every choice costs something. That's what keeps an outpost alive."

If anyone under 18 is on the team, the Space Apps terms say their recognizable name, voice or face should not appear in the submission. Use on-screen text or an adult narrator for the video.

## Spectator mode (cinematic shots)

Press **O and P together** during a mission. The HUD disappears and cinematic black bars slide in. The game clock freezes while the crew keep working.

| Control | Action |
|---|---|
| WASD / arrows | Fly forward, back and sideways (the camera glides with inertia) |
| Space / Shift | Up / down |
| Mouse (click to lock) or drag | Look around; the view eases smoothly for slow pans |
| Scroll wheel | Flying speed (0.5–40 m/s) |
| O + P or Esc | Back to the game |

The camera flies through walls, so you can film the cutaway habitat, the solar wings and the craters. The small "SI-assisted build" watermark stays on screen so recordings meet the Space Apps disclosure rule.

## Self-test results

The self-test runs the simulation only, with no 3D code, using the same code in the browser and in Node.

- **Good strategy wins 97%** of 1,000 runs. **Random play wins 21%** of 1,000 runs, failing mostly on power (365) and air quality (397).
- **Per mode:**
  - Pioneer: good strategy 95–99%; random play 6–30%.
  - Survivor: good strategy 67–85%.
  - Explorer: good strategy 100%; random play 30–54%, because Explorer is intentionally gentle.
- **Dataset checks**, changing one dataset at a time:
  - DONKI storms raise the Moon dose from 15.6 to 26.9 mSv.
  - RAD ×3 raises the Mars dose from 11.8 to 34.1 mSv.
  - Moon Trek 86% → 62% sunlight makes the reactor necessary in 100% of good runs (up from 11%), and random play's win rate falls from 21% to 8%.
  - BVAD +30% O₂ and food use drops good-strategy wins from 97% to 76%.
- **Formula checks** pass, every action and choice states a cost, and no run produced broken numbers.

**Performance:** 160–171 draw calls per frame. Measured render cost is 1.6 ms per frame at 1920×1200, about a tenth of the 16.7 ms budget for 60 fps. If a slow laptop drops below 45 fps, the game automatically lowers its render resolution (down to 60%) to stay smooth.

## Use of Super Intelligence (SI)

As the Space Apps rules require, this project discloses its use of AI ("Super Intelligence") tools:

- **Code and documentation:** written with **Claude (Anthropic)** through **Claude Code**. The team wrote the challenge brief, chose the concept, the gameplay, the art direction and every feature, and tested each build. Claude wrote the source code, the self-test and this README to that brief, and helped collect the NASA data values.
- **Metadata:** `index.html` carries `generator` and `ai-disclosure` meta tags and a comment at the top; `selftest.js` has a disclosure comment.
- **Images and video:** the game has no AI-generated images, audio or video assets; every visual is drawn by code at run time. Because that code is AI-written, the game shows a small visible watermark, "SI-assisted build (Claude) · NASA data", on every screen (menu, game and spectator mode), so screenshots and screen recordings carry it.
- **NASA branding:** none is used. No NASA logos, flags, insignia or mission identifiers appear in the game; the menu only uses blue, white and red colors.

## References (data, resources and tools)

**NASA data (archived snapshots embedded in `index.html`):**
- DONKI Space Weather Database, NASA CCMC: https://ccmc.gsfc.nasa.gov/DONKI-API/get/SEP (fetched 2026-11-14 for 2024-05-01 to 2024-06-29).
- Curiosity RAD surface dose, NASA PDS MSL-M-RAD-3-RDR-V1.0: https://pds-ppi.igpp.ucla.edu/data/MSL-M-RAD-3-RDR-V1.0/, using the published summaries Hassler et al., *Science* 343 (2014) and Zeitlin et al., *Science* 340 (2013).
- Moon Trek, NASA Solar System Treks (LRO): https://trek.nasa.gov/moon/, layers `WAC_POLE_ILL_PCT_SOUTH_100M` and `AVGVISIB_85S_060M_201608_EARTH_SP`. The three site values are simplified estimates, not layer readings (see above).
- Life Support Baseline Values and Assumptions Document (BVAD), NASA/TP-2015-218570/REV2: https://ntrs.nasa.gov/citations/20210024855

**Tools:** Claude Code (Anthropic) for writing code; GitHub for hosting the code; Vercel for hosting the playable site. The game uses no third-party code, libraries, fonts, images or sounds: the WebGL renderer is hand-written, and text uses the browser's built-in fonts.

## License

Open source under the [MIT License](LICENSE), as the Space Apps terms require for original content. NASA data values remain from their public NASA sources.

## Files

- `index.html`: the whole game (data, simulation, renderer, scene, HUD, demo, self-test).
- `selftest.js`: runs the same simulation headless in Node (`node selftest.js`, or `node selftest.js modes`).
- `README.md`: this file.
- `LICENSE`: MIT open-source license.
- `SUBMISSION.md`: draft text for the Space Apps project form.
