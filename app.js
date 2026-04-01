console.log("App started");

const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;
const verifyToken = "vibecode"; // keep simple for now

// ✅ VERIFY ROUTE
app.get('/webhook', (req, res) => {
  console.log("GET webhook hit");

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    return res.status(200).send(challenge);
  } else {
    return res.sendStatus(403);
  }
});

// ✅ RECEIVE MESSAGES
app.post('/webhook', (req, res) => {
  console.log("POST webhook hit");
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
