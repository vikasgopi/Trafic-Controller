(() => {
  "use strict";

  const states = [
    { id: "S0", name: "Main Road Green", main: "green", side: "red" },
    { id: "S1", name: "Main Road Yellow", main: "yellow", side: "red" },
    { id: "S2", name: "Side Road Green", main: "red", side: "green" },
    { id: "S3", name: "Side Road Yellow", main: "red", side: "yellow" }
  ];

  const el = id => document.getElementById(id);
  const modulusInput = el("modulus");
  const speedInput = el("speed");
  let modulus = Number(modulusInput.value);
  let speed = Number(speedInput.value);
  let count = 0;
  let stateIndex = 0;
  let running = false;
  let timer = null;

  const lampIds = {
    main: { red: "mr-r", yellow: "mr-y", green: "mr-g" },
    side: { red: "sr-r", yellow: "sr-y", green: "sr-g" }
  };

  function render() {
    const state = states[stateIndex];
    el("state-name").textContent = state.id;
    el("state-description").textContent = state.name;
    el("counter-value").textContent = String(count).padStart(2, "0");
    const bits = Math.max(1, Math.ceil(Math.log2(modulus)));
    el("binary-value").textContent = count.toString(2).padStart(bits, "0");
    el("progress-count").textContent = `${count} / ${modulus} counts`;
    el("duration-label").textContent = `Mod-${modulus}`;
    el("state-progress").style.width = `${(count / modulus) * 100}%`;

    for (const [road, colorMap] of Object.entries(lampIds)) {
      for (const [color, id] of Object.entries(colorMap)) {
        const lamp = el(id);
        lamp.className = "mini-lamp";
        if (states[stateIndex][road] === color) lamp.classList.add("active", color);
      }
    }

    document.querySelectorAll("tbody tr[data-state]").forEach(row => {
      row.classList.toggle("current-row", row.dataset.state === state.id);
    });
    el("start-btn").textContent = running ? "Ⅱ Pause" : "▶ Start";
    el("run-status").textContent = running
      ? `Running · ${speed.toFixed(1)}× clock speed`
      : "Paused · Press Start or Step pulse.";
  }

  function pulse() {
    count += 1;
    if (count >= modulus) {
      count = 0;
      stateIndex = (stateIndex + 1) % states.length;
    }
    render();
  }

  function stopTimer() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(pulse, 1000 / speed);
  }

  function toggleRun() {
    running = !running;
    if (running) startTimer();
    else stopTimer();
    render();
  }

  el("start-btn").addEventListener("click", toggleRun);
  el("step-btn").addEventListener("click", () => {
    if (running) {
      running = false;
      stopTimer();
    }
    pulse();
  });
  el("reset-btn").addEventListener("click", () => {
    running = false;
    stopTimer();
    count = 0;
    stateIndex = 0;
    render();
  });

  modulusInput.addEventListener("input", () => {
    modulus = Number(modulusInput.value);
    el("modulus-value").textContent = modulus;
    count = 0;
    render();
  });

  speedInput.addEventListener("input", () => {
    speed = Number(speedInput.value);
    el("speed-value").textContent = `${speed.toFixed(1)}×`;
    if (running) startTimer();
    render();
  });

  render();
})();
