const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

const generateText = (text) => {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

const makeText = (path) => {
  fs.readFile(path, "utf8", cb = (err, data) => {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });

}

const makeURLText = async (url) => {
  let resp;

  try {
    resp = await axios.get(url);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
  generateText(resp.data)
}

let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
}

else if (method === "url") {
  makeURLText(path);
}

else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}