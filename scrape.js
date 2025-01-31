import * as fs from 'node:fs'

import * as cheerio from 'cheerio'

const urls = {
    carrier: "https://www.loc.gov/standards/valuelist/rdacarrier.html",
    content: "https://www.loc.gov/standards/valuelist/rdacontent.html",
    media: "https://www.loc.gov/standards/valuelist/rdamedia.html"
}
let vocabs = {
    carrier: {
        codes: [],
        terms: []
    },
    content: {
        codes: [],
        terms: []
    },
    media: {
        codes: [],
        terms: []
    }
}

async function scrape_page(url, type) {
    const response = await fetch(url)
    const body = await response.text()
    let $ = cheerio.load(body)
    // first table is layout so skip that, all others have data
    $('table').slice(1).find('tr').each((i, row) => {
        let term = $(row).find('td').eq(0).text().trim()
        let code = $(row).find('td').eq(1).text().trim()
        if (term) type.terms.push(term)
        if (code) type.codes.push(code)
    })
}

await scrape_page(urls.carrier, vocabs.carrier)
await scrape_page(urls.content, vocabs.content)
await scrape_page(urls.media, vocabs.media)

console.log(vocabs)
fs.writeFile("vocabs.json", JSON.stringify(vocabs), err => {
    if (err) return console.error("Error writing vocabs.json file", err)
    console.log("Wrote data to vocabs.json")
})
