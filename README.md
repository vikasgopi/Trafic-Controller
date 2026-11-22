# Traffic-Light Controller with Mod-N Counter

An interactive, responsive web-based EDL capstone demonstration. The project models a two-road traffic junction using a four-state finite-state machine (FSM) and a configurable Mod-N counter.

## Live demo

After enabling GitHub Pages, your site will be available at:

`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/`

Replace the placeholders with your GitHub username and repository name.

## Features

- Interactive two-road traffic-light junction.
- Four-state FSM: Main Green → Main Yellow → Side Green → Side Yellow.
- Configurable Mod-N counter (2–20, default Mod-10).
- Start, pause, step-pulse and reset controls.
- Adjustable simulation clock speed.
- Decimal and binary counter display.
- State/output table highlights the active state.
- Responsive layout for desktop, tablet and mobile.
- No frameworks, package installation, API keys or build step required.

## Run locally

1. Download or extract this repository.
2. Open `index.html` in a modern browser.
3. Press **Start** to run the controller, **Step pulse** to advance one clock pulse, or **Reset** to return to S0.

## Publish with GitHub Pages

1. Sign in to GitHub and create a new **public** repository, for example `traffic-light-mod-n-counter`.
2. Upload the contents of this project folder to the repository root. Make sure `index.html`, `styles.css` and `script.js` are at the root level.
3. Open the repository **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**, then click **Save**.
6. Wait for GitHub Pages to publish the site. Refresh the Pages section to find the live URL.

No GitHub Actions workflow or external hosting service is required for this static project.

## Design overview

### Functional blocks

1. **Clock source:** provides periodic pulses.
2. **Clock divider:** in a physical circuit, reduces the clock frequency to a visible interval.
3. **Mod-N counter:** counts from 0 to N−1, then rolls over to 0.
4. **FSM:** advances through the four traffic states on each terminal-count event.
5. **Output decoder:** activates the correct lamps for the current state.

### State and output table

| State | Main Road | Side Road | Next state |
|---|---|---|---|
| S0 | Green | Red | S1 |
| S1 | Yellow | Red | S2 |
| S2 | Red | Green | S3 |
| S3 | Red | Yellow | S0 |

A `1` in the design's output table means ON; `0` means OFF.

### Mod-N counter

A Mod-N counter cycles through N distinct values. The minimum number of flip-flops required is:

`k = ceil(log2(N))`

For Mod-10, four flip-flops are required. The browser simulator uses a software timer to demonstrate the count and FSM sequence. It is a conceptual simulation, not a gate-level hardware simulator.

## Project structure

```text
traffic-light-mod-n-capstone/
├── index.html
├── styles.css
├── script.js
├── README.md
├── LICENSE
└── .nojekyll
```

## Limitations and safety

- The four-state model is simplified for classroom demonstration.
- A six-state version can add an all-red clearance interval after each yellow state.
- This project does not read vehicle sensors, detect pedestrians or implement emergency-vehicle priority.
- This is an educational prototype only. It must not be connected to or used to control real road traffic infrastructure.

## Suggested future improvements

- Add a six-state sequence with all-red clearance intervals.
- Add a timing configuration panel for separate green/yellow durations.
- Add a circuit-level schematic and flip-flop excitation tables.
- Add a downloadable simulation report.
- Add a manual/automatic mode selector.

## Academic use

Use this project as a working demonstration and learning aid. Add your own name, institution details, screenshots, simulation observations and any circuit implementation required by your lecturer. Review and understand the design before presenting or submitting it.
