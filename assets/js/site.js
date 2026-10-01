/* Vulkano Tribbu — movimiento.
   Fuego silencioso: todo entra con energía y termina en calma. */
(function () {
  "use strict";

  window.__vtReady = true;
  var doc = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;

  function storage(kind) {
    try { var s = window[kind]; s.setItem("__vt", "1"); s.removeItem("__vt"); return s; } catch (e) { return null; }
  }
  var session = storage("sessionStorage");

  /* ---------- Divisiones de texto ---------- */
  function splitChars(el) {
    var index = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
            var word = document.createElement("span");
            word.className = "word";
            Array.prototype.forEach.call(part, function (c) {
              var ch = document.createElement("span");
              ch.className = "ch";
              ch.textContent = c;
              ch.style.setProperty("--i", index++);
              word.appendChild(ch);
            });
            frag.appendChild(word);
          });
          child.parentNode.replaceChild(frag, child);
        } else if (child.nodeType === 1 && child.tagName !== "BR") {
          walk(child);
        }
      });
    })(el);
    el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
  }

  function splitWords(el) {
    var words = [];
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            var w = document.createElement("span");
            w.className = "w";
            w.textContent = part;
            words.push(w);
            frag.appendChild(w);
          });
          child.parentNode.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          walk(child);
        }
      });
    })(el);
    return words;
  }

  if (!reduceMotion) {
    document.querySelectorAll(".ignite").forEach(splitChars);
  }

  /* ---------- Texto que se ilumina con el scroll ---------- */
  var litBlocks = [];
  document.querySelectorAll(".lit-text").forEach(function (el) {
    litBlocks.push({ el: el, words: splitWords(el) });
  });
  function updateLit() {
    var vh = window.innerHeight;
    litBlocks.forEach(function (b) {
      var r = b.el.getBoundingClientRect();
      var start = vh * 0.85, end = vh * 0.35;
      var p = (start - r.top) / (start - end + r.height * 0.6);
      p = Math.max(0, Math.min(1, p));
      if (reduceMotion) p = 1;
      var n = b.words.length, lit = Math.round(p * n);
      for (var i = 0; i < n; i++) {
        b.words[i].classList.toggle("on", i < lit);
        b.words[i].classList.toggle("hot", i >= lit - 2 && i < lit && p < 1);
      }
    });
  }

  /* ---------- Progreso del método ---------- */
  var steps = Array.prototype.slice.call(document.querySelectorAll(".method .step"));
  function updateSteps() {
    if (!steps.length) return;
    var vh = window.innerHeight;
    steps.forEach(function (s, i) {
      var r = s.getBoundingClientRect();
      var p = (vh * 0.8 - r.top) / (vh * 0.35) - i * 0.15;
      if (reduceMotion) p = 1;
      s.style.setProperty("--p", Math.max(0, Math.min(1, p)) * 100 + "%");
    });
  }

  /* ---------- Cabecera ---------- */
  var header = document.querySelector(".site-header");
  var lightSections = Array.prototype.slice.call(document.querySelectorAll(".s-light"));
  var lastY = window.scrollY;
  function updateHeader() {
    if (!header) return;
    var y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);
    var menuOpen = doc.classList.contains("menu-open");
    header.classList.toggle("is-hidden", !menuOpen && y > 400 && y > lastY + 2);
    if (y < lastY - 2 || y < 400) header.classList.remove("is-hidden");
    lastY = y;
    var probe = 38;
    var onLight = !menuOpen && lightSections.some(function (s) {
      var r = s.getBoundingClientRect();
      return r.top <= probe && r.bottom >= probe;
    });
    header.classList.toggle("on-light", onLight);
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      updateHeader(); updateLit(); updateSteps();
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- Menú móvil ---------- */
  var toggle = document.querySelector(".menu-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = doc.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
      updateHeader();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && doc.classList.contains("menu-open")) toggle.click();
    });
  }

  /* ---------- Revelados ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Contador de temperatura ---------- */
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var fmt = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."); };
    if (reduceMotion) { el.textContent = fmt(target); return; }
    var t0 = null, dur = 2600;
    function frame(t) {
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / dur);
      var e = 1 - Math.pow(1 - k, 4);
      el.textContent = fmt(Math.round(target * e));
      if (k < 1) requestAnimationFrame(frame);
    }
    setTimeout(function () { requestAnimationFrame(frame); }, 600);
  });

  /* ---------- Brasas (canvas) ---------- */
  document.querySelectorAll("canvas.embers").forEach(function (canvas) {
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, parts = [], running = true, visible = true;
    var pointer = { x: -9999, y: -9999 };
    var density = parseFloat(canvas.getAttribute("data-density") || "1");

    function resize() {
      var r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var target = Math.round(Math.min(110, (w * h) / 14000) * density);
      while (parts.length < target) parts.push(spawn(true));
      parts.length = target;
    }
    function spawn(anywhere) {
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : h + 10,
        r: Math.random() * 1.6 + 0.4,
        vy: -(Math.random() * 0.35 + 0.12),
        vx: (Math.random() - 0.5) * 0.12,
        life: 0,
        max: Math.random() * 600 + 400,
        phase: Math.random() * Math.PI * 2,
        heat: Math.random()
      };
    }
    function draw() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.life++;
        p.phase += 0.02;
        p.x += p.vx + Math.sin(p.phase) * 0.18;
        p.y += p.vy;
        var dx = p.x - pointer.x, dy = p.y - pointer.y, d2 = dx * dx + dy * dy;
        if (d2 < 22000) { var f = (22000 - d2) / 22000; p.x += dx * 0.012 * f; p.y += dy * 0.012 * f; }
        var k = p.life / p.max;
        if (k >= 1 || p.y < -20) { parts[i] = spawn(false); continue; }
        var flicker = 0.65 + Math.sin(p.phase * 3) * 0.35;
        var a = Math.sin(Math.PI * k) * flicker * (1 - (h - p.y) / h * 0.35);
        var hue = 18 + p.heat * 18;
        var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        g.addColorStop(0, "hsla(" + (hue + 12) + ",100%,78%," + a + ")");
        g.addColorStop(0.25, "hsla(" + hue + ",95%,55%," + a * 0.55 + ")");
        g.addColorStop(1, "hsla(" + hue + ",90%,40%,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(draw);
    }
    resize();
    window.addEventListener("resize", resize);
    if (finePointer) {
      window.addEventListener("pointermove", function (e) {
        var r = canvas.getBoundingClientRect();
        pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top;
      }, { passive: true });
    }
    if (reduceMotion) {
      for (var s = 0; s < 120; s++) { parts.forEach(function (p) { p.life++; p.y += p.vy; }); }
      requestAnimationFrame(function () { draw(); running = false; });
      return;
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) {
        visible = en[0].isIntersecting;
        if (visible && !running && !document.hidden) { running = true; requestAnimationFrame(draw); }
        else if (!visible) running = false;
      }).observe(canvas);
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) running = false;
      else if (visible && !running) { running = true; requestAnimationFrame(draw); }
    });
    requestAnimationFrame(draw);
  });

  /* ---------- Resplandor que sigue al cursor ---------- */
  if (finePointer && !reduceMotion) {
    var glow = document.createElement("div");
    glow.className = "cursor-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.appendChild(glow);
    var gx = window.innerWidth / 2, gy = window.innerHeight / 2, tx = gx, ty = gy;
    window.addEventListener("pointermove", function (e) {
      tx = e.clientX; ty = e.clientY; glow.classList.add("is-on");
      var el = document.elementFromPoint(e.clientX, e.clientY);
      document.body.classList.toggle("on-light-cursor", !!(el && el.closest(".s-light")));
    }, { passive: true });
    document.addEventListener("pointerleave", function () { glow.classList.remove("is-on"); });
    (function loop() {
      gx += (tx - gx) * 0.08; gy += (ty - gy) * 0.08;
      glow.style.transform = "translate3d(" + gx + "px," + gy + "px,0)";
      requestAnimationFrame(loop);
    })();

    /* Botones magnéticos */
    document.querySelectorAll(".btn").forEach(function (b) {
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        var mx = (e.clientX - r.left - r.width / 2) * 0.18, my = (e.clientY - r.top - r.height / 2) * 0.3;
        b.style.transform = "translate(" + mx + "px," + my + "px)";
      });
      b.addEventListener("pointerleave", function () { b.style.transform = ""; });
    });
  }

  /* ---------- Transición entre páginas ---------- */
  var curtain = document.createElement("div");
  curtain.className = "curtain";
  curtain.setAttribute("aria-hidden", "true");
  document.body.appendChild(curtain);
  if (doc.classList.contains("is-arriving")) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { doc.classList.remove("is-arriving"); doc.classList.add("is-arrived"); });
    });
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || reduceMotion) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#" || a.target === "_blank" || a.hasAttribute("download")) return;
    if (/^(mailto:|tel:|https?:)/i.test(href)) return;
    e.preventDefault();
    if (session) session.setItem("vt-nav", "1");
    doc.classList.remove("is-arrived");
    doc.classList.add("is-leaving");
    setTimeout(function () { window.location.href = a.href; }, 560);
  });
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) { doc.classList.remove("is-leaving"); }
  });

  /* ---------- Precarga (solo la primera visita a la portada) ---------- */
  var pre = document.querySelector(".preloader");
  if (pre) {
    var seen = session && session.getItem("vt-intro") === "1";
    if (seen || reduceMotion) {
      pre.remove();
    } else {
      if (session) session.setItem("vt-intro", "1");
      document.querySelectorAll(".hero .ignite, .hero .settle").forEach(function (el) {
        el.style.setProperty("--d", (parseFloat(getComputedStyle(el).getPropertyValue("--d")) || 0) + 1.7 + "s");
      });
      setTimeout(function () { pre.classList.add("is-done"); }, 1700);
      setTimeout(function () { pre.remove(); }, 2900);
    }
  }

  /* ---------- Formulario de contacto ---------- */
  var form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var to = form.getAttribute("data-to");
      var needs = data.getAll("necesidad").join(", ") || "Sin especificar";
      var body = [
        "Nombre: " + (data.get("nombre") || ""),
        "Empresa: " + (data.get("empresa") || ""),
        "Email: " + (data.get("email") || ""),
        "Qué necesitamos: " + needs,
        "Presupuesto orientativo: " + (data.get("presupuesto") || ""),
        "",
        String(data.get("mensaje") || "")
      ].join("\n");
      var subject = "Hola, Vulkano Tribbu — " + (data.get("empresa") || data.get("nombre") || "nuevo proyecto");
      var status = document.querySelector("#form-status");
      if (status) status.hidden = false;
      window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var done = function () { var t = btn.textContent; btn.textContent = "Copiado"; setTimeout(function () { btn.textContent = t; }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { selectText(btn.previousElementSibling); });
      } else { selectText(btn.previousElementSibling); }
    });
  });
  function selectText(el) {
    if (!el) return;
    var range = document.createRange(); range.selectNodeContents(el);
    var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
  }

  /* ---------- Año ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
