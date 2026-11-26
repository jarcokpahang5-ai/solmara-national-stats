[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/jarcokpahang5-ai/solmara-national-stats/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/jarcokpahang5-ai/solmara-national-stats/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# DataNusa — Statistik Indonesia

DataNusa is a national statistics site for Indonesia, built as plain static files with no build step and no network requests. It covers the figures a visitor comes looking for: population and age structure, the economy (GDP, growth, sectors, trade, jobs), all 38 provinces, and health and education — every figure labelled with its source and year.

## What is inside

- **Beranda** — the big picture: population, GDP, growth, HDI, poverty, plus a GDP-growth line chart and a top-provinces bar chart.
- **Penduduk** — 281,6 million people (BPS, mid-2024), age structure as a donut chart, density, median age, urban share.
- **Ekonomi** — tabs that switch between growth, GDP by sector, and export destinations; trade and labour facts.
- **Wilayah** — a bar chart of the 10 largest provinces and a table of all 38 provinces with live search, island-group filters, and sorting by population or name.
- **Kesehatan & Pendidikan** — life expectancy, literacy, years of schooling, stunting, JKN coverage, and the HDI trend 2020–2024.
- **Sumber & Metode** — every source (BPS, World Bank, Kemenkes, BPJS Kesehatan, APJII) and the rounding notes.

All charts are inline SVG drawn from the figures in `app/data.js`. The site works on a desktop and on a phone, offline, from its own files.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

Node 22 or later. No dependencies, no build step.

## Hand in

`main.ts` copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the vendored make.fun library:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
