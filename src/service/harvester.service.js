const hasher = require("object-hash");
const processingTime = require("../utils/calculateProcessingTime");
const hashTable = [];

const addInput = (input) => {
  const hash = hasher(input);
  hashTable[hash] = {
    terminated: false,
    result: null,
  };
  setTimeout(() => {
    hashTable[hash] = simulate(
      input.duty,
      input.batSOC,
      input.phIrr
    );
    console.log(`finished simulation of ${hash}`);
  }, processingTime.getProcessingTime() * 1000);
  return hash;
};

const getSimulation = (id) => {
  return hashTable[id];
};

const simulate = (duty, batteryLevel, irr) => {
  const battery = calculateSimulation(
    duty,
    batteryLevel,
    irr
  );
  const simulation = {
    terminated: true,
    result: {
      devId: "shm",
      harvId: "SolarHeavyLoad",
      batState: 0,
      batlifeh: battery.batlifeh,
      tChargeh: battery.tChargeh,
      dSOCrate: -0.938,
      date: "19-Apr-2022 23:41:47",
      simStatus: 0,
    },
  };
  return simulation;
};

const calculateSimulation = (duty, batteryLevel, irr) => {
  let battery = {
    batlifeh: -1,
    tChargeh: -1,
  };
  //console.log(`duty: ${duty}, bat: ${batteryLevel}`);
  let batSOC = (0.6279 * batteryLevel - 1.548) * 100;
  if (batSOC > 100) batSOC = 100;
  else if (batSOC < 0) batSOC = 0;

  const misteriousData = -0.424 * irr + (648 + 5.8 * duty);

  let batlifeh =
    (3250 * (batSOC / 100)) / Math.abs(misteriousData);
  /* console.log(
    `duty: ${duty}, bat: ${duty}, irr: ${irr}, batlifeh ${batlifeh}`
  ); */
  if (duty == 0) batlifeh *= 1.1;
  battery.batlifeh = batlifeh;
  return battery;
};

module.exports = {
  getSimulation,
  addInput,
};
