const server = require("./server");

server
  .start()
  .then((res) => {
    console.info(`Emulated DrHarvester started`);
  })
  .catch((err) => {
    console.error(err);
  });
