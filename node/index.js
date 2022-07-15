const http = require('http')

const server = http.createServer((req, res)=>{
    res.write('Hello world');
    res.end();
})
server.listen(8081, 'localhost', ()=>{
    console.log('run')
})
