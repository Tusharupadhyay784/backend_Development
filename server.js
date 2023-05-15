//server creation
//1. http module
const http = require('http')
// for reading file importing fs module
const fs = require('fs')
//importing lodash
const _ = require('lodash')
const server = http.createServer((req, res) => {

    console.log("Server is made")
    // console.log(req);
    // console.log(req.url)
    // console.log(req.method)
    // res.setHeader('Content-Type', 'text/plain'); // for plain text
// using lodash in our file
    const names = _.random(0,20);
    console.log(names);
    let greet = _.once(()=>{
        console.log("hello"); // call only once this feature given by lodash
    })
    greet();
    res.setHeader('Content-Type', 'text/html'); // for HTML file
    // res.write("<h1>Haribol</h1>")
    // res.end();
    let path = './views';
    if (req.url === '/') path += '/index.html';
    else if (req.url === '/about') path += '/about.html';
    else path += '/404.html'

    fs.readFile(path, (err, fileData) => {
        if (err) {
            console.log(err);
        }
        else {
            // res.write(fileData);
            // for one single file no need to write filedata inside res.write() function just put filedata inside res.end() and it will work
            res.end(fileData);
        }
    })
})
server.listen((100), (err) => {
    console.log("Server is running on ", 100);
});