const fs = require("fs");

//Synchronous blocking
// const text = fs.readFileSync("txt/test.txt", "utf-8");
// console.log(text);

//Synchronous blocking
// const textOutput = `This is output text from js file, ${text}.\n Created on ${Date.now()}`;
// fs.writeFileSync("txt/test2.txt", textOutput);

//Asycn non-blocking
fs.readFile("txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.writeFile("txt/final.txt", data2, (err) => {
      console.log("File has been written");
    });
  });
});
console.log("Reading");
