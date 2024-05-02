const http = require('http');
const fs = require('fs');

let votes = {
    yes: 0,
    no: 0
};

const server = http.createServer((req, res) => {
    if (req.url === '/votes') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        setInterval(() => {
            res.write(`data: ${JSON.stringify(votes)}\n\n`);
        }, 1000);
    } else if (req.url === '/vote-yes') {
        votes.yes++;
    } else if (req.url === '/vote-no') {
        votes.no++;
    }

    res.end();
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
