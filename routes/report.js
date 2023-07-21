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
    html: `<html>
        <body>
          <div style="padding: 3rem; width: 50%; margin: 50px auto; border: 1px solid black; border-radius: 15px;">
            <h1 style="text-align: center">Canding - chatBot</h1>
            <p style="text-align: center; color: gray; font-size: 1rem; font-weight: bold">
             user email: ${req.body.email}
            </p>
            <p style="text-align: center; color: gray; font-size: 1rem; font-weight: bold">
             user feedback: ${req.body.message}
            </p>
            <p style="color: gray; text-align: center;">
              I am receving this message because someone reported and issue or giving a feedback
            </p>
          </div>
        </body>
      </html>`,
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
          console.log(info);
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
