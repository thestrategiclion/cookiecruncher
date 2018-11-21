/*
    Script for processing cookies exported with Cookie Manager addon for Firefox
    https://github.com/ysard/cookie-quick-manager

    How to use:
    - export the cookies using the addon in a json format
    - place the json file into the "process" subfolder of the project
    - run "node ."
    Result:
        In the "output" directory you will have an CSV file with the list of cookies (with byte size)
        and a second file containing only the cookie values without any additional text ment only for size check
*/

const fs = require('fs');
const csv = require("fast-csv");

// stream for writing the cookie list with details
let writeStream = fs.createWriteStream('./output/output.csv');
// steam for writing the CSV format
let csvStream = csv.createWriteStream({headers: true});
// stream for writing the cookie values only
let writeValuesStream = fs.createWriteStream('./output/values-output.txt');

let obj = JSON.parse(fs.readFileSync('./process/cookies.json', 'utf8'));
let processedCookies = [];

// aray of object
Object.keys(obj).forEach((cookie) => {
    var elem = {
        value: obj[cookie]["Content raw"],
        name: obj[cookie]["Name raw"],
        size: Buffer.byteLength(obj[cookie]["Content raw"], 'utf8')
    }

    processedCookies.push(elem);
});

// pipe the csv processing to the file writer
csvStream.pipe(writeStream);

// write each csv entry
processedCookies.forEach( (elem) => {
    csvStream.write({Name:elem.name, Value:elem.value, ByteSize:elem.size});
    writeValuesStream.write(elem.value);
});


// the finish event is emitted when all data has been flushed from the stream
writeStream.on('finish', () => {  
    console.log('File processing done!');
});
writeValuesStream.on('finish', () => {  
    console.log('Values writing done!');
});

// close the streams
csvStream.end();
writeStream.end();
writeValuesStream.end();