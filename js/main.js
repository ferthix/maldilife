/* Maldilife scripts - patterns reffered to  W3Schools (responsive topnav, dropdown click, accordion, form validation) */
(function () {
  // Responsive topnav: toggle menu
  var burger = document.getElementById("burger"), menu = document.getElementById("menu");
  if (burger) burger.addEventListener("click", function () {
    var open = menu.classList.toggle("responsive");
    burger.setAttribute("aria-expanded", open);
  });
  // Dropdown: toggle on click (touch/keyboard), close when clicking elsewhere
  var drops = document.querySelectorAll(".dropdown");
  drops.forEach(function (d) {
    var c = d.querySelector(".caret");
    c.addEventListener("click", function (e) {
      e.stopPropagation();
      var o = !d.classList.contains("open");
      drops.forEach(function (x) { x.classList.remove("open"); x.querySelector(".caret").setAttribute("aria-expanded", false); });
      d.classList.toggle("open", o); c.setAttribute("aria-expanded", o);
    });
  });
  document.addEventListener("click", function () {
    drops.forEach(function (x) { x.classList.remove("open"); x.querySelector(".caret").setAttribute("aria-expanded", false); });
  });
  // Accordion
  function toggle(btn, force) {
    var p = btn.nextElementSibling, open = force === undefined ? !btn.classList.contains("active") : force;
    btn.classList.toggle("active", open); btn.setAttribute("aria-expanded", open);
    p.style.maxHeight = open ? p.scrollHeight + "px" : null;
    if (open) p.querySelectorAll("img").forEach(function (im) { im.addEventListener("load", function () { if (btn.classList.contains("active")) p.style.maxHeight = p.scrollHeight + "px"; }); });
  }
  window.addEventListener("resize", function () {
    document.querySelectorAll(".accordion.active").forEach(function (b) { b.nextElementSibling.style.maxHeight = b.nextElementSibling.scrollHeight + "px"; });
  });
  var acc = document.querySelectorAll(".accordion");
  acc.forEach(function (b) {
    b.addEventListener("click", function () { toggle(b); });
    if (b.classList.contains("active")) toggle(b, true);
  });
  function openHash() {
    var t = document.getElementById(location.hash.slice(1));
    if (t && t.classList.contains("accordion")) toggle(t, true);
  }
  window.addEventListener("hashchange", openHash); openHash();
  // Slideshow (W3Schools pattern): previous/next buttons and dots
  document.querySelectorAll(".slideshow").forEach(function (ss) {
    var slides = ss.querySelectorAll(".slide"), dots = ss.querySelectorAll(".dot"), n = 0;
    function show(i) {
      n = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("show", k === n); });
      dots.forEach(function (d, k) { d.classList.toggle("active", k === n); });
    }
    ss.querySelector(".prev").addEventListener("click", function () { show(n - 1); });
    ss.querySelector(".next").addEventListener("click", function () { show(n + 1); });
    dots.forEach(function (d, k) { d.addEventListener("click", function () { show(k); }); });
  });
  // Budget estimator
  var f = document.getElementById("budget");
  if (f) {
    var calc = function () {
      var d = +f.days.value || 0, p = +f.people.value || 1, s = +f.stay.value, fl = +f.flight.value || 0;
      document.getElementById("total").textContent = "$" + (d * s * p + fl * p).toLocaleString();
    };
    f.addEventListener("input", calc); calc();
  }
  // Contact form validation
  var c = document.getElementById("contact");
  if (c) c.addEventListener("submit", function (e) {
    e.preventDefault(); var ok = true;
    function chk(id, test, msg) {
      var i = c[id], er = document.getElementById(id + "-err"), good = test(i.value.trim());
      er.textContent = good ? "" : msg; i.classList.toggle("bad", !good); if (!good) ok = false;
    }
    chk("name", function (v) { return v.length >= 2; }, "Enter your name (2+ characters).");
    chk("email", function (v) { return /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v); }, "Enter a valid email like you@example.com.");
    chk("topic", function (v) { return v !== ""; }, "Choose a topic.");
    chk("msg", function (v) { return v.length >= 20; }, "Tell us a little more (20+ characters).");
    var s = document.getElementById("status");
    s.textContent = ok ? "Thanks, " + c.name.value.trim() + "! We will reply within two days." : "Please fix the highlighted fields.";
    if (ok) c.reset();
  });
})();
