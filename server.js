const http = require('http')
const fs = require('fs').promises;
const port = 8000
const host = 'localhost'

const requestListner = (req, res) => {
    fs.readFile(__dirname + '/index.html')
        .then(content => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(content);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
}

const server = http.createServer(requestListner)

server.listen(port, host, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server is runninh on http://${host}:${port}`);
    }
})