/* Vulkano Tribbu — movimiento.
   Titulares que suben desde una máscara, vídeo que crece con el scroll,
   contadores con paralaje, tarjetas apiladas, galería horizontal y cursor propio. */
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
            var ch = document.createElement("span");
            ch.className = "ch";
            ch.textContent = part;
            ch.style.setProperty("--wi", index++);
            word.appendChild(ch);
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
  var darkSections = Array.prototype.slice.call(document.querySelectorAll(".s-ink"));
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
    var onDark = !menuOpen && darkSections.some(function (s) {
      var r = s.getBoundingClientRect();
      return r.top <= probe && r.bottom >= probe;
    });
    header.classList.toggle("on-dark", onDark);
  }

  /* ---------- Efectos ligados al scroll ---------- */
  var clamp01 = function (v) { return Math.max(0, Math.min(1, v)); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };
  var reel = document.querySelector(".reel");
  var heroTitle = document.querySelector(".hero--home .hero-title");
  var counters = $$(".counter");
  var stackItems = $$(".stack-item");
  var galleryWrap = document.querySelector(".gallery-wrap"), gallery = document.querySelector(".gallery");
  var expertise = document.querySelector(".expertise");
  var footer = expertise && document.querySelector(".site-footer");
  if (footer) doc.classList.add("has-reveal");
  function updateEffects() {
    var vh = window.innerHeight, vw = document.documentElement.clientWidth;
    if (reduceMotion) return;
    if (heroTitle) heroTitle.style.setProperty("--hp", clamp01(window.scrollY / vh).toFixed(4));
    if (reel) {
      var rr = reel.getBoundingClientRect();
      reel.style.setProperty("--p", clamp01((vh * 0.5 - rr.top) / (vh * 0.38)).toFixed(3));
    }
    counters.forEach(function (c) {
      var r = c.getBoundingClientRect();
      var rel = (r.top + r.height / 2 - vh / 2) / vh;
      c.style.setProperty("--y", (rel * (c.getAttribute("data-speed") === "1" ? 90 : -30)).toFixed(1) + "px");
    });
    stackItems.forEach(function (item, i) {
      var card = item.firstElementChild, next = stackItems[i + 1];
      if (!next) return;
      var top = parseFloat(getComputedStyle(item).top) || 0;
      var p = clamp01(1 - (next.getBoundingClientRect().top - top) / item.offsetHeight);
      card.style.setProperty("--s", (1 - p * 0.08).toFixed(4));
      card.style.setProperty("--dim", p.toFixed(3));
    });
    if (galleryWrap && gallery) {
      var gr = galleryWrap.getBoundingClientRect();
      var gp = clamp01((vh - gr.top) / (vh + gr.height));
      gallery.style.setProperty("--x", (-(gallery.scrollWidth - vw) * gp).toFixed(1) + "px");
    }
    if (expertise && footer) {
      // El pie fijo se descubre detrás de la tarjeta de especialidades.
      footer.classList.toggle("is-static", footer.offsetHeight > vh);
      var fp = clamp01((vh - expertise.getBoundingClientRect().bottom) / footer.offsetHeight);
      expertise.style.setProperty("--p", fp.toFixed(3));
      footer.style.setProperty("--fp", fp.toFixed(3));
    }
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      updateHeader(); updateLit(); updateSteps(); updateEffects();
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

  /* ---------- Contadores ---------- */
  $$(".counter strong[data-to]").forEach(function (el) {
    var to = +el.getAttribute("data-to"), suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    el.textContent = "0" + suffix;
    new IntersectionObserver(function (en, obs) {
      if (!en[0].isIntersecting) return;
      obs.disconnect();
      var t0 = null;
      (function frame(t) {
        if (!t0) t0 = t;
        var k = Math.min(1, (t - t0) / 1600);
        el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suffix;
        if (k < 1) requestAnimationFrame(frame);
      })(performance.now());
    }, { threshold: 0.4 }).observe(el);
  });

  /* ---------- Vídeo a pantalla completa ---------- */
  var play = document.querySelector(".reel-play");
  if (play) {
    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Vídeo de presentación");
    box.innerHTML = '<video controls loop playsinline muted><source src="assets/video/hero.webm" type="video/webm"><source src="assets/video/hero.mp4" type="video/mp4"></video><button class="lightbox-close" type="button" aria-label="Cerrar">×</button>';
    document.body.appendChild(box);
    var bv = box.querySelector("video"), closeBtn = box.querySelector(".lightbox-close");
    var close = function () { box.classList.remove("is-open"); bv.pause(); play.focus(); };
    play.addEventListener("click", function () { box.classList.add("is-open"); bv.currentTime = 0; var pr = bv.play(); if (pr && pr.catch) pr.catch(function () {}); closeBtn.focus(); });
    closeBtn.addEventListener("click", close);
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && box.classList.contains("is-open")) close(); });
  }

  /* ---------- Ficha de proyecto (panel inferior) ---------- */
  var cards = $$("[data-project]");
  if (cards.length) {
    var sheet = document.createElement("div");
    sheet.className = "sheet";
    sheet.innerHTML = '<div class="sheet-backdrop"></div><div class="sheet-panel" role="dialog" aria-modal="true" aria-labelledby="sheet-title"><div class="sheet-bar"><button class="sheet-close" type="button" aria-label="Cerrar">×</button></div><div class="sheet-body"></div></div>';
    document.body.appendChild(sheet);
    var panel = sheet.querySelector(".sheet-panel"), body = sheet.querySelector(".sheet-body");
    var bar = sheet.querySelector(".sheet-bar"), closeSheetBtn = sheet.querySelector(".sheet-close");
    var opener = null;
    var openSheet = function (card) {
      var tpl = card.parentNode.querySelector(".project-tpl");
      if (!tpl) return false;
      opener = card;
      body.innerHTML = "";
      body.appendChild(tpl.content.cloneNode(true));
      body.scrollTop = 0;
      panel.style.setProperty("--drag", "0px");
      sheet.classList.add("is-open");
      doc.classList.add("sheet-lock");
      var cursorEl = document.querySelector(".cursor");
      if (cursorEl) cursorEl.classList.remove("is-label", "is-link");
      setTimeout(function () { closeSheetBtn.focus({ preventScroll: true }); }, 50);
      if (history.replaceState) history.replaceState(null, "", "#" + card.parentNode.id);
      return true;
    };
    var closeSheet = function () {
      if (!sheet.classList.contains("is-open")) return;
      sheet.classList.remove("is-open");
      doc.classList.remove("sheet-lock");
      panel.style.setProperty("--drag", "0px");
      if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
      if (opener) opener.focus({ preventScroll: true });
    };
    cards.forEach(function (card) {
      card.addEventListener("click", function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        if (openSheet(card)) e.preventDefault();
      });
    });
    closeSheetBtn.addEventListener("click", closeSheet);
    sheet.querySelector(".sheet-backdrop").addEventListener("click", closeSheet);
    document.addEventListener("keydown", function (e) {
      if (!sheet.classList.contains("is-open")) return;
      if (e.key === "Escape") closeSheet();
      if (e.key === "Tab") {
        var f = Array.prototype.slice.call(panel.querySelectorAll("a[href], button"));
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    // Arrastrar hacia abajo para cerrar
    var startY = null;
    bar.addEventListener("pointerdown", function (e) {
      if (e.target === closeSheetBtn) return;
      startY = e.clientY; sheet.classList.add("is-dragging"); bar.setPointerCapture(e.pointerId);
    });
    bar.addEventListener("pointermove", function (e) {
      if (startY === null) return;
      panel.style.setProperty("--drag", Math.max(0, e.clientY - startY) + "px");
    });
    var endDrag = function (e) {
      if (startY === null) return;
      var d = e.clientY - startY; startY = null;
      sheet.classList.remove("is-dragging");
      if (d > 110) closeSheet(); else panel.style.setProperty("--drag", "0px");
    };
    bar.addEventListener("pointerup", endDrag);
    bar.addEventListener("pointercancel", endDrag);
    // marcas.html#slug abre directamente su ficha
    if (location.hash) {
      var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      var tc = target && target.querySelector("[data-project]");
      if (tc) setTimeout(function () { target.scrollIntoView({ block: "center" }); openSheet(tc); }, 400);
    }
  }

  /* ---------- Cursor propio ---------- */
  if (finePointer && !reduceMotion) {
    var cur = document.createElement("div");
    cur.className = "cursor is-hidden";
    cur.setAttribute("aria-hidden", "true");
    cur.innerHTML = "<span></span>";
    document.body.appendChild(cur);
    var label = cur.firstChild;
    var cx = -100, cy = -100, tx = cx, ty = cy;
    window.addEventListener("pointermove", function (e) {
      tx = e.clientX; ty = e.clientY; cur.classList.remove("is-hidden");
      var t = e.target.closest ? e.target.closest("[data-cursor], a, button, input, select, textarea, label") : null;
      var text = t && t.getAttribute("data-cursor");
      cur.classList.toggle("is-label", !!text);
      cur.classList.toggle("is-link", !!t && !text);
      if (text) label.textContent = text;
    }, { passive: true });
    document.documentElement.addEventListener("pointerleave", function () { cur.classList.add("is-hidden"); });
    (function loop() {
      cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
      cur.style.transform = "translate3d(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px,0) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();
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
    if (!a || reduceMotion || e.defaultPrevented) return;
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

  /* ---------- Diagnóstico de marca: radar en vivo ---------- */
  var diag = document.querySelector(".diag");
  if (diag) {
    var inputs = Array.prototype.slice.call(diag.querySelectorAll('input[type="range"]'));
    var svgNS = "http://www.w3.org/2000/svg";
    var R = 118, N = inputs.length;
    var shape = diag.querySelector(".radar-shape"), target = diag.querySelector(".radar-target");
    var gridG = diag.querySelector(".radar-grid"), dotsG = diag.querySelector(".radar-dots"), labelsG = diag.querySelector(".radar-labels");
    var scoreEl = diag.querySelector("[data-score]"), recoEl = diag.querySelector("[data-reco]");
    var angle = function (i) { return -Math.PI / 2 + (i / N) * Math.PI * 2; };
    var pt = function (i, v) { var a = angle(i); return [Math.cos(a) * R * v / 10, Math.sin(a) * R * v / 10]; };
    var el = function (name, attrs, parent) {
      var n = document.createElementNS(svgNS, name);
      for (var k in attrs) n.setAttribute(k, attrs[k]);
      parent.appendChild(n); return n;
    };
    for (var ring = 1; ring <= 5; ring++) {
      el("polygon", { points: inputs.map(function (_, i) { return pt(i, ring * 2).join(","); }).join(" ") }, gridG);
    }
    var dots = inputs.map(function (inp, i) {
      var end = pt(i, 10);
      el("line", { x1: 0, y1: 0, x2: end[0], y2: end[1] }, gridG);
      var lp = pt(i, 12.4), t = el("text", { x: lp[0], y: lp[1], "text-anchor": Math.abs(lp[0]) < 4 ? "middle" : lp[0] > 0 ? "start" : "end", "dominant-baseline": "middle" }, labelsG);
      t.textContent = inp.getAttribute("data-name").split(" ")[0];
      return el("circle", { r: 3.2, cx: 0, cy: 0 }, dotsG);
    });
    var current = inputs.map(function () { return 0; });
    var goal = inputs.map(function (inp) { return +inp.value; });
    var shownScore = 0, raf = null;

    function render() {
      shape.setAttribute("points", current.map(function (v, i) { return pt(i, v).join(","); }).join(" "));
      current.forEach(function (v, i) { var p = pt(i, v); dots[i].setAttribute("cx", p[0]); dots[i].setAttribute("cy", p[1]); });
    }
    function tick() {
      var moving = false;
      current = current.map(function (v, i) {
        var d = goal[i] - v;
        if (Math.abs(d) > 0.01) { moving = true; return v + d * 0.14; }
        return goal[i];
      });
      var targetScore = Math.round(goal.reduce(function (a, b) { return a + b; }, 0) / N * 10);
      if (shownScore !== targetScore) { shownScore += Math.sign(targetScore - shownScore) * Math.max(1, Math.round(Math.abs(targetScore - shownScore) * 0.2)); moving = true; }
      scoreEl.textContent = shownScore;
      render();
      raf = moving ? requestAnimationFrame(tick) : null;
    }
    function update() {
      goal = inputs.map(function (inp) { return +inp.value; });
      inputs.forEach(function (inp) {
        inp.style.setProperty("--fill", inp.value * 10 + "%");
        inp.nextElementSibling.textContent = inp.value;
      });
      // Potencial: cada eje sube al menos tres puntos, hasta un mínimo de 8.
      target.setAttribute("points", goal.map(function (v, i) { return pt(i, Math.min(10, Math.max(v + 3, 8))).join(","); }).join(" "));
      var order = inputs.map(function (inp, i) { return { i: i, v: goal[i] }; }).sort(function (a, b) { return a.v - b.v || a.i - b.i; });
      var first = inputs[order[0].i], second = inputs[order[1].i];
      var link = function (inp) { return '<a href="' + inp.getAttribute("data-href") + '">' + inp.getAttribute("data-name") + "</a>"; };
      recoEl.innerHTML = "Empieza por " + link(first) + ", donde tu marca tiene más recorrido, y sigue con " + link(second) + ". La línea discontinua muestra hasta dónde puede llegar.";
      if (reduceMotion) { current = goal.slice(); shownScore = Math.round(goal.reduce(function (a, b) { return a + b; }, 0) / N * 10); scoreEl.textContent = shownScore; render(); return; }
      if (!raf) raf = requestAnimationFrame(tick);
    }
    inputs.forEach(function (inp) { inp.addEventListener("input", update); });
    // El radar se dibuja cuando el bloque entra en pantalla.
    if ("IntersectionObserver" in window && !reduceMotion) {
      var started = false;
      new IntersectionObserver(function (en, obs) {
        if (en[0].isIntersecting && !started) { started = true; update(); obs.disconnect(); }
      }, { threshold: 0.25 }).observe(diag);
      update(); current = current.map(function () { return 0; }); shownScore = 0; scoreEl.textContent = "0"; render();
      if (raf) { cancelAnimationFrame(raf); raf = null; }
    } else {
      update();
    }
  }

  /* ---------- Año ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
