// const fs = require('fs')

// fs.readFile('txt/final.txt','utf-8',(err,data)=>{
//   console.log(data)
// })

// console.log('Reading file')

// setTimeout(() => {
//   console.log('This is time out')
// }, 3000);

const http = require('http');
const url = require('url');
const server = http.createServer((req,res)=>{
  const path = req.url;
  console.log(path)
  switch(path){
    case "/" :
      res.end('Overview')
      break;
    case "/overview":
      res.end('Overview')
      break;
    case "/product":
      res.end('Product page')
      break;
    default:
      res.writeHead(404)  
      res.end('Page not found')
      break;
  }
})

server.listen(8080,'localhost',()=>{
  console.log('Server listening on port 8080')
});
