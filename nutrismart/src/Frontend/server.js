const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.json());

const accountSid = "your_twilio_account_sid"; // Your Twilio account SID
const authToken = "your_twilio_auth_token"; // Your Twilio Auth Token
const client = twilio(accountSid, authToken);

app.post("/send-code", (req, res) => {
  const { phoneNumber, code } = req.body;

  client.messages
    .create({
      body: `Your verification code is ${code}`,
      from: "your_twilio_phone_number", // Your Twilio phone number
      to: phoneNumber,
    })
    .then((message) =>
      res.status(200).send({ success: true, messageSid: message.sid }),
    )
    .catch((error) =>
      res.status(500).send({ success: false, error: error.message }),
    );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
