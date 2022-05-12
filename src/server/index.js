const express = require("express");
const cors = require("cors");

const gConfig = require("../config/conf.json");

const routesPath = "../routes";

const port = gConfig.harvester.port || 3000;

const app = express();

const processing = require("../utils/calculateProcessingTime");

module.exports.start = async () => {
  await processing.loadProcessingTimes();
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(express.json());
  //Initialize routes
  await require(routesPath)(app);
  //run server
  return await app.listen(port);
};
