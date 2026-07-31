let toastTimer;
let landingUnlocked = false;
let transitionInProgress = false;
let birdsPaused = false;

function initPlanet() {
  const welcomeScreen = document.querySelector(".welcome-screen");
  const toast = document.querySelector(".discovery-toast");
  const discoveries = document.querySelectorAll(".easter");
  const birds = [...document.querySelectorAll(".golden-bird")];
  const islands = [...document.querySelectorAll(".explore-screen > .island")];
  const islandLinks = [...document.querySelectorAll('.island-nav a[href^="#"]')];
  const signalIsland = document.querySelector("#signal");
  const signalStoryScroller = document.querySelector(".signal-stories");
  const signalIndexLinks = [...document.querySelectorAll('.signal-index a[href^="#signal-"]')];
  const signalStories = [...document.querySelectorAll(".signal-stories .signal-story")];
  const commonsStoryScroller = document.querySelector(".commons-stories");
  const commonsIndexLinks = [...document.querySelectorAll('.commons-index a[href^="#commons-"]')];
  const commonsStories = [...document.querySelectorAll(".commons-stories .commons-story")];
  const studioStoryScroller = document.querySelector(".studio-stories");
  const studioIndexLinks = [...document.querySelectorAll('.studio-index a[href^="#studio-"]')];
  const studioStories = [...document.querySelectorAll(".studio-stories .studio-story")];
  const momentumStoryScroller = document.querySelector(".momentum-stories");
  const momentumIndexLinks = [...document.querySelectorAll('.momentum-index a[href^="#momentum-"]')];
  const momentumStories = [...document.querySelectorAll(".momentum-stories .momentum-story")];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  initSeasonNotes();

  if (location.hash && document.querySelector(location.hash)?.classList.contains("island")) {
    landingUnlocked = true;
    document.body.classList.add("site-entered");
    showIsland(location.hash);
  } else {
    document.body.classList.add("landing-locked");
  }

  document.addEventListener("click", (event) => {
    const exitTrigger = event.target.closest('[data-action="exit-site"]');
    if (exitTrigger) {
      event.preventDefault();
      landingUnlocked = false;
      document.body.classList.add("landing-locked");
      document.body.classList.remove("site-entered");
      islands.forEach((island) => island.classList.remove("is-active"));
      islandLinks.forEach((link) => link.removeAttribute("aria-current"));
      history.pushState(null, "", location.pathname);
      return;
    }

    const trigger = event.target.closest('[data-action="enter-site"]');
    if (!trigger) return;
    event.preventDefault();
    enterSite(trigger.getAttribute("href") || "#world-map");
  });

  islandLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetHash = link.getAttribute("href");
      if (!targetHash || targetHash === "#" || !document.querySelector(targetHash)?.classList.contains("island")) return;
      event.preventDefault();
      showIsland(targetHash);
      history.pushState(null, "", targetHash);
    });
  });

  window.addEventListener("popstate", () => {
    if (location.hash && document.querySelector(location.hash)?.classList.contains("island")) showIsland(location.hash);
  });

  signalIndexLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target || !signalStoryScroller) return;
      const targetTop = target.getBoundingClientRect().top - signalStoryScroller.getBoundingClientRect().top + signalStoryScroller.scrollTop;
      signalStoryScroller.scrollTo({ top: targetTop - window.innerHeight * 0.05, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
    });
  });

  signalStoryScroller?.addEventListener("scroll", () => {
    const guide = window.innerHeight * 0.3;
    let closest = signalStories[0];
    let closestDistance = Infinity;
    signalStories.forEach((story) => {
      const distance = Math.abs(story.getBoundingClientRect().top - guide);
      if (distance < closestDistance) {
        closest = story;
        closestDistance = distance;
      }
    });
    signalIndexLinks.forEach((link) => link.classList.toggle("is-current", link.getAttribute("href") === `#${closest?.id}`));
  }, { passive: true });

  commonsIndexLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target || !commonsStoryScroller) return;
      const targetTop = target.getBoundingClientRect().top - commonsStoryScroller.getBoundingClientRect().top + commonsStoryScroller.scrollTop;
      commonsStoryScroller.scrollTo({ top: targetTop - window.innerHeight * 0.05, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
    });
  });

  commonsStoryScroller?.addEventListener("scroll", () => {
    const guide = window.innerHeight * 0.3;
    let closest = commonsStories[0];
    let closestDistance = Infinity;
    commonsStories.forEach((story) => {
      const distance = Math.abs(story.getBoundingClientRect().top - guide);
      if (distance < closestDistance) {
        closest = story;
        closestDistance = distance;
      }
    });
    commonsIndexLinks.forEach((link) => link.classList.toggle("is-current", link.getAttribute("href") === `#${closest?.id}`));
  }, { passive: true });

  studioIndexLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target || !studioStoryScroller) return;
      const targetTop = target.getBoundingClientRect().top - studioStoryScroller.getBoundingClientRect().top + studioStoryScroller.scrollTop;
      studioStoryScroller.scrollTo({ top: targetTop - window.innerHeight * 0.05, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
    });
  });

  studioStoryScroller?.addEventListener("scroll", () => {
    const guide = window.innerHeight * 0.3;
    let closest = studioStories[0];
    let closestDistance = Infinity;
    studioStories.forEach((story) => {
      const distance = Math.abs(story.getBoundingClientRect().top - guide);
      if (distance < closestDistance) {
        closest = story;
        closestDistance = distance;
      }
    });
    studioIndexLinks.forEach((link) => link.classList.toggle("is-current", link.getAttribute("href") === `#${closest?.id}`));
  }, { passive: true });

  momentumIndexLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target || !momentumStoryScroller) return;
      const targetTop = target.getBoundingClientRect().top - momentumStoryScroller.getBoundingClientRect().top + momentumStoryScroller.scrollTop;
      momentumStoryScroller.scrollTo({ top: targetTop - window.innerHeight * 0.05, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
    });
  });

  momentumStoryScroller?.addEventListener("scroll", () => {
    const guide = window.innerHeight * 0.3;
    let closest = momentumStories[0];
    let closestDistance = Infinity;
    momentumStories.forEach((story) => {
      const distance = Math.abs(story.getBoundingClientRect().top - guide);
      if (distance < closestDistance) {
        closest = story;
        closestDistance = distance;
      }
    });
    momentumIndexLinks.forEach((link) => link.classList.toggle("is-current", link.getAttribute("href") === `#${closest?.id}`));
  }, { passive: true });

  function showIsland(targetHash) {
    const islandId = targetHash.replace("#", "");
    islands.forEach((island) => island.classList.toggle("is-active", island.id === islandId));
    islandLinks.forEach((link) => {
      if (link.getAttribute("href") === targetHash) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    const activeIsland = islands.find((island) => island.id === islandId);
    if (activeIsland) activeIsland.scrollTop = 0;
  }

  window.addEventListener("wheel", lockLandingWheel, { passive: false });
  window.addEventListener("keydown", lockLandingKeys);
  window.addEventListener("scroll", () => restoreLandingLock(welcomeScreen), { passive: true });

  discoveries.forEach((discovery) => {
    discovery.addEventListener("mouseenter", showDiscovery);
    discovery.addEventListener("focus", showDiscovery);
  });

  function showDiscovery(event) {
    if (!toast) return;
    window.clearTimeout(toastTimer);
    toast.textContent = event.currentTarget.dataset.note;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2600);
  }

  if (!prefersReducedMotion.matches && birds.length) {
    startBirdLife(birds);
  }

  function enterSite(targetHash) {
    if (transitionInProgress) return;

    const destinationHash = targetHash === "#world-map" ? "#signal" : targetHash;
    transitionInProgress = true;
    birdsPaused = true;
    showIsland(destinationHash);
    document.body.classList.add("is-transitioning", "button-pressed");

    window.setTimeout(() => {
      document.body.classList.add("hero-zooming");
    }, 200);

    window.setTimeout(() => {
      document.body.classList.add("hero-fading");
    }, 300);

    window.setTimeout(() => {
      document.body.classList.add("mist-expanding");
    }, 500);

    window.setTimeout(() => {
      landingUnlocked = true;
      document.body.classList.remove("landing-locked");
      document.body.classList.add("site-entered");
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      if (targetHash.startsWith("#")) {
        history.pushState(null, "", destinationHash);
      }
    }, 1030);

    window.setTimeout(() => {
      document.body.classList.remove("is-transitioning", "button-pressed", "hero-zooming", "hero-fading", "mist-expanding");
      transitionInProgress = false;
      birdsPaused = false;
    }, 1140);
  }

  function lockLandingWheel(event) {
    if (landingUnlocked || transitionInProgress || window.scrollY > 4) return;
    event.preventDefault();
  }

  function lockLandingKeys(event) {
    const scrollKeys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
    if (!scrollKeys.includes(event.key) || landingUnlocked || transitionInProgress || window.scrollY > 4) return;
    event.preventDefault();
  }

  function restoreLandingLock(hero) {
    if (!landingUnlocked || transitionInProgress || !hero) return;

    if (window.scrollY <= 2) {
      landingUnlocked = false;
      document.body.classList.add("landing-locked");
      document.body.classList.remove("site-entered", "is-transitioning", "button-pressed", "hero-zooming", "hero-fading", "mist-expanding");
      if (location.hash) {
        history.replaceState(null, "", location.pathname);
      }
    }
  }
}

function initSeasonNotes() {
  const seasonalLinks = [...document.querySelectorAll("[data-season]")];
  if (!seasonalLinks.length) return;

  const seasons = {
    signal: {
      label: "Spring · Signal",
      subtitle: "Research",
      description: "The season of beginnings. Where curiosity grows into questions, and questions turn into discoveries.",
    },
    commons: {
      label: "Summer · Commons",
      subtitle: "Leadership",
      description: "The season of connection. Where people come together, ideas grow, and communities take shape.",
    },
    studio: {
      label: "Autumn · Studio",
      subtitle: "Art",
      description: "The season of expression. Where observations become stories, and ideas find their own forms.",
    },
    momentum: {
      label: "Winter · Momentum",
      subtitle: "Sports",
      description: "The season of resilience. Where challenges are embraced, and strength is built through persistence.",
    },
  };

  const note = document.createElement("aside");
  note.className = "season-note";
  note.setAttribute("aria-hidden", "true");
  note.innerHTML = '<p class="season-note-label"></p><p class="season-note-subtitle"></p><p class="season-note-description"></p>';
  document.body.append(note);

  const label = note.querySelector(".season-note-label");
  const subtitle = note.querySelector(".season-note-subtitle");
  const description = note.querySelector(".season-note-description");
  let activeLink = null;
  let hideTimer;

  function showNote(link) {
    const seasonName = link.dataset.season;
    const season = seasons[seasonName];
    if (!season) return;

    window.clearTimeout(hideTimer);
    activeLink = link;
    note.dataset.season = seasonName;
    label.textContent = season.label;
    subtitle.textContent = season.subtitle;
    description.textContent = season.description;
    positionNote(link);
    note.classList.add("is-visible");
  }

  function scheduleHide(link) {
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
      if (activeLink !== link) return;
      activeLink = null;
      note.classList.remove("is-visible");
    }, 90);
  }

  function positionNote(link) {
    const rect = link.getBoundingClientRect();
    const halfWidth = Math.min(148, (window.innerWidth - 32) / 2);
    const center = Math.max(halfWidth + 16, Math.min(window.innerWidth - halfWidth - 16, rect.left + rect.width / 2));
    note.style.setProperty("--season-note-left", `${center}px`);
    note.style.setProperty("--season-note-top", `${rect.bottom + 12}px`);
  }

  seasonalLinks.forEach((link) => {
    link.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "touch") return;
      showNote(link);
    });
    link.addEventListener("pointerleave", () => scheduleHide(link));
    link.addEventListener("focus", () => showNote(link));
    link.addEventListener("blur", () => scheduleHide(link));
  });

  window.addEventListener("resize", () => {
    if (activeLink) positionNote(activeLink);
  }, { passive: true });
}

