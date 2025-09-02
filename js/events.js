// Populate event cards from data/events.json
(function () {
  function fmtDate(iso, fallback) {
    if (!iso) return fallback || '';
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d)) return fallback || '';
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function render(events) {
    var container = document.getElementById('eventCards');
    if (!container) return;
    container.innerHTML = '';
    events.forEach(function (ev) {
      var a = document.createElement('a');
      a.className = 'event-card';
      a.href = ev.href;

      var img = document.createElement('img');
      img.src = ev.image;
      img.alt = (ev.title || 'Event') + ' image';
      img.loading = 'lazy';

      var body = document.createElement('div');
      body.className = 'event-card-body';

      var h4 = document.createElement('h4');
      h4.textContent = ev.title || '';

      var meta = document.createElement('p');
      meta.className = 'event-meta';
      var dateString = fmtDate(ev.date, ev.date_text);
      var parts = [];
      if (dateString) parts.push(dateString);
      if (ev.location) parts.push(ev.location);
      meta.textContent = parts.join(' • ');

      body.appendChild(h4);
      body.appendChild(meta);

      a.appendChild(img);
      a.appendChild(body);
      container.appendChild(a);
    });
  }

  function sortEvents(list) {
    var today = new Date();
    today.setHours(0,0,0,0);
    var upcoming = [];
    var past = [];
    list.forEach(function (ev) {
      if (!ev.date) { upcoming.push(ev); return; }
      var d = new Date(ev.date + 'T00:00:00');
      if (isNaN(d) || d >= today) upcoming.push(ev); else past.push(ev);
    });
    upcoming.sort(function (a, b) {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(a.date) - new Date(b.date);
    });
    past.sort(function (a, b) {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date) - new Date(a.date);
    });
    return upcoming.concat(past);
  }

  function init() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/events.json', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            var events = JSON.parse(xhr.responseText);
            render(sortEvents(events));
          } catch (e) {
            console.error('Failed to parse events.json', e);
          }
        }
      }
    };
    xhr.send();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

