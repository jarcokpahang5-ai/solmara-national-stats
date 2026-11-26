// views.js — one renderer per page of DataNusa, plus the wiring that makes
// each page's controls work. All figures come from data.js; nothing here
// fetches anything.
import {
  KEY_NUMBERS,
  GDP_GROWTH,
  HDI_SERIES,
  GDP_SECTORS,
  AGE_GROUPS,
  PROVINCES,
  PROVINCES_FULL,
  TRADE,
  LABOUR,
  HEALTH_EDU,
  SOURCES,
  ISLANDS,
} from './data.js';
import { barChart, lineChart, donutChart } from './charts.js';

function statCards(cards) {
  return `<div class="cards">${cards
    .map(
      (c) => `<article class="card"><p class="card-value">${c.value}</p><h3>${c.label}</h3><p class="card-note">${c.note}</p><p class="card-source">Sumber: ${c.source}</p></article>`,
    )
    .join('')}</div>`;
}

function pageHead(title, intro, source) {
  return `<header class="page-head"><h1>${title}</h1><p class="lede">${intro}</p><p class="page-source">Sumber: ${source}</p></header>`;
}

function provinceRows(list) {
  return list
    .map(
      (p, i) =>
        `<tr><td>${i + 1}</td><td>${p.name}</td><td>${p.island}</td><td>${p.capital}</td><td class="num">${p.pop.toLocaleString('id-ID', { minimumFractionDigits: 2 })} jt</td></tr>`,
    )
    .join('');
}

function provinceTable(list, idPrefix) {
  return `<div class="table-tools">
      <label class="search-label">Cari provinsi
        <input type="search" id="${idPrefix}-search" placeholder="Ketik nama provinsi…" autocomplete="off" />
      </label>
      <div class="tool-group" role="group" aria-label="Urutkan">
        <button type="button" data-sort="pop" class="tool-btn active">Terbanyak dulu</button>
        <button type="button" data-sort="name" class="tool-btn">Nama A–Z</button>
      </div>
    </div>
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th>#</th><th>Provinsi</th><th>Pulau</th><th>Ibu kota</th><th class="num">Penduduk</th></tr></thead>
      <tbody id="${idPrefix}-body">${provinceRows(list)}</tbody>
    </table></div>
    <p class="table-count" id="${idPrefix}-count">${list.length} provinsi ditampilkan</p>`;
}

function bindProvinceTable(prefix, fullList) {
  const search = document.getElementById(`${prefix}-search`);
  const body = document.getElementById(`${prefix}-body`);
  const count = document.getElementById(`${prefix}-count`);
  const buttons = [...document.querySelectorAll(`#view [data-sort]`)];
  let sort = 'pop';
  let query = '';
  let island = 'Semua';
  function render() {
    let list = fullList.filter(
      (p) => (island === 'Semua' || p.island === island) && p.name.toLowerCase().includes(query),
    );
    list = [...list].sort((a, b) => (sort === 'pop' ? b.pop - a.pop : a.name.localeCompare(b.name, 'id')));
    body.innerHTML = provinceRows(list);
    count.textContent = `${list.length} provinsi ditampilkan${island !== 'Semua' ? ` di ${island}` : ''}${query ? ` untuk “${query}”` : ''}`;
  }
  search.addEventListener('input', () => {
    query = search.value.trim().toLowerCase();
    render();
  });
  buttons.forEach((btn) =>
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      sort = btn.dataset.sort;
      render();
    }),
  );
  document.querySelectorAll(`#view [data-island]`).forEach((btn) =>
    btn.addEventListener('click', () => {
      document.querySelectorAll(`#view [data-island]`).forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      island = btn.dataset.island;
      render();
    }),
  );
  render();
}

