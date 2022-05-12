const harvesterService = require("../service/harvester.service");

exports.simulationPost = async (req, res) => {
  if (!req.body.harvId) {
    res
      .status(400)
      .send({ message: "Content can not be empty!" });
    return;
  }
  try {
    const { devId, ...simulation } = req.body;
    const hashData = harvesterService.addInput(simulation);
    const job = {
      jobId: hashData,
    };
    res.status(200).send(job);
  } catch (err) {
    res.status(503).send({ error: err });
  }
};

exports.simulationGet = async (req, res) => {
  const id = req.params.id;
  try {
    const output = harvesterService.getSimulation(id);
    res.status(200).send(output);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: `Error retriving simulation ${id}`,
    });
  }
};