function startBirdLife(birds) {
  const birdStates = birds.map((bird, index) => createBirdState(bird, index));
  let flockUntil = 0;
  let flockAnchor = null;
  let rafId;

  birdStates.forEach((state) => {
    state.path = makeLocalPath(state, state.position);
    state.startedAt = performance.now() - randomBetween(0, state.duration * 0.72);
    setBirdPose(state, state.position, state.rotation, 0);
  });

  rafId = requestAnimationFrame(tick);
  window.addEventListener("pagehide", () => cancelAnimationFrame(rafId), { once: true });

  function tick(now) {
    if (birdsPaused) {
      rafId = requestAnimationFrame(tick);
      return;
    }

    if (now > flockUntil && Math.random() < 0.0025) {
      flockUntil = now + randomBetween(8500, 13500);
      flockAnchor = makeFlockAnchor(randomBirdPosition("middle"));
    }

    birdStates.forEach((state) => {
      const elapsed = now - state.startedAt;
      let t = clamp(elapsed / state.duration, 0, 1);

      if (t >= 1) {
        state.position = state.path.end;
        state.previousVelocity = state.path.endVelocity;
        const shouldJoinFlock = flockAnchor && now < flockUntil && Math.random() > 0.3;
        const shouldLongFly = !shouldJoinFlock && Math.random() < state.longFlightChance;
        state.path = shouldJoinFlock ? makeFlockPath(flockAnchor, state) : makeLocalPath(state, state.position, shouldLongFly);
        state.startedAt = now;
        state.duration = state.path.isLongFlight ? randomBetween(state.longSpeedMin, state.longSpeedMax) : randomBetween(state.speedMin, state.speedMax);
        state.phase = randomBetween(0, Math.PI * 2);
        state.glideBias = randomBetween(0.58, 0.76);
        t = 0;
      }

      const easedT = easeInOutSine(t);
      const point = cubicBezier(state.path.start, state.path.c1, state.path.c2, state.path.end, easedT);
      const ahead = cubicBezier(state.path.start, state.path.c1, state.path.c2, state.path.end, clamp(easedT + 0.012, 0, 1));
      const drift = Math.sin(now * state.windSpeed + state.phase) * state.wind;
      const tangentAngle = Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180 / Math.PI;
      const bodyRoll = Math.sin(now * 0.0015 + state.phase) * state.roll;
      const currentPoint = {
        x: clamp(point.x, state.bounds.minX, state.bounds.maxX),
        y: clamp(point.y + drift, state.bounds.minY, state.bounds.maxY),
      };

      state.position = currentPoint;
      state.rotation = state.rotation * 0.86 + (tangentAngle * 0.08 + bodyRoll) * 0.14;
      state.bird.style.zIndex = String(depthLayer(state, currentPoint, now));
      setBirdPose(state, currentPoint, state.rotation, wingAngle(state, now, t));
    });

    rafId = requestAnimationFrame(tick);
  }
}

function createBirdState(bird, index) {
  const depth = index === 0 ? "near" : index === 1 ? "middle" : "far";
  const configs = {
    near: {
      start: { x: 62, y: 27 },
      homeBounds: { minX: 22, maxX: 68, minY: 11, maxY: 43 },
      bounds: { minX: 14, maxX: 82, minY: 9, maxY: 48 },
      wind: 1.25,
      roll: 2.8,
      speedMin: 8200,
      speedMax: 12800,
      longSpeedMin: 12500,
      longSpeedMax: 17800,
      beat: 0.0062,
      turn: 22,
      longFlightChance: 0.13,
      layerBase: 8,
    },
    middle: {
      start: { x: 46, y: 20 },
      homeBounds: { minX: 18, maxX: 62, minY: 8, maxY: 34 },
      bounds: { minX: 12, maxX: 86, minY: 7, maxY: 38 },
      wind: 1,
      roll: 2.1,
      speedMin: 9200,
      speedMax: 14500,
      longSpeedMin: 13500,
      longSpeedMax: 19500,
      beat: 0.0071,
      turn: 24,
      longFlightChance: 0.1,
      layerBase: 6,
    },
    far: {
      start: { x: 34, y: 16 },
      homeBounds: { minX: 16, maxX: 58, minY: 7, maxY: 28 },
      bounds: { minX: 10, maxX: 88, minY: 6, maxY: 31 },
      wind: 0.7,
      roll: 1.5,
      speedMin: 10800,
      speedMax: 16800,
      longSpeedMin: 14500,
      longSpeedMax: 21000,
      beat: 0.008,
      turn: 23,
      longFlightChance: 0.08,
      layerBase: 4,
    },
  };
  const config = configs[depth];

  return {
    bird,
    body: bird.querySelector(".bird-shape"),
    leftWing: bird.querySelector(".bird-wing-left"),
    rightWing: bird.querySelector(".bird-wing-right"),
    depth,
    position: { ...config.start },
    previousVelocity: { x: randomBetween(-8, 8), y: randomBetween(-3, 3) },
    rotation: 0,
    bounds: config.bounds,
    homeBounds: config.homeBounds,
    turn: config.turn,
    path: { start: config.start, c1: config.start, c2: config.start, end: config.start, endVelocity: { x: 1, y: 0 } },
    startedAt: 0,
    duration: 12000,
    phase: randomBetween(0, Math.PI * 2),
    wind: config.wind,
    windSpeed: randomBetween(0.00045, 0.0008),
    roll: config.roll,
    beat: config.beat,
    speedMin: config.speedMin,
    speedMax: config.speedMax,
    longSpeedMin: config.longSpeedMin,
    longSpeedMax: config.longSpeedMax,
    longFlightChance: config.longFlightChance,
    layerBase: config.layerBase,
    glideBias: 0.66,
  };
}

function makeLocalPath(state, start, longFlight = false) {
  const target = longFlight ? rightSideTarget(state, start) : nearbyTarget(start, state.homeBounds, state.turn);
  const path = makeContinuousPath(start, target, state.previousVelocity, state.bounds, longFlight);
  path.isLongFlight = longFlight;
  return path;
}

function makeFlockAnchor(start) {
  const bounds = { minX: 18, maxX: 76, minY: 8, maxY: 34 };
  const target = nearbyTarget(start, bounds, 20);
  return makeContinuousPath(start, target, { x: randomBetween(-9, 9), y: randomBetween(-3, 3) }, bounds);
}

function makeFlockPath(anchor, state) {
  const offsetX = state.depth === "near" ? randomBetween(-5, 1) : state.depth === "middle" ? randomBetween(-1, 4) : randomBetween(4, 9);
  const offsetY = state.depth === "near" ? randomBetween(2, 6) : state.depth === "middle" ? randomBetween(-2, 3) : randomBetween(-6, -2);
  const start = state.position;
  const end = clampPoint(addPoint(anchor.end, offsetX, offsetY), state.bounds);
  return makeContinuousPath(start, end, state.previousVelocity, state.bounds);
}

function makeContinuousPath(start, end, previousVelocity, bounds, longFlight = false) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.max(10, Math.hypot(dx, dy));
  const previous = normalize(previousVelocity);
  const exit = normalize({ x: dx + randomBetween(-8, 8), y: dy + randomBetween(-5, 5) });
  const bend = randomBetween(longFlight ? -0.3 : -0.24, longFlight ? 0.3 : 0.24) * distance;
  const normal = { x: -exit.y, y: exit.x };
  const c1 = {
    x: start.x + previous.x * distance * (longFlight ? 0.26 : 0.34) + normal.x * bend,
    y: start.y + previous.y * distance * (longFlight ? 0.26 : 0.34) + normal.y * bend,
  };
  const c2 = {
    x: end.x - exit.x * distance * (longFlight ? 0.42 : 0.38) - normal.x * bend * 0.55,
    y: end.y - exit.y * distance * (longFlight ? 0.42 : 0.38) - normal.y * bend * 0.55,
  };

  return {
    start,
    c1: clampPoint(c1, bounds),
    c2: clampPoint(c2, bounds),
    end,
    endVelocity: { x: end.x - c2.x, y: end.y - c2.y },
  };
}