export function renderOverview() {
  const top10 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  return `${pageHead(
    'Indonesia dalam angka',
    'Satu halaman untuk gambaran besar Indonesia: berapa penduduknya, seberapa besar ekonominya, dan bagaimana perkembangannya. Semua angka berlabel sumber dan tahun.',
    'BPS, Bank Dunia — 2024',
  )}
  ${statCards(KEY_NUMBERS)}
  <section class="panel"><h2>Pertumbuhan ekonomi 2019–2024</h2>
    <p class="panel-note">PDB tumbuh 5,03% pada 2024 — kembali ke jalur sekitar 5% setelah kontraksi pandemi 2020.</p>
    ${lineChart(GDP_GROWTH, { min: -3, max: 6 })}
    <p class="chart-source">Persen year-on-year. Sumber: BPS.</p>
  </section>
  <section class="panel"><h2>Provinsi terpadat</h2>
    <p class="panel-note">Tiga provinsi di Jawa menampung hampir setengah penduduk Indonesia.</p>
    ${barChart(top10.map((p) => ({ name: p.name, value: p.pop })), { unit: ' jt', decimals: 1 })}
    <p class="chart-source">Juta jiwa, estimasi pertengahan 2024. Sumber: BPS. <a href="#/regions">Lihat semua 38 provinsi →</a></p>
  </section>
  <section class="panel"><h2>Jelajahi datanya</h2>
    <nav class="explore">
      <a href="#/population"><strong>Penduduk</strong><span>281,6 juta jiwa, struktur umur, dan sebaran provinsi</span></a>
      <a href="#/economy"><strong>Ekonomi</strong><span>PDB, sektor, perdagangan, dan harga</span></a>
      <a href="#/regions"><strong>Wilayah</strong><span>38 provinsi, dari Aceh sampai Papua Pegunungan</span></a>
      <a href="#/health"><strong>Kesehatan &amp; pendidikan</strong><span>Harapan hidup, sekolah, dan layanan kesehatan</span></a>
    </nav>
  </section>`;
}

export function renderPopulation() {
  return `${pageHead(
    'Penduduk',
    'Indonesia adalah negara berpenduduk terbesar keempat di dunia. Mayoritas penduduknya berusia produktif, dan lebih dari separuhnya tinggal di Jawa.',
    'BPS — estimasi pertengahan 2024',
  )}
  ${statCards([
    { label: 'Jumlah penduduk', value: '281,6 jt', note: 'jiwa, pertengahan 2024', source: 'BPS' },
    { label: 'Kepadatan', value: '145', note: 'jiwa per km² daratan', source: 'BPS' },
    { label: 'Usia median', value: '30,1 thn', note: 'separuh penduduk lebih muda', source: 'BPS' },
    { label: 'Penduduk perkotaan', value: '58,6%', note: 'dari total penduduk, 2024', source: 'BPS' },
  ])}
  <section class="panel"><h2>Struktur umur</h2>
    <p class="panel-note">Penduduk usia produktif (15–64 tahun) mencapai 69,5% — jendela bonus demografi Indonesia.</p>
    ${donutChart(AGE_GROUPS)}
    <p class="chart-source">Persen dari total penduduk. Sumber: BPS, 2024.</p>
  </section>
  <section class="panel"><h2>Provinsi terpadat</h2>
    ${barChart(
      [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 8).map((p) => ({ name: p.name, value: p.pop })),
      { unit: ' jt', decimals: 1 },
    )}
    <p class="chart-source">Juta jiwa, 2024. Sumber: BPS. <a href="#/regions">Tabel lengkap 38 provinsi →</a></p>
  </section>
  <section class="panel"><h2>Yang perlu diketahui</h2>
    <ul class="facts">
      <li><strong>17.000+ pulau</strong> membentang dari Sabang sampai Merauke, dengan 38 provinsi dan 514 kabupaten/kota.</li>
      <li><strong>56% penduduk tinggal di Jawa</strong>, pulau seluas 7% daratan Indonesia.</li>
      <li><strong>Laju tumbuh penduduk 1,07%</strong> per tahun (2023–2024), melambat dari 1,25% satu dekade lalu.</li>
    </ul>
  </section>`;
}

