// Surya Flow website. Content mirrors the app's SuryaNamaskar.swift and Theme.swift.
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const poses = [
    { n: 1, name: "Pranamasana", common: "Prayer Pose", breath: "Chant", img: "prayer" },
    { n: 2, name: "Hasta Uttanasana", common: "Raised Arms", breath: "Inhale", img: "raised" },
    { n: 3, name: "Padahastasana", common: "Forward Bend", breath: "Exhale", img: "fold" },
    { n: 4, name: "Ashwa Sanchalanasana", common: "Lunge · Right Leg", breath: "Inhale", img: "lunge-a" },
    { n: 5, name: "Dandasana", common: "Plank", breath: "Exhale", img: "plank" },
    { n: 6, name: "Ashtanga Namaskara", common: "Eight Limbed Salute", breath: "Hold", img: "eight" },
    { n: 7, name: "Bhujangasana", common: "Cobra Pose", breath: "Inhale", img: "cobra" },
    { n: 8, name: "Adho Mukha Svanasana", common: "Downward Facing Dog", breath: "Exhale", img: "dog" },
    { n: 9, name: "Ashwa Sanchalanasana", common: "Lunge · Left Leg", breath: "Inhale", img: "lunge-b" },
    { n: 10, name: "Padahastasana", common: "Forward Bend", breath: "Exhale", img: "fold" },
    { n: 11, name: "Pranamasana", common: "Prayer Pose", breath: "Chant", img: "prayer" },
  ];

  const mantras = [
    ["Aum Mitrāya Namaḥ", "ॐ मित्राय नमः", "Salutations to the friend of all", "सबके मित्र को नमस्कार"],
    ["Aum Ravaye Namaḥ", "ॐ रवये नमः", "Salutations to the shining one", "प्रकाशमान को नमस्कार"],
    ["Aum Sūryāya Namaḥ", "ॐ सूर्याय नमः", "Salutations to the one who inspires all", "सबको प्रेरित करने वाले को नमस्कार"],
    ["Aum Bhānave Namaḥ", "ॐ भानवे नमः", "Salutations to the one who illumines", "प्रकाश देने वाले को नमस्कार"],
    ["Aum Khagāya Namaḥ", "ॐ खगाय नमः", "Salutations to the traveller of the sky", "आकाश में विचरने वाले को नमस्कार"],
    ["Aum Pūṣṇe Namaḥ", "ॐ पूष्णे नमः", "Salutations to the giver of strength", "बल देने वाले को नमस्कार"],
    ["Aum Hiraṇyagarbhāya Namaḥ", "ॐ हिरण्यगर्भाय नमः", "Salutations to the golden cosmic self", "स्वर्णिम विश्व-आत्मा को नमस्कार"],
    ["Aum Marīcaye Namaḥ", "ॐ मरीचये नमः", "Salutations to the rays of dawn", "उषा की किरणों को नमस्कार"],
    ["Aum Ādityāya Namaḥ", "ॐ आदित्याय नमः", "Salutations to the son of Aditi", "अदिति के पुत्र को नमस्कार"],
    ["Aum Savitre Namaḥ", "ॐ सवित्रे नमः", "Salutations to the awakener of life", "जीवन जगाने वाले को नमस्कार"],
    ["Aum Arkāya Namaḥ", "ॐ अर्काय नमः", "Salutations to the one worthy of praise", "स्तुति के योग्य को नमस्कार"],
    ["Aum Bhāskarāya Namaḥ", "ॐ भास्कराय नमः", "Salutations to the giver of wisdom", "ज्ञान देने वाले को नमस्कार"],
    ["Aum Bhāskarebhyo Namo Namaḥ", "ॐ भास्करेभ्यो नमो नमः", "Salutations to the light in all forms", "सभी रूपों के प्रकाश को नमस्कार"],
    ["Aum Mātṛpitṛbhyāṁ Namo Namaḥ", "ॐ मातृपितृभ्यां नमो नमः", "Salutations to mother and father", "माता-पिता को नमस्कार"],
  ];

  const accents = [
    { name: "Saffron", c: "#F08A3C", t: "#C2561A", td: "#F6A15F" },
    { name: "Rose", c: "#E26A86", t: "#B8405F", td: "#F5A1B4" },
    { name: "Lotus", c: "#9370D8", t: "#6E4BB8", td: "#C6B0F6" },
    { name: "Teal", c: "#2E9E91", t: "#1F786D", td: "#72D3C6" },
    { name: "Sky", c: "#4F8BDB", t: "#2F67B5", td: "#93BBF4" },
  ];

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const src = (img, fig) => `assets/poses/${img}-${fig}.webp`;
  let figure = "male";

  // Pages without an anchor always open at the top.
  if (!location.hash) {
    try { history.scrollRestoration = "manual"; } catch (e) {}
    const toTop = () => { if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" }); };
    toTop();
    addEventListener("DOMContentLoaded", toTop);
    addEventListener("load", () => { toTop(); setTimeout(toTop, 60); });
    addEventListener("pageshow", toTop);
  }

  // Nav background once scrolled.
  const nav = $("#nav");
  const onScroll = () => nav && nav.classList.toggle("scrolled", scrollY > 20);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll.
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  const watch = () => $$(".reveal:not(.in)").forEach((el) => io.observe(el));

  // Step cards rise in as they enter and collapse as they leave, in either direction.
  const stepIO = { observe() {} };

  // Steps carousel.
  const steps = $("#steps");
  const renderSteps = () => {
    if (!steps) return;
    steps.innerHTML = poses.map((p, i) => `
      <article class="step" style="--d:${Math.min(i, 5) * 0.04}s">
        <div class="step-top"><span>Step ${p.n}</span><span class="breath-tag ${p.breath.toLowerCase()}">${p.breath}</span></div>
        <div class="step-img"><img loading="lazy" src="${src(p.img, figure)}" alt="${p.common}"></div>
        <h3>${p.name}</h3><p>${p.common}</p>
      </article>`).join("");
    $$(".step", steps).forEach((el) => stepIO.observe(el));
    updateEdges();
  };

  // Cards shrink away at the left and right edges as they scroll past, mirroring how they rise in.
  let edgeRAF = 0;
  function updateEdges() {
    edgeRAF = 0;
    if (!steps) return;
    const w = innerWidth;
    $$(".step", steps).forEach((el) => {
      const r = el.getBoundingClientRect();
      const vis = Math.min(r.right, w) - Math.max(r.left, 0);
      const f = Math.max(0, Math.min(1, vis / r.width));
      el.style.setProperty("--h", (f * f * (3 - 2 * f)).toFixed(3));
      el.classList.toggle("in", f > 0.25);
    });
  }
  const queueEdges = () => { if (!edgeRAF) edgeRAF = requestAnimationFrame(updateEdges); };
  if (steps) { steps.addEventListener("scroll", queueEdges, { passive: true }); addEventListener("resize", queueEdges); }

  // A thin progress track under the cards, and a one-time nudge on phones, so it's clear the row scrolls.
  if (steps) {
    const track = document.createElement("div");
    track.className = "steps-track"; track.setAttribute("aria-hidden", "true");
    track.innerHTML = "<i></i>";
    steps.after(track);
    const thumb = track.firstChild;
    const syncTrack = () => {
      const max = steps.scrollWidth - steps.clientWidth;
      const vis = steps.clientWidth / steps.scrollWidth;
      thumb.style.width = (vis * 100).toFixed(1) + "%";
      thumb.style.transform = `translateX(${max > 0 ? (steps.scrollLeft / max) * ((1 - vis) / vis) * 100 : 0}%)`;
    };
    steps.addEventListener("scroll", () => requestAnimationFrame(syncTrack), { passive: true });
    addEventListener("resize", syncTrack);
    setTimeout(syncTrack, 50);
    if (!reduce && matchMedia("(max-width: 600px)").matches) {
      const nudgeIO = new IntersectionObserver((es) => {
        if (!es[0].isIntersecting) return;
        nudgeIO.disconnect();
        setTimeout(() => {
          if (steps.scrollLeft > 4) return;
          steps.classList.add("nudge");
          setTimeout(() => steps.classList.remove("nudge"), 1300);
        }, 500);
      }, { threshold: 0.6 });
      nudgeIO.observe(steps);
    }
  }

  // Hero figure: plays through a cycle. Each pose is scaled so the figure reads the same size as the forward bend.
  const stage = $("#pStage");
  const poseScale = { prayer: 1.27, raised: 1.27, fold: 1, "lunge-a": 1.2, plank: 1.11, eight: 1.3, cobra: 1.3, dog: 1.3, "lunge-b": 1.15 };
  let idx = 1, timer;
  const renderStage = () => {
    if (!stage) return;
    const unique = [...new Set(poses.map((p) => p.img))];
    stage.innerHTML = unique.map((img) => `<img data-img="${img}" style="--k:${poseScale[img] || 1}" src="${src(img, "male")}" alt="">`).join("");
    show(idx);
  };
  const show = (i) => {
    const p = poses[i];
    $$("img", stage).forEach((el) => el.classList.toggle("on", el.dataset.img === p.img));
  };
  const play = () => {
    clearInterval(timer);
    if (reduce || !stage) return;
    timer = setInterval(() => { idx = (idx + 1) % 10; show(idx); }, 2400);
  };

  // Figure toggle.
  $$("[data-figure]").forEach((b) => b.addEventListener("click", () => {
    figure = b.dataset.figure;
    $$("[data-figure]").forEach((x) => x.setAttribute("aria-pressed", x === b));
    renderSteps(); renderStage();
  }));

  // Mantras.
  const grid = $("#mantraGrid");
  const renderMantras = (script) => {
    if (!grid) return;
    grid.innerHTML = mantras.map((m, i) => `
      <div class="mantra reveal" style="--d:${(i % 4) * 0.05}s">
        <div class="n">CYCLE ${i + 1}</div>
        <div class="m" lang="${script === "hi" ? "hi" : "sa-Latn"}">${script === "hi" ? m[1] : m[0]}</div>
        <div class="mean">${script === "hi" ? m[3] : m[2]}</div>
      </div>`).join("");
    watch();
  };
  $$("[data-script]").forEach((b) => b.addEventListener("click", () => {
    $$("[data-script]").forEach((x) => x.setAttribute("aria-pressed", x === b));
    renderMantras(b.dataset.script);
    $$(".mantra", grid).forEach((el) => el.classList.add("in"));
  }));

  // Language demo.
  const words = { en: ["Learn", "Progress", "Surya", "Settings"], hi: ["सीखें", "प्रगति", "सूर्य", "सेटिंग्स"] };
  $$("[data-lang]").forEach((b) => b.addEventListener("click", () => {
    $$("[data-lang]").forEach((x) => x.setAttribute("aria-pressed", x === b));
    $$("#langDemo span").forEach((s, i) => (s.textContent = words[b.dataset.lang][i]));
  }));

  // Accent swatches recolour the page.
  const sw = $("#swatches");
  if (sw) {
    sw.innerHTML = accents.map((a, i) => `<button type="button" class="swatch" style="--c:${a.c}" aria-label="${a.name}" aria-pressed="${i === 0}"></button>`).join("");
    const dark = { get matches() { return document.documentElement.dataset.theme === "dark"; } };
    $$(".swatch", sw).forEach((b, i) => b.addEventListener("click", () => {
      const a = accents[i], r = document.documentElement.style;
      r.setProperty("--accent", a.c);
      r.setProperty("--accent-text", dark.matches ? a.td : a.t);
      r.setProperty("--accent-soft", a.c + "24");
      $$(".swatch", sw).forEach((x) => x.setAttribute("aria-pressed", x === b));
      $("#swatchLabel").textContent = a.name;
    }));
  }

  // Words riding the top hero wave. Drawn in real pixels so the letters never stretch,
  // and repeated on both halves so the drift loops seamlessly with the wave.
  const waveWords = $("#waveWords");
  if (waveWords) {
    const phrases = ["Move with awareness  \u2022  ", "Breathe with intention  \u2022  ", "Practise with gratitude  \u2022  "];
    const draw = () => {
      const box = waveWords.parentElement.getBoundingClientRect();
      const W = box.width * 2, H = box.height, sx = W / 2880, sy = H / 300;
      const fs = Math.max(11, Math.min(17, box.width / 84));
      const off = fs * 1.9;
      const P = (x, y) => `${(x * sx).toFixed(1)} ${(y * sy + off).toFixed(1)}`;
      const half = (o) => `M${P(o, 70)} C ${P(o + 360, 0)} ${P(o + 1080, 140)} ${P(o + 1440, 70)}`;
      waveWords.setAttribute("viewBox", `0 0 ${W.toFixed(1)} ${H.toFixed(1)}`);
      waveWords.setAttribute("width", W); waveWords.setAttribute("height", H);
      waveWords.innerHTML = `<defs><path id="ww0" d="${half(0)}"/><path id="ww1" d="${half(1440)}"/></defs>` +
        [0, 1].map((k) => `<text font-size="${fs.toFixed(1)}"><textPath href="#ww${k}">${phrases.join("")}</textPath></text>`).join("");
      // Fill each half with whole phrases, picking the count that best fits the curve, then even out the small remainder.
      const len = $("#ww0", waveWords).getTotalLength();
      const probe = $("text", waveWords);
      const width = (t) => { probe.firstChild.textContent = t; return probe.getComputedTextLength() || 1; };
      let best = phrases[0], bestErr = Infinity, txt = "";
      for (let k = 0; k < 60; k++) {
        txt += phrases[k % phrases.length];
        const w = width(txt), err = Math.abs(len - w);
        if (err < bestErr) { best = txt; bestErr = err; }
        if (w > len * 1.3) break;
      }
      $$("textPath", waveWords).forEach((tp) => { tp.textContent = best; tp.setAttribute("textLength", (len - 2).toFixed(1)); tp.setAttribute("lengthAdjust", "spacing"); });
    };
    draw();
    addEventListener("resize", () => requestAnimationFrame(draw));
    if (document.fonts) document.fonts.ready.then(draw);
  }

  // Waveform bars and calendar.
  const bars = $("#bars");
  if (bars) bars.innerHTML = Array.from({ length: 28 }, (_, i) => `<i style="animation-delay:${(-(i * 137) % 1400) / 1000}s"></i>`).join("");
  const cal = $("#cal");
  if (cal) {
    const done = new Set([2, 3, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
    cal.innerHTML = Array.from({ length: 21 }, (_, i) => {
      const d = i + 1, cls = (done.has(d) ? "d" : "") + (d === 18 ? " t" : "");
      return `<i class="${cls}">${d}</i>`;
    }).join("");
  }

  // Breathing word in the breath tile follows the ring (8 s cycle).
  const bw = $("#breathWord");
  if (bw && !reduce) {
    const seq = [["Inhale", 0], ["Hold", 3600], ["Exhale", 4400], ["Hold", 7600]];
    const loop = () => seq.forEach(([w, t]) => setTimeout(() => (bw.textContent = w), t));
    loop(); setInterval(loop, 8000);
  }

  // Mantra tile cycles through all fourteen.
  const rot = $("#mantraRot");
  if (rot && !reduce) {
    let m = 2;
    setInterval(() => {
      rot.classList.add("out");
      setTimeout(() => {
        m = (m + 1) % mantras.length;
        $(".mr-n", rot).textContent = `Cycle ${m + 1}`;
        $(".mr-hi", rot).textContent = mantras[m][1];
        $(".mr-en", rot).textContent = mantras[m][0];
        $(".mr-mean", rot).textContent = mantras[m][2];
        rot.classList.remove("out");
      }, 350);
    }, 5000);
  }

  // Language tile: the same step in English and Hindi, moving through the cycle.
  const pair = $("#langPair");
  if (pair && !reduce) {
    const hi = [
      ["१", "जाप", "प्रणामासन", "प्रार्थना मुद्रा", "स्थिर खड़े रहें और मंत्र का जाप करें"],
      ["२", "श्वास लें", "हस्त उत्तानासन", "भुजाएँ ऊपर", "इस मुद्रा में आते हुए श्वास लें"],
      ["३", "श्वास छोड़ें", "पादहस्तासन", "आगे झुकना", "इस मुद्रा में आते हुए श्वास छोड़ें"],
      ["४", "श्वास लें", "अश्व संचालनासन", "अश्व मुद्रा · दायाँ पैर", "इस मुद्रा में आते हुए श्वास लें"],
      ["५", "श्वास छोड़ें", "दण्डासन", "दण्ड मुद्रा", "इस मुद्रा में आते हुए श्वास छोड़ें"],
      ["६", "श्वास रोकें", "अष्टांग नमस्कार", "आठ अंगों से नमस्कार", "इस मुद्रा में आते हुए श्वास रोकें"],
      ["७", "श्वास लें", "भुजंगासन", "सर्प मुद्रा", "इस मुद्रा में आते हुए श्वास लें"],
      ["८", "श्वास छोड़ें", "अधोमुख श्वानासन", "अधोमुख श्वान मुद्रा", "इस मुद्रा में आते हुए श्वास छोड़ें"],
    ];
    const guide = { Chant: "Stand still and speak the mantra", Inhale: "Breathe in as you move into this pose", Exhale: "Breathe out as you move into this pose", Hold: "Hold the breath as you move into this pose" };
    let k = 1;
    setInterval(() => {
      pair.classList.add("out");
      setTimeout(() => {
        k = (k + 1) % hi.length;
        const p = poses[k], [en, h] = $$(".lang-card", pair);
        $$("img", pair).forEach((im) => (im.src = src(p.img, "male")));
        en.querySelector(".lc-step").innerHTML = `Step ${p.n} · <b>${p.breath}</b>`;
        en.querySelector(".lc-name").textContent = p.name;
        en.querySelector(".lc-common").textContent = p.common;
        en.querySelector(".lc-guide").textContent = guide[p.breath];
        h.querySelector(".lc-step").innerHTML = `चरण ${hi[k][0]} · <b>${hi[k][1]}</b>`;
        h.querySelector(".lc-name").textContent = hi[k][2];
        h.querySelector(".lc-common").textContent = hi[k][3];
        h.querySelector(".lc-guide").textContent = hi[k][4];
        pair.classList.remove("out");
      }, 350);
    }, 5000);
  }

  const yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();

  renderSteps(); renderStage(); renderMantras("en"); watch(); play();
})();
