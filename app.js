const express = require('express')
const app = express();

app.get('/', (req, res) => {
    // res.send("<h1>Haribol</h1>")
    res.sendFile(__dirname + '/index.html') // same as about file sections
})

app.get('/about', (req, res) => {
    // res.send("<h1>About Page</h1>") // for sending one single thing
    res.sendFile('./views/about.html', { root: __dirname }) // for sending file-------> sendFile(actualPath,{relativePath})


})

// redirects

app.get('/about-us', (req, res) => {
    res.redirect('/about');
})




//404 page

app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
})
















app.listen(100, (err) => {
    console.log("Server is running on ", 100);
})