function nearbyTarget(start, bounds, radius) {
  let target = start;
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const angle = randomBetween(0, Math.PI * 2);
    const distance = randomBetween(radius * 0.55, radius);
    target = {
      x: start.x + Math.cos(angle) * distance,
      y: start.y + Math.sin(angle) * distance * 0.48,
    };
    if (target.x > bounds.minX && target.x < bounds.maxX && target.y > bounds.minY && target.y < bounds.maxY) {
      return target;
    }
  }
  return {
    x: randomBetween(bounds.minX + 4, bounds.maxX - 4),
    y: randomBetween(bounds.minY + 3, bounds.maxY - 3),
  };
}

function rightSideTarget(state, start) {
  const targetX = start.x < 58 ? randomBetween(70, state.bounds.maxX) : randomBetween(state.homeBounds.minX + 8, state.homeBounds.maxX);
  const targetY = randomBetween(state.bounds.minY + 2, state.depth === "near" ? Math.min(state.bounds.maxY - 4, 38) : state.bounds.maxY - 2);
  return clampPoint({ x: targetX, y: targetY }, state.bounds);
}

function depthLayer(state, point, now) {
  const verticalLift = point.y > 28 ? 1 : 0;
  const crossing = Math.sin(now * 0.00055 + state.phase) > 0.76 ? 1 : 0;
  const nearBoost = state.depth === "near" ? 2 : state.depth === "middle" ? 1 : 0;
  return state.layerBase + nearBoost + verticalLift + crossing;
}

function setBirdPose(state, point, rotation, wing) {
  state.bird.style.transform = `translate3d(${point.x}vw, ${point.y}vh, 0) rotate(${rotation}deg)`;
  state.leftWing.style.transform = `rotate(${-wing}deg)`;
  state.rightWing.style.transform = `rotate(${wing}deg)`;
}

function wingAngle(state, now, t) {
  const flap = Math.sin(now * state.beat + state.phase);
  const flutter = Math.sin(now * state.beat * 2.17 + state.phase * 0.7) * 0.22;
  const glideWindow = Math.sin(t * Math.PI * 4.7 + state.phase);
  const glide = glideWindow > state.glideBias ? 0.28 : 1;
  return (9 + (flap + flutter) * 12) * glide;
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function easeInOutSine(value) {
  return -(Math.cos(Math.PI * value) - 1) / 2;
}

function cubicBezier(start, c1, c2, end, t) {
  const mt = 1 - t;
  return {
    x: mt ** 3 * start.x + 3 * mt ** 2 * t * c1.x + 3 * mt * t ** 2 * c2.x + t ** 3 * end.x,
    y: mt ** 3 * start.y + 3 * mt ** 2 * t * c1.y + 3 * mt * t ** 2 * c2.y + t ** 3 * end.y,
  };
}

function addPoint(point, x, y) {
  return { x: point.x + x, y: point.y + y };
}

function clampPoint(point, bounds) {
  return {
    x: clamp(point.x, bounds.minX, bounds.maxX),
    y: clamp(point.y, bounds.minY, bounds.maxY),
  };
}

function normalize(vector) {
  const length = Math.hypot(vector.x, vector.y) || 1;
  return { x: vector.x / length, y: vector.y / length };
}

function randomBirdPosition(depth) {
  const ranges = {
    near: { minX: 22, maxX: 68, minY: 11, maxY: 43 },
    middle: { minX: 18, maxX: 62, minY: 8, maxY: 34 },
    far: { minX: 16, maxX: 58, minY: 7, maxY: 28 },
  };
  const bounds = ranges[depth] || ranges.middle;
  return {
    x: randomBetween(bounds.minX + 5, bounds.maxX - 5),
    y: randomBetween(bounds.minY + 4, bounds.maxY - 4),
  };
}

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", initPlanet);
} else {
  initPlanet();
}
