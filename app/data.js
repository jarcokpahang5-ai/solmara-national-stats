// DataNusa — figures for Indonesia, with source and year on every figure.
// All numbers are the published figures of the named source, rounded for
// display; nothing here is invented. See app/#/sources for the full list.
export const META = {
  country: 'Indonesia',
  updated: 'November 2026',
  currency: 'Rupiah (Rp)',
};

export const KEY_NUMBERS = [
  { label: 'Penduduk', value: '281,6 jt', note: 'jiwa, pertengahan 2024', source: 'BPS' },
  { label: 'PDB nominal', value: 'Rp22.139 T', note: '≈ US$1.396 triliun, 2024', source: 'BPS / Bank Dunia' },
  { label: 'Pertumbuhan ekonomi', value: '5,03%', note: 'PDB 2024 (y-on-y)', source: 'BPS' },
  { label: 'PDB per kapita', value: 'Rp78,6 jt', note: '≈ US$4.960, 2024', source: 'BPS' },
  { label: 'IPM', value: '75,02', note: 'Indeks Pembangunan Manusia 2024', source: 'BPS' },
  { label: 'Tingkat kemiskinan', value: '8,57%', note: 'September 2024', source: 'BPS' },
];

// GDP growth, percent year on year, 2019-2024 (BPS).
export const GDP_GROWTH = [
  { year: 2019, value: 5.02 },
  { year: 2020, value: -2.07 },
  { year: 2021, value: 3.7 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];

// Human Development Index, 2020-2024 (BPS).
export const HDI_SERIES = [
  { year: 2020, value: 71.94 },
  { year: 2021, value: 72.29 },
  { year: 2022, value: 72.91 },
  { year: 2023, value: 74.39 },
  { year: 2024, value: 75.02 },
];

// Share of GDP by sector, 2024 (BPS), percent.
export const GDP_SECTORS = [
  { name: 'Industri pengolahan', value: 18.98 },
  { name: 'Perdagangan', value: 12.99 },
  { name: 'Pertanian, kehutanan, perikanan', value: 12.53 },
  { name: 'Konstruksi', value: 9.7 },
  { name: 'Pertambangan dan penggalian', value: 8.23 },
  { name: 'Transportasi dan pergudangan', value: 6.2 },
  { name: 'Informasi dan komunikasi', value: 3.87 },
  { name: 'Jasa lainnya', value: 27.5 },
];

// Age structure, 2024 (BPS), percent of population.
export const AGE_GROUPS = [
  { name: '0–14 tahun', value: 24.2 },
  { name: '15–64 tahun', value: 69.5 },
  { name: '65 tahun ke atas', value: 6.3 },
];

// Population by province, 2024 mid-year estimate (BPS), in millions.
// island: the island group the province belongs to, for the region filter.
export const PROVINCES = [
  { name: 'Jawa Barat', pop: 49.94, island: 'Jawa', capital: 'Bandung' },
  { name: 'Jawa Timur', pop: 41.81, island: 'Jawa', capital: 'Surabaya' },
  { name: 'Jawa Tengah', pop: 37.89, island: 'Jawa', capital: 'Semarang' },
  { name: 'Sumatera Utara', pop: 16.03, island: 'Sumatera', capital: 'Medan' },
  { name: 'Banten', pop: 12.43, island: 'Jawa', capital: 'Serang' },
  { name: 'DKI Jakarta', pop: 10.68, island: 'Jawa', capital: 'Jakarta' },
  { name: 'Sulawesi Selatan', pop: 9.42, island: 'Sulawesi', capital: 'Makassar' },
  { name: 'Lampung', pop: 9.28, island: 'Sumatera', capital: 'Bandar Lampung' },
  { name: 'Sumatera Selatan', pop: 9.0, island: 'Sumatera', capital: 'Palembang' },
  { name: 'Riau', pop: 6.97, island: 'Sumatera', capital: 'Pekanbaru' },
  { name: 'Sumatera Barat', pop: 5.76, island: 'Sumatera', capital: 'Padang' },
  { name: 'Nusa Tenggara Barat', pop: 5.62, island: 'Bali & Nusa Tenggara', capital: 'Mataram' },
  { name: 'Kalimantan Barat', pop: 5.6, island: 'Kalimantan', capital: 'Pontianak' },
  { name: 'Aceh', pop: 5.55, island: 'Sumatera', capital: 'Banda Aceh' },
];

export const PROVINCES_FULL = [
  ...PROVINCES,
  { name: 'Kalimantan Timur', pop: 4.03, island: 'Kalimantan', capital: 'Samarinda' },
  { name: 'Sulawesi Tenggara', pop: 2.82, island: 'Sulawesi', capital: 'Kendari' },
  { name: 'Sulawesi Tengah', pop: 3.13, island: 'Sulawesi', capital: 'Palu' },
  { name: 'Sulawesi Utara', pop: 2.74, island: 'Sulawesi', capital: 'Manado' },
  { name: 'Bali', pop: 4.39, island: 'Bali & Nusa Tenggara', capital: 'Denpasar' },
  { name: 'Nusa Tenggara Timur', pop: 5.6, island: 'Bali & Nusa Tenggara', capital: 'Kupang' },
  { name: 'Kalimantan Selatan', pop: 4.33, island: 'Kalimantan', capital: 'Banjarmasin' },
  { name: 'Kalimantan Tengah', pop: 2.81, island: 'Kalimantan', capital: 'Palangka Raya' },
  { name: 'Kalimantan Utara', pop: 0.74, island: 'Kalimantan', capital: 'Tanjung Selor' },
  { name: 'Jambi', pop: 3.68, island: 'Sumatera', capital: 'Jambi' },
  { name: 'Bengkulu', pop: 2.1, island: 'Sumatera', capital: 'Bengkulu' },
  { name: 'Kepulauan Bangka Belitung', pop: 1.52, island: 'Sumatera', capital: 'Pangkal Pinang' },
  { name: 'Kepulauan Riau', pop: 2.2, island: 'Sumatera', capital: 'Tanjung Pinang' },
  { name: 'DI Yogyakarta', pop: 3.76, island: 'Jawa', capital: 'Yogyakarta' },
  { name: 'Gorontalo', pop: 1.25, island: 'Sulawesi', capital: 'Gorontalo' },
  { name: 'Sulawesi Barat', pop: 1.51, island: 'Sulawesi', capital: 'Mamuju' },
  { name: 'Maluku', pop: 1.98, island: 'Maluku & Papua', capital: 'Ambon' },
  { name: 'Maluku Utara', pop: 1.45, island: 'Maluku & Papua', capital: 'Sofifi' },
  { name: 'Papua', pop: 1.18, island: 'Maluku & Papua', capital: 'Jayapura' },
  { name: 'Papua Barat', pop: 0.59, island: 'Maluku & Papua', capital: 'Manokwari' },
  { name: 'Papua Selatan', pop: 0.54, island: 'Maluku & Papua', capital: 'Merauke' },
  { name: 'Papua Tengah', pop: 1.35, island: 'Maluku & Papua', capital: 'Nabire' },
  { name: 'Papua Pegunungan', pop: 1.47, island: 'Maluku & Papua', capital: 'Wamena' },
  { name: 'Papua Barat Daya', pop: 0.63, island: 'Maluku & Papua', capital: 'Sorong' },
];

// Trade, 2024 (BPS), US$ billion. Top export destinations, approximate.
export const TRADE = {
  exports: 264.7,
  imports: 233.7,
  surplus: 31.0,
  year: 2024,
  destinations: [
    { name: 'Tiongkok', value: 62.4 },
    { name: 'Amerika Serikat', value: 26.3 },
    { name: 'Jepang', value: 17.6 },
    { name: 'India', value: 15.9 },
    { name: 'Singapura', value: 13.2 },
  ],
};

export const LABOUR = {
  labourForce: '152,11 jt',
  employed: '144,64 jt',
  unemployment: '4,91%',
  unemploymentNote: 'Agustus 2024',
  informal: '59,17%',
  informalNote: 'pekerja informal, Agustus 2024',
};

export const HEALTH_EDU = [
  { label: 'Harapan hidup', value: '74,2 thn', note: '2024', source: 'BPS' },
  { label: 'Angka melek huruf (15+)', value: '96,0%', note: '2023', source: 'BPS' },
  { label: 'Rata-rata lama sekolah', value: '9,0 thn', note: '2024', source: 'BPS' },
  { label: 'Harapan lama sekolah', value: '13,2 thn', note: '2024', source: 'BPS' },
  { label: 'Balita stunting', value: '19,8%', note: '2024', source: 'Kemenkes (SSGI)' },
  { label: 'Peserta JKN', value: '98%', note: 'cakupan penduduk, 2024', source: 'BPJS Kesehatan' },
  { label: 'Pengguna internet', value: '221,6 jt', note: '2024', source: 'APJII' },
  { label: 'Inflasi', value: '1,57%', note: 'Desember 2024 (y-on-y)', source: 'BPS' },
];

export const SOURCES = [
  { name: 'Badan Pusat Statistik (BPS)', detail: 'Penduduk pertengahan tahun 2024, PDB, pertumbuhan ekonomi, kemiskinan, ketenagakerjaan, IPM, harapan hidup, pendidikan. bps.go.id.' },
  { name: 'Bank Dunia (World Bank)', detail: 'PDB nominal Indonesia 2024 dalam dolar AS dan PDB per kapita. data.worldbank.org.' },
  { name: 'Kementerian Kesehatan — SSGI 2024', detail: 'Prevalensi stunting balita 19,8% pada 2024.' },
  { name: 'BPJS Kesehatan', detail: 'Cakupan kepesertaan Jaminan Kesehatan Nasional, 2024.' },
  { name: 'APJII — Survei Penetrasi Internet 2024', detail: '221,6 juta pengguna internet di Indonesia.' },
];

export const ISLANDS = ['Semua', 'Jawa', 'Sumatera', 'Kalimantan', 'Sulawesi', 'Bali & Nusa Tenggara', 'Maluku & Papua'];
