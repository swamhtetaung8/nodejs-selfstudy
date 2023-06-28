const fs = require("fs");
const http = require("http");
const url = require("url");

// fs.readFile('txt/final.txt','utf-8',(err,data)=>{
//   console.log(data)
// })

// console.log('Reading file')

// setTimeout(() => {
//   console.log('This is time out')
// }, 3000);

const replaceTemp = (temp,product)=> {
  let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
  output = output.replace(/{%ID%}/g,product.id);
  output = output.replace(/{%IMAGE%}/g,product.image);
  output = output.replace(/{%FROM%}/g,product.from);
  output = output.replace(/{%PRICE%}/g,product.price);
  output = output.replace(/{%DESCRIPTION%}/g,product.description);
  output = output.replace(/{%QUANTITY%}/g,product.quantity);
  output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);

  if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');

  return output;
}

const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");
const productData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productDataObj = JSON.parse(productData);

const server = http.createServer((req, res) => {
  const path = req.url;
  const {query,pathname} = url.parse(path,true);
  switch (pathname) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      const cards = productDataObj.map(el=> replaceTemp(tempCard,el)).join('');
      const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g,cards);
      res.end(output);
      break;
    case "/api":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(productData);
      break;
    case "/product":
      res.writeHead(200, { "Content-Type": "text/html" });
      const product = productDataObj[query.id];
      const productOutput = replaceTemp(tempProduct,product);
      res.end(productOutput);
      break;
    default:
      res.writeHead(404);
      res.end("Page not found");
      break;
  }
});

server.listen(8080, "localhost", () => {
  console.log("Server listening on port 8080");
});
