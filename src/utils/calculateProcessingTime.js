const fs = require("fs");
const path = require("path");
let processingTime = [];

const file = path.resolve(
  __dirname,
  "../../assets/processingTime.csv"
);
const loadProcessingTimes = async () => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) return;
    const lines = data.split("\n");
    processingTime = lines.map((line) => Number.parseFloat(line));
  });
};

const getProcessingTime = () => {
  const randomPosition = Math.floor(
    Math.random() * (processingTime.length - 1)
  );
 console.log("sleeping for " + processingTime[randomPosition] + "s");
  return processingTime[randomPosition];
};

module.exports = {
  getProcessingTime,
  loadProcessingTimes,
};
