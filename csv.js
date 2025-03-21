// print vocabs.json to a CSV, very similar to koha-sql.js
// usage: node csv [vocabs.json] > vocabs.csv
import * as fs from 'node:fs'

const datafile = process.argv[2] ? process.argv[2] : 'vocabs.json'
const vocabs = JSON.parse(fs.readFileSync(datafile))

function printRow() {
    console.log('"' + Array.prototype.join.call(arguments, '","') + '"')
}

// header row
printRow('category','authorised_value', 'lib', 'lib_opac')
const termCSV = (category, type) => {
    type.terms.forEach((term, index) => {
        if (category.match("CARRIER") && term.match("other")) return
        printRow(category, term, term, term)
    })
    if (category.match("CARRIER")) printRow(category, 'other', 'other', 'other')
}
// make the text descriptions of codes their corresponding terms
const codeCSV = (category, type) => {
    type.codes.forEach((term, index) => {
        printRow(category, term, type.terms[index], type.terms[index])
    })
}

termCSV("RDACARRIER", vocabs.carrier)
codeCSV("RDACARRIER_CODE", vocabs.carrier)
termCSV("RDACONTENT", vocabs.content)
codeCSV("RDACONTENT_CODE", vocabs.content)
termCSV("RDAMEDIA", vocabs.media)
codeCSV("RDAMEDIA_CODE", vocabs.media)
