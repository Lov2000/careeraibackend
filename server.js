const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const careerDataStore = {}; // In-memory storage (use DB in production)

// Store form data
app.post('/api/store', (req, res) => {
  const uid = uuidv4();
  careerDataStore[uid] = req.body;
  res.json({ success: true, uid });
});

// Retrieve data using UID
app.get('/api/get/:uid', (req, res) => {
  const data = careerDataStore[req.params.uid];
  if (data) {
    res.json({ success: true, data });
  } else {
    res.json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