export function renderEconomy() {
  return `${pageHead(
    'Ekonomi',
    'Ekonomi terbesar di Asia Tenggara: PDB Rp22.139 triliun pada 2024, ditopang industri pengolahan, perdagangan, dan pertanian.',
    'BPS, Bank Dunia — 2024',
  )}
  ${statCards([
    { label: 'PDB nominal', value: 'Rp22.139 T', note: '≈ US$1.396 triliun', source: 'BPS / Bank Dunia' },
    { label: 'PDB per kapita', value: 'Rp78,6 jt', note: '≈ US$4.960', source: 'BPS' },
    { label: 'Ekspor 2024', value: 'US$264,7 M', note: 'surplus dagang US$31,0 M', source: 'BPS' },
    { label: 'Pengangguran', value: '4,91%', note: 'Agustus 2024', source: 'BPS' },
  ])}
  <section class="panel">
    <div class="tabs" role="tablist" aria-label="Topik ekonomi">
      <button type="button" role="tab" data-tab="growth" class="tab active" aria-selected="true">Pertumbuhan</button>
      <button type="button" role="tab" data-tab="sectors" class="tab" aria-selected="false">Sektor</button>
      <button type="button" role="tab" data-tab="trade" class="tab" aria-selected="false">Perdagangan</button>
    </div>
    <div class="tab-panel" data-panel="growth">
      <h2>Pertumbuhan ekonomi 2019–2024</h2>
      <p class="panel-note">Setelah jatuh 2,07% pada 2020, ekonomi pulih dan tumbuh di atas 5% tiga tahun berturut-turut.</p>
      ${lineChart(GDP_GROWTH, { min: -3, max: 6 })}
      <p class="chart-source">Persen year-on-year. Sumber: BPS.</p>
    </div>
    <div class="tab-panel" data-panel="sectors" hidden>
      <h2>Struktur PDB menurut lapangan usaha</h2>
      <p class="panel-note">Industri pengolahan adalah penyumbang terbesar, diikuti perdagangan dan pertanian.</p>
      ${barChart(GDP_SECTORS, { unit: '%', decimals: 1 })}
      <p class="chart-source">Persen dari PDB, 2024. Sumber: BPS.</p>
    </div>
    <div class="tab-panel" data-panel="trade" hidden>
      <h2>Perdagangan luar negeri</h2>
      <p class="panel-note">Ekspor US$264,7 miliar dan impor US$233,7 miliar pada 2024 — surplus US$31,0 miliar.</p>
      ${barChart(TRADE.destinations.map((d) => ({ name: d.name, value: d.value })), { unit: '', decimals: 1, max: 70 })}
      <p class="chart-source">Tujuan ekspor utama, US$ miliar, perkiraan 2024. Sumber: BPS.</p>
    </div>
  </section>
  <section class="panel"><h2>Ketenagakerjaan</h2>
    <ul class="facts">
      <li><strong>Angkatan kerja ${LABOUR.labourForce}</strong> orang, ${LABOUR.employed} di antaranya bekerja (Agustus 2024).</li>
      <li><strong>Pengangguran ${LABOUR.unemployment}</strong> (${LABOUR.unemploymentNote}).</li>
      <li><strong>${LABOUR.informal}</strong> pekerja berada di sektor informal (${LABOUR.informalNote}).</li>
      <li><strong>Inflasi ${HEALTH_EDU.find((h) => h.label === 'Inflasi').value}</strong> pada Desember 2024 (year-on-year).</li>
    </ul>
  </section>`;
}

export function renderRegions() {
  const all = [...PROVINCES_FULL].sort((a, b) => b.pop - a.pop);
  return `${pageHead(
    'Wilayah &amp; provinsi',
    '38 provinsi di tujuh gugus pulau. Gunakan pencarian, filter pulau, dan pengurutan untuk menemukan provinsi yang Anda cari.',
    'BPS — estimasi penduduk pertengahan 2024',
  )}
  <section class="panel"><h2>Provinsi terpadat</h2>
    ${barChart(all.slice(0, 10).map((p) => ({ name: p.name, value: p.pop })), { unit: ' jt', decimals: 1 })}
    <p class="chart-source">Juta jiwa, 2024. Sumber: BPS.</p>
  </section>
  <section class="panel"><h2>Semua provinsi</h2>
    <div class="island-filter" role="group" aria-label="Filter pulau">
      ${ISLANDS.map((name, i) => `<button type="button" data-island="${name}" class="chip${i === 0 ? ' active' : ''}">${name}</button>`).join('')}
    </div>
    ${provinceTable(all, 'regions')}
    <p class="chart-source">Penduduk dalam juta jiwa, estimasi pertengahan 2024. Ibu kota menurut data pemerintah daerah. Sumber: BPS.</p>
  </section>`;
}

