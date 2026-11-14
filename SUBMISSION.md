# Space Apps project form: draft answers

Copy these into your team's Project page on spaceappschallenge.org (submission closes **Sunday, November 15, 11:59 PM** local time). Edit anything that doesn't sound like your team. Don't add the names, voices or faces of team members under 18.

## Project Name
Outpost 3D: Walk the Base

## High-Level Project Summary
Outpost 3D is a free browser game where students command a four-person base on the Moon's south pole or in Mars's Gale Crater for 20 days. You walk around a 3D habitat, repair the oxygen scrubber, water the potato beds, build radiation shielding and make one hard decision every night. Every gain costs something: oxygen costs water and power, plants need light and time, and sheltering from a storm costs a day of work. Real NASA data drives the game: actual 2024 solar storms from DONKI, Curiosity's measured Mars radiation dose, Moon Trek sunlight and Earth-visibility patterns, and NASA's life-support rates from the BVAD handbook. Players feel why missions succeed or fail, and the end-of-mission debrief explains what they learned from their own run.

## Link to Project Demo
(Record **Demo mode → Watch** from the main menu. It runs about 23 seconds with no captions. Add the script from README.md as narration or on-screen text, upload to YouTube or Google Drive as public, and paste the link here.)

## Link to Final Project
- Play: https://outpost-3d.vercel.app
- Code: https://github.com/Adik-Kek/outpost-3d

## Detailed Project Description
**What it does.** The player is the commander, an astronaut walking a cutaway lunar or Martian outpost. Each day lasts about 30 seconds: a 3-second briefing with that day's NASA-data forecast, about 27 seconds to take up to three actions at stations (each shows its cost and gain first), then a night decision card, and a short result. A mission lasts 20 days. You win if everyone survives with all systems running; you lose if any system is at zero two days in a row, someone becomes critically ill, or the crew reaches the radiation limit. The debrief lists the decisions that helped and hurt most, the first system to fail, the chain of failure, and three "What you learned" facts from the player's own run.

**How it works.** The whole game is one HTML file with no libraries or downloads. A hand-written WebGL renderer draws everything from code (cel shading, ink outlines, a 3D habitat, crew, a curved cratered planet surface and NASA-blue solar arrays). The simulation is separate from the 3D code, so a built-in self-test can play 1,000 missions with a sensible strategy (wins 97%) and 1,000 with random choices (wins 21%). It also checks each formula and proves every NASA dataset changes outcomes.

**Learning features.** "Why?" explanations on every gauge and station, a glossary, a NASA data panel, an 11-step tutorial, Explorer/Pioneer/Survivor difficulty, Moon and Mars maps, first-person view, saving, and a Demo Mode.

**Benefits.** Students experience real engineering trade-offs instead of reading about them, at a level a middle-school player can follow.

**Tools.** HTML, CSS, JavaScript and WebGL; Node.js for the headless self-test; GitHub and Vercel for hosting; Claude Code (Anthropic) for writing code (see below).

## Use of Super Intelligence (SI)
Yes. The source code and documentation were written with Claude (Anthropic) through Claude Code. Our team wrote the challenge brief and chose the concept, gameplay, art direction and features, and tested each build; Claude wrote the code to that brief and helped look up the NASA data values. This is disclosed in the README, in the HTML metadata (generator and ai-disclosure tags) and in code comments, and a visible "SI-assisted build" watermark appears on every screen, so screenshots and recordings carry it. No AI-generated images, audio or video are used: all visuals are drawn by code. No NASA logos or branding are used.

## NASA Data
- **DONKI (NASA CCMC):** 27 solar particle event records from May–June 2024, grouped into 6 storm days. They set when storms hit, how strong they are, and how much warning the crew gets.
- **Curiosity RAD (NASA PDS):** 0.64 mSv/day on the Mars surface, plus the 1.84 mSv/day cruise dose used for the Moon. They set background radiation and the value of shielding.
- **Moon Trek (NASA Solar System Treks, LRO):** south-pole illumination and Earth-visibility layers. They set dark days for solar power and when Earth is in view. The three site values are simplified estimates.
- **BVAD, NASA/TP-2015-218570/REV2:** oxygen, CO2, food and water per crew member, water recovery, potato crop output, and ice-mining power. They drive all consumption and production.

## Space Agency Partner Data and Other References
No Space Agency Partner data was used. References: the DONKI API, the PDS RAD archive, Hassler et al. 2014 and Zeitlin et al. 2013 (Science), Moon Trek, and BVAD (links in README.md). Tools: Claude Code, GitHub, Vercel. No third-party code, libraries, fonts, images or sounds are used. The code is released under the MIT License.
