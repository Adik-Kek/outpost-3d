# Outpost: Last Light

A mission-commander game for the NASA Space Apps Challenge. You run a 4-person base on the **Moon's south pole** or at **Gale Crater on Mars** for 90 days. Every choice trades one need against another: power, oxygen, CO₂, water, food, radiation, morale and budget. Real NASA data decides when the Sun sets, when solar storms hit, and how much your crew breathes and eats.

## How to run

1. Double-click `index.html`. It opens in any modern browser and works offline. There is nothing to install or download.
2. Choose Moon or Mars, a landing site (Moon), and a difficulty. Then press **🚀 Launch mission**.

## Controls

| Action | Mouse / touch | Keyboard |
|---|---|---|
| End the day | **End day ▶** button | `Enter` |
| Pick an event choice | Tap the choice card | `1`, `2` |
| See what a choice costs | Hover, tap or tab to it: the **Trade-off preview** updates | `Tab` |
| Explain a gauge | **Why?** button on each gauge | |
| Learn panel (data, glossary, formulas, self-test) | **📚 Learn** | `L` |
| Tutorial again | **❓ Help** | `?` |
| Close a panel | **Close ✕** | `Esc` |

## Demo Mode (60 seconds)

On the start screen, press **▶ Demo Mode (watch, 60 s)** to see it play automatically. Press **🖐 Demo Mode (play by hand)** to make the decision yourself. The demo uses the real game engine.

### Presentation outline (the same three beats as the demo)

| Beat | Time | What judges see | Caption (dataset named) |
|---|---|---|---|
| 1. Problem | 0–20 s | Day 18 at Connecting Ridge. The Sun sets, the O₂ gauge flashes **CRITICAL** (1.8 days left), CO₂ is **HIGH**, and the forecast shows 4 dark days. | "Night falls… oxygen is CRITICAL. Data: Moon Trek illumination 86% → about 4 dark days." |
| 2. Decision | 20–40 s | Power moves from the greenhouse lights to the air system (Air → **Boost**, Greenhouse → **Off**). The trade-off preview shows the kW, battery and O₂ change. | "Decision: reroute power to the air scrubbers. Data: BVAD, 4 crew breathe 3.58 kg O₂ a day." |
| 3. Consequence | 40–60 s | Day ends. A **Before → After** card on the same screen shows O₂ 6.5 → 8.3 kg (CRITICAL → LOW) and CO₂ 6,900 → 4,513 ppm (HIGH → OK). The battery drops 230 → 105 kWh and the crops pause. The mission log records the result. | "Consequence: oxygen climbs, CO₂ drops, but the crops pause and the battery drains. Data: BVAD." |

### 60-second script for the judges

> **(0–20 s)** "This is our Moon base at Connecting Ridge. NASA's Moon Trek data says this spot gets sunlight 86% of the time, so about 4 days a month are dark. Night just fell, our battery is draining, and oxygen is critical: under 2 days left."
>
> **(20–40 s)** "We have to decide. I move power away from the greenhouse lights and boost the air system. The preview shows the cost before I commit: more kilowatts for the O₂ maker, a bigger battery drain, and the plants stop growing. BVAD says four people need 3.58 kg of oxygen every day."
>
> **(40–60 s)** "End the day. Oxygen rose from 6.5 to 8.3 kg, and CO₂ is back to safe. But the battery dropped to 105 kWh and the crops lost a day. That's the lesson: on the Moon, no gain is free. Real NASA data decides when it's dark, when solar storms hit, and how much the crew breathes."

## NASA data → mechanics

All data is embedded in one `NASA_DATA` object at the top of `index.html`. Every dataset is an **archived snapshot, not a live feed**. Each one is labeled with its source, status and mechanic in the in-game **📚 Learn → NASA data sources** panel.

| Data field | Value used | Mechanic it changes |
|---|---|---|
| DONKI SEP events (2024-05-01 → 2024-06-29) | 27 SEP records grouped into 6 storm days: May 9, 10, 11, 13; Jun 8, 12 | Solar storm days. The 60-day window replays from a random start day, so storms land on different mission days each game. |
| DONKI SEP instrument: GOES ">100 MeV" | Strong on May 11 and Jun 8 (30 mSv base); others moderate (10 mSv base, *simplified scale*), +5% per detecting instrument | Storm dose before shielding |
| DONKI linked FLR/CME (`linkedEvents`) | Warning lead: 0–2 days (e.g. May 10 SEP linked to May 8 flares) | The forecast shows the storm in advance. Storm room cuts dose ×0.2 if warned, ×0.5 if not. |
| Curiosity RAD surface dose (MSL-M-RAD-3-RDR-V1.0, published summary) | 0.64 mSv/day at Gale Crater | Mars daily background dose. Each shield layer cuts it ×0.9. |
| Curiosity RAD cruise dose (published summary) | 1.84 mSv/day × ½ (Moon blocks half the sky) = 0.92 mSv/day | Moon daily background dose |
| Moon Trek `WAC_POLE_ILL_PCT_SOUTH_100M` (*simplified estimates*) | Connecting Ridge 86%, Shackleton Rim 75%, Malapert Massif 62% | Sunlit vs dark days: (1 − illum.) × 29.5 days dark per month, so solar output is 0 at night |
| Moon Trek `AVGVISIB_85S_060M_201608_EARTH_SP` (*simplified estimates*) | 35%, 55%, 85% | Comm windows. You can only order a supply ship while Earth is in view, and morale gets +0.5 on those days. |
| BVAD Table 3-31: O₂ consumed | 0.895 kg/CM-d → 3.58 kg/day for 4 crew | Oxygen use; power and water needed by electrolysis |
| BVAD Table 3-31: CO₂ produced | 1.085 kg/CM-d → 4.34 kg/day | CO₂ build-up that the scrubbers must remove |
| BVAD Table 3-31: food solids | 0.800 kg/CM-d (dry) | Food use (Lean ×0.75, Normal ×1, Treat ×1.15) |
| BVAD water use (planetary base column) | 2.5 + 0.4 hygiene + 0.5 flush = 3.4 kg/CM-d | Daily water use |
| BVAD §4: ISS urine processor recovery | 85% | Water recycler return at Normal (Low = 60% of that, Off = 0) |
| BVAD Tables 4-90/4-91: white potato | 21.06 g food, 32.23 g O₂, 45.23 g CO₂, 4.0 kg transpired water per m²·day | Greenhouse output per 20 m² bed |
| BVAD Table 4-85: lunar O₂ from polar water | 1 t O₂/yr at 6.7 kW → 3.1 kg water/day | Ice miner power and water |
| BVAD Table 4-85: Martian O₂-only ISRU | 22.7 t O₂/yr at ~32 kW → 3.9 kg O₂/day at 2 kW | Mars CO₂→O₂ maker |
| Fallback: Moon day/night 14.75 days | Lunar cycle 29.5 days | Length of the lunar "month" for dark spells |

### Values still using fallbacks or simplified numbers

- **Moon Trek illumination and Earth visibility for the 3 sites.** The layer values were not pasted. These are rounded estimates and are labeled "simplified" in the Learn panel. Replace them by reading the two layers at your chosen sites and editing `NASA_DATA.moonTrek.sites`.
- **DONKI dose sizes.** DONKI lists events, not doses, so the 10/30 mSv scale is a game scale (labeled simplified).
- **Curiosity RAD.** Uses the published mission summary (Hassler 2014, Zeitlin 2013) of the RAD archive, not numbers re-derived from raw PDS files.
- **Game engineering values (simplified, named constants with comments):** 10 kW solar array, 200 kWh battery, 10 kW reactor, 0.5 kW scrubber, 0.6 kW recycler, 2 kW base load, 60% electrolyzer efficiency, 300 W/m² grow lights, 20-day first harvest, 500 m³ cabin, shield factors (×0.9 cosmic rays, ×0.6 storm particles per layer), and a 150 mSv mission dose limit.

Formulas derived from physics (all in the code with comments): electrolysis energy 285.8 kJ/mol × 2 ÷ 32 g = 4.96 kWh/kg O₂; water per kg O₂ = 36.03 ÷ 32.00 = 1.126; Mars sunlight = 1 ÷ 1.524² = 43% of the Moon's.

## How the judging criteria are met

| Criterion | Feature |
|---|---|
| **Impact** | Each system teaches one idea: O₂ costs power *and* water, recycling loses 15% a day, cosmic rays are hard to block while storm particles are easier, plants are slow and power-hungry, and long lunar nights need stored or nuclear power. The debrief's **What you learned** gives three facts built from your own run's numbers. |
| **Creativity** | A named crew with quirks (Ada steadies morale, Kenji grows more food, Rosa repairs for less, Sam heals and tells jokes) and reactive one-liners. 11 event cards, each a clear two-way choice with a visible cost. A day-1 arrival choice and a tutorial get you playing in under a minute. Real storm dates appear in the cards. |
| **Validity** | Every rate is a named constant from `NASA_DATA` or a commented formula. The self-test checks formulas, checks that nothing is free (every build costs budget, every level above Off uses power, every event choice states a cost), and plays 2,000 missions. No console errors in browser testing. |
| **Relevance** | All four datasets change outcomes, and the self-test proves it by changing one dataset at a time (see below). |
| **Presentation** | Demo Mode (watch or play), the Before → After card on one screen, captions naming the dataset, and the outline above. |

## Self-test results

Run it in the game (📚 Learn → Self-test → Run) or from a terminal:

```bash
node selftest.js
```

```bash
node selftest.js modes
```

Latest results (1,000 runs each, mixed Moon sites and Mars, Pioneer):

- **Good strategy: 99.9% wins.** **Random play: 0% wins** (fails on air quality 535, crew health 297, power 163, water 5).
- Dataset effects: DONKI storms raise the Moon dose from 68.8 to 104.4 mSv. Doubling RAD raises the Mars dose from 61.7 to 113.6 mSv. Moon Trek 86% → 62% sun lowers the average score from 702 to 636, because a reactor becomes necessary. BVAD +30% O₂/food use drops wins from 100% to 91%.
- Per mode, good strategy: 100% everywhere except Shackleton Rim Survivor 97%, Malapert Survivor 98%, and Mars Survivor 86%. Random play: 0% everywhere.
- A player who never changes anything loses on the first lunar night (Day ~20) or runs out of water on Mars (Sol ~69).

Best scores are saved per mode (location, site and difficulty) in `localStorage`.

## Files

- `index.html`: the whole game (data, engine, UI, demo, self-test).
- `selftest.js`: runs the same engine headless in Node.
- `README.md`: this file.
