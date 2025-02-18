// print vocabs.json to a CSV, very similar to koha-sql.js
// usage: node csv [vocabs.json] > vocabs.csv
import * as fs from 'node:fs'

const datafile = process.argv[2] ? process.argv[2] : 'vocabs.json'
const vocabs = JSON.parse(fs.readFileSync(datafile))

function printrow() {
    console.log('"' + Array.prototype.join.call(arguments, '","') + '"')
}

// header row
printrow('category','authorised_value', 'lib', 'lib_opac')
const termSql = (category, type) => {
    type.terms.forEach((term, index) => {
        printrow(category, term, term, term)
    })
}
// make the text descriptions of codes their corresponding terms
const codeSql = (category, type) => {
    type.codes.forEach((term, index) => {
        printrow(category, term, type.terms[index], type.terms[index])
    })
}

termSql("RDACARRIER", vocabs.carrier)
codeSql("RDACARRIER_CODE", vocabs.carrier)
termSql("RDACONTENT", vocabs.content)
codeSql("RDACONTENT_CODE", vocabs.content)
termSql("RDAMEDIA", vocabs.media)
codeSql("RDAMEDIA_CODE", vocabs.media)
