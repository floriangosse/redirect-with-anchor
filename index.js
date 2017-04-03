const http = require('http');
const url = require('url');

function redirectTo (res, statusCode, url) {
    res.writeHead(statusCode, { 'Location': url });
    res.end();
};

const server = http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/redirect-to-anchor') {
        return redirectTo(res, 302, '/redirect-to-content#the-anchor');
    }

    if (pathname === '/redirect-to-content') {
        return redirectTo(res, 302, '/');
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <html>
            <head>
                <title>Title</title>
                <style>
                    #the-anchor {
                        display: none;
                    }

                    #the-anchor:target {
                        display: block;
                        font-size: 20px;
                        color: red;
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <h1 id="the-anchor">The Anchor</h1>

                Ok!
            </body>
        </html>
    `);
});


server.listen(8080);
