# Scrape RDA media vocabs

Scrape the RDA MARC 336/7/8 content/media/carrier vocabularies. I should have used an already structured source of these vocabularies before scraping them, like [the RDA Registry](https://www.rdaregistry.info/termList/), though unless I'm missing something that doesn't show the relationship between the codes and the terms. LC's [Linked Data Service](https://id.loc.gov/) does, though ([example](https://id.loc.gov/vocabulary/contentTypes/crd.html)).

## Setup & Use

`pnpm install`. Only needed for scrape.js, other scripts have no dependencies.

node 22+ because of the JSON import in koha-sql.js

`node scrape.js` to get data off of LC's website and into a JSON file.

`node koha-sql.js` to take the JSON and turn it into SQL `INSERT` statements for Koha authorized values.

`node csv vocabs.json` to convert the JSON to CSV.

`node yaml vocabs.json` to convert the JSON to Koha Authorized Values YAML.
