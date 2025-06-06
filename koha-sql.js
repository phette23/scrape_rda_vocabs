import * as fs from 'node:fs'

import vocabs from './vocabs.json' with {type: 'json'}

const INSERT = 'INSERT INTO authorised_values (category, authorised_value, lib, lib_opac)\nVALUES '
let sql = ''

const termSQL = (category, type) => {
    sql += `INSERT INTO authorised_value_categories (category_name) VALUES ('${category}');\n`
    sql += INSERT
    type.terms.forEach((term, index) => {
        // skip Carrier "other" terms which have the same term text but different codes by carrier category
        if (category.match("CARRIER") && term.match("other")) return
        sql += `('${category}', '${term}', '${term}', '${term}')`
        if (index + 1 === type.terms.length) {
            if (category.match("CARRIER")) sql += `,\n('${category}', 'other', 'other', 'other')`
            sql += ';\n'
        } else {
            sql += ',\n'
        }
    })
}
// make the text descriptions of codes their corresponding terms
const codeSQL = (category, type) => {
    sql += `INSERT INTO authorised_value_categories (category_name) VALUES ('${category}');\n`
    sql += INSERT
    type.codes.forEach((term, index) => {
        sql += `('${category}', '${term}', '${type.terms[index]}', '${type.terms[index]}')`
        sql += index + 1 === type.codes.length ? ';\n' : ',\n'
    })
}

termSQL("RDACARRIER", vocabs.carrier)
codeSQL("RDACARRIER_CODE", vocabs.carrier)
termSQL("RDACONTENT", vocabs.content)
codeSQL("RDACONTENT_CODE", vocabs.content)
termSQL("RDAMEDIA", vocabs.media)
codeSQL("RDAMEDIA_CODE", vocabs.media)

console.log(sql)
fs.writeFile('koha.sql', sql, err => {
    if (err) return console.error("Error writing koha.sql file", err)
    console.error("Wrote koha.sql file")
})
