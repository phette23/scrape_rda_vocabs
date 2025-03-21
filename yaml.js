// print vocabs.json to Koha Authorized Values YAML like
// - category: "RDACONTENT_CODE"
//   authorised_value: "crd"
//   lib: "cartographic dataset"
//   lib_opac: "cartographic dataset"
// usage: node csv [vocabs.json] > vocabs.yaml
import * as fs from 'node:fs'

const datafile = process.argv[2] ? process.argv[2] : 'vocabs.json'
const vocabs = JSON.parse(fs.readFileSync(datafile))

// for codes, lib & lib_opac are the term
// for terms, everything is the term
function printrow(category, authorised_value, lib, lib_opac) {
    console.log(
`- category: ${category}
  authorised_value: ${authorised_value}
  lib: ${lib}
  lib_opac: ${lib_opac}`)
}
for (const [name, entries] of Object.entries(vocabs)) {
    entries.terms.forEach((term, index) => {
        printrow(`RDA${name.toUpperCase()}`, term, term, term)
    })
    entries.codes.forEach((code, index) => {
        printrow(`RDA${name.toUpperCase()}_CODE`, code, entries.terms[index], entries.terms[index])
    })
}
