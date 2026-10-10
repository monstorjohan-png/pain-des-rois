/* Pain des Rois — بان دي روا | interactions */
(function () {
  'use strict';

  var WHATSAPP = '201222289000';
  var WA_BASE = 'https://wa.me/' + WHATSAPP;

  /* Header background on scroll + back-to-top */
  var header = document.querySelector('.site-header');
  var toTop = document.getElementById('toTop');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-solid', y > 40);
    if (toTop) toTop.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* Menu tabs */
  var tabs = document.querySelectorAll('.menu__tabs [role="tab"]');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.setAttribute('aria-selected', 'false'); });
      tab.setAttribute('aria-selected', 'true');
      document.querySelectorAll('.menu__panel').forEach(function (p) { p.classList.remove('is-active'); });
      var panel = document.getElementById('panel-' + tab.dataset.tab);
      if (panel) panel.classList.add('is-active');
    });
  });

  /* Reveal on scroll */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* Order form -> WhatsApp */
  var form = document.getElementById('orderForm');
  if (form) {
    var isAr = (document.documentElement.lang || 'ar').slice(0, 2) === 'ar';
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var get = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
      var name = get('oName');
      if (!name) {
        var n = document.getElementById('oName');
        if (n) { n.focus(); n.style.borderColor = '#C9A227'; }
        return;
      }
      var phone = get('oPhone');
      var product = get('oProduct');
      var when = get('oWhen');
      var notes = get('oNotes');

      var lines = isAr
        ? ['مرحبًا Pain des Rois — بان دي روا، أرغب في الطلب 🥐',
           'الاسم: ' + name,
           'الهاتف: ' + (phone || '—'),
           'الطلب: ' + (product || '—'),
           'الاستلام/الحجز: ' + (when || '—')]
        : ['Hello Pain des Rois, I would like to place an order 🥐',
           'Name: ' + name,
           'Phone: ' + (phone || '—'),
           'Order: ' + (product || '—'),
           'Pickup / booking: ' + (when || '—')];
      if (notes) lines.push((isAr ? 'ملاحظات: ' : 'Notes: ') + notes);

      var url = WA_BASE + '?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener');
    });
  }

  /* Year */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
