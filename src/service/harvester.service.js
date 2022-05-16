const hasher = require("object-hash");
const processingTime = require("../utils/calculateProcessingTime");
const hashTable = [];

const addInput = (input) => {
  const hash = hasher(input);
  hashTable[hash] = {
    terminated: false,
    result: null,
  };
  if (input.isCache) {
    hashTable[hash] = simulate(
      input.duty,
      input.batSOC,
      input.phIrr
    );
    console.log(`finished CACHED simulation of ${hash}`);
  } else
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

const calculateSimulation = (duty, batSOC, irr) => {
  let battery = {
    batlifeh: -1,
    tChargeh: -1,
  };
  //const misteriousData = -0.424 * irr + (648 + 5.8 * duty);
  //* Update values to increase battery lifetime to a week
  const misteriousData = -0.03 * irr - (5.068 + 0.15* duty);
  let batlifeh =
    (3250 * (batSOC / 100)) / Math.abs(misteriousData);
  if (duty == 0) batlifeh *= 1.1;
  battery.batlifeh = batlifeh;
  return battery;
};





module.exports = {
  getSimulation,
  addInput,
};
