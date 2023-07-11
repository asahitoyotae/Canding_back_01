const router = require("express").Router();
const message = require("./schema");

router.post("/report", async (req, res) => {
  const date = new Date(Date.now());
  try {
    const report = new message({
      email: req.body.email,
      report: req.body.message,
      dateSend: `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`,
    });

    const saveReport = await report.save();
    if (saveReport) {
      res.status(200).send({ success: true, message: "report sent" });
    } else {
      res.status(500).send({ sucess: false, message: "failed to send report" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ sucess: false, message: "failed to send report" });
  }
});

module.exports = router;