export function renderHealth() {
  return `${pageHead(
    'Kesehatan &amp; pendidikan',
    'Harapan hidup 74,2 tahun, melek huruf 96%, dan IPM 75,02 — pembangunan manusia Indonesia terus membaik, dengan pekerjaan rumah pada stunting dan lama sekolah.',
    'BPS, Kemenkes, BPJS Kesehatan — 2023–2024',
  )}
  ${statCards(HEALTH_EDU.slice(0, 6))}
  <section class="panel"><h2>Indeks Pembangunan Manusia 2020–2024</h2>
    <p class="panel-note">IPM naik dari 71,94 pada 2020 menjadi 75,02 pada 2024 — kategori “tinggi” menurut klasifikasi BPS.</p>
    ${lineChart(HDI_SERIES, { min: 70, max: 76, unit: '', decimals: 2 })}
    <p class="chart-source">Skor IPM. Sumber: BPS.</p>
  </section>
  <section class="panel"><h2>Pendidikan</h2>
    <ul class="facts">
      <li><strong>Melek huruf 96,0%</strong> pada penduduk usia 15 tahun ke atas (2023).</li>
      <li><strong>Rata-rata lama sekolah 9,0 tahun</strong> — setara tamat SMP — dan harapan lama sekolah 13,2 tahun (2024).</li>
      <li><strong>221,6 juta pengguna internet</strong> (2024, APJII), membuka jalan bagi pembelajaran daring di seluruh provinsi.</li>
    </ul>
  </section>
  <section class="panel"><h2>Kesehatan</h2>
    <ul class="facts">
      <li><strong>Harapan hidup 74,2 tahun</strong> (2024), naik dari 73,9 tahun pada 2023.</li>
      <li><strong>Stunting balita 19,8%</strong> (2024, SSGI) — turun dari 21,5% pada 2023, masih di atas target 14% pada 2024.</li>
      <li><strong>98% penduduk terdaftar sebagai peserta JKN</strong> (2024, BPJS Kesehatan).</li>
    </ul>
  </section>`;
}

export function renderSources() {
  return `${pageHead(
    'Sumber &amp; metode',
    'Setiap angka di situs ini berasal dari publikasi resmi. Angka dibulatkan untuk keterbacaan; nilai aslinya dapat diperiksa pada sumber yang tercantum.',
    'Diperbarui November 2026',
  )}
  <section class="panel"><h2>Daftar sumber</h2>
    <ul class="facts">
      ${SOURCES.map((s) => `<li><strong>${s.name}.</strong> ${s.detail}</li>`).join('')}
    </ul>
  </section>
  <section class="panel"><h2>Metode &amp; catatan</h2>
    <ul class="facts">
      <li>Angka penduduk adalah estimasi pertengahan tahun BPS 2024; sensus terakhir dilaksanakan pada 2020.</li>
      <li>Nilai rupiah ke dolar AS memakai kurs rata-rata 2024 (sekitar Rp15.850 per US$).</li>
      <li>Jumlah provinsi mengikuti pemekaran Papua: 38 provinsi sejak 2022.</li>
      <li>Situs ini dibuat oleh DataNusa dan bukan situs resmi BPS atau pemerintah Indonesia.</li>
    </ul>
  </section>
  <section class="panel"><h2>Unduh &amp; gunakan</h2>
    <p class="panel-note">Semua data di situs ini tersedia di halaman ini masing-masing dengan sumbernya. Untuk angka resmi terbaru, kunjungi <span class="mono">bps.go.id</span>.</p>
  </section>`;
}

export function bind(route) {
  if (route === 'regions') {
    const all = [...PROVINCES_FULL].sort((a, b) => b.pop - a.pop);
    bindProvinceTable('regions', all);
  }
  if (route === 'economy') {
    const tabs = [...document.querySelectorAll('#view .tab')];
    tabs.forEach((tab) =>
      tab.addEventListener('click', () => {
        tabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        document.querySelectorAll('#view .tab-panel').forEach((panel) => {
          panel.hidden = panel.dataset.panel !== tab.dataset.tab;
        });
      }),
    );
  }
}
