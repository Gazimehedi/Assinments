let http = require('http');
let fs = require('fs');

let server = http.createServer(function(req,res){
    if(req.url=='/'){
        const data = fs.readFileSync('home.html','utf8'); 
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(data);
        res.end();
    }
    else if(req.url == '/about'){
        const data = fs.readFileSync('about.html','utf8'); 
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(data);
        res.end();
    }
    else if(req.url == '/contact'){
        const data = fs.readFileSync('contact.html','utf8'); 
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(data);
        res.end();
    }
    else if(req.url == '/terms'){
        const data = fs.readFileSync('terms.html','utf8'); 
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write(data);
        res.end();
    }
});

server.listen(8080,function(){
    console.log('server run at 8080');
});