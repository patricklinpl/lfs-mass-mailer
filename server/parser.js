import fs from 'fs'
import parse from 'csv-parse'
import path from 'path'

const readCSV = (file, callback) => {
  const filename = `${file.filename}`
  const parser = parse({delimiter: ',', columns: true, relax: true, auto_parse: true}, (err, data) => {
    if (err) {
      callback(err)
    } else {
      callback(null, data)
    }
  })
  fs.createReadStream(path.join(__dirname, '../uploads/', filename)).pipe(parser)
}

export {
    readCSV
}
