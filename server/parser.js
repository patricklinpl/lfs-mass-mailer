import csv from 'fast-csv'
import fs from 'fs'

const parseCSV = (form, file) => {
    console.log(file)
    const stream = fs.createReadStream(`./${file.path}`)
    csv
    .fromStream(stream)
    .on("data", function(data){
        console.log(data);
    })
    .on("end", function(){
        console.log("done");
    });
}

export { 
    parseCSV
}