import * as fs from 'node:fs'

import vocabs from './vocabs.json' with {type: 'json'}

const INSERT = 'INSERT INTO authorised_values (category, authorised_value, lib, lib_opac)\nVALUES '
let sql = ''

const termSql = (category, type) => {
    sql += INSERT
    type.terms.forEach((term, index) => {
        sql += `('${category}', '${term}', '${term}', '${term}')`
        sql += index + 1 === type.terms.length ? ';\n' : ',\n'
    })
}
// make the text descriptions of codes their corresponding terms
const codeSql = (category, type) => {
    sql += INSERT
    type.codes.forEach((term, index) => {
        sql += `('${category}', '${term}', '${type.terms[index]}', '${type.terms[index]}')`
        sql += index + 1 === type.codes.length ? ';\n' : ',\n'
    })
}

termSql("RDACARRIER", vocabs.carrier)
codeSql("RDACARRIER_CODE", vocabs.carrier)
termSql("RDACONTENT", vocabs.content)
codeSql("RDACONTENT_CODE", vocabs.content)
termSql("RDAMEDIA", vocabs.media)
codeSql("RDAMEDIA_CODE", vocabs.media)

console.log(sql)
fs.writeFile('koha.sql', sql, err => {
    if (err) return console.error("Error writing koha.sql file", err)
    console.log("Wrote koha.sql file")
})
