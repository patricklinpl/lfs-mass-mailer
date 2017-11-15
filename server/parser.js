import fs from 'fs'
import parse from 'csv-parse'
import path from 'path'
import Promise from 'bluebird'

const readCSV = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No File Uploaded!'))
    } else {
      const filename = `${file.filename}`
      const parser = parse({delimiter: ',', columns: true, relax: true, auto_parse: true}, (err, data) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(data)
        }
      })
      fs.createReadStream(path.join(__dirname, '../uploads/', filename)).pipe(parser)
    }
  })
}

export {
    readCSV
}
