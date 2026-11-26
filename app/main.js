// main.js — router for DataNusa. Hash routes only, no network:
// #/ overview, #/population, #/economy, #/regions, #/health, #/sources.
// Renders the matching view into #view, marks the active nav link, then
// wires that view's controls (tabs, search, filters) via views.bind.
import {
  renderOverview,
  renderPopulation,
  renderEconomy,
  renderRegions,
  renderHealth,
  renderSources,
  bind,
} from './views.js';

const ROUTES = {
  '': { title: 'Indonesia dalam angka — DataNusa', render: renderOverview },
  population: { title: 'Penduduk — DataNusa', render: renderPopulation },
  economy: { title: 'Ekonomi — DataNusa', render: renderEconomy },
  regions: { title: 'Wilayah & provinsi — DataNusa', render: renderRegions },
  health: { title: 'Kesehatan & pendidikan — DataNusa', render: renderHealth },
  sources: { title: 'Sumber & metode — DataNusa', render: renderSources },
};

const view = document.getElementById('view');
const navLinks = [...document.querySelectorAll('.site-nav a')];

function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '').split('/')[0];
  return Object.prototype.hasOwnProperty.call(ROUTES, hash) ? hash : '';
}

function render() {
  const route = currentRoute();
  const page = ROUTES[route];
  view.innerHTML = page.render();
  document.title = page.title;
  navLinks.forEach((link) => {
    const target = link.getAttribute('href').replace(/^#\/?/, '');
    link.classList.toggle('active', target === route);
    if (target === route) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  bind(route);
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
