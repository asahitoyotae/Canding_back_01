const router = require("express").Router();
const message = require("./schema");
const nodemailer = require("nodemailer");

router.post("/report", async (req, res) => {
  const date = new Date(Date.now());

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {
      user: "asahitoyotae@gmail.com",
      pass: process.env.EMAIL_SECRET,
    },
  });

  const mailOptions = {
    from: "asahitoyotae@gmail.com",
    to: "asahitoyotae@gmail.com",
    subject: "Canding_REPORTS/FEEDBACK",
    html: `<div><p>email: ${req.body.email}</p><p>message: ${req.body.message}</p></div>`,
  };

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
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res
            .status(500)
            .send({ sucess: false, message: "failed to send report" });
        } else {
          res.status(200).send({ success: true, message: "report sent" });
        }
      });
    } else {
      res.status(500).send({ sucess: false, message: "failed to send report" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ sucess: false, message: "failed to send report" });
  }
});

module.exports = router;
