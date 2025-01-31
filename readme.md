# Scrape RDA media vocabs

Scrape the RDA 336/7/8 content/media/carrier vocabs. This data probably exists in a structured format elsewhere and I should've looked for it before doing this...

## Setup & Use

`pnpm install`

node 22+ because of the JSON import in koha-sql.js

`node scrape.js` to get data off of LC's website and into a JSON file

`node koha-sql.js` to take the JSON and turn it into SQL `INSERT` statements for Koha authorized values.
