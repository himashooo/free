const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Upload folder setup
const upload = multer({ dest: 'uploads/' });

// Submit form route
app.post('/register', upload.single('screenshot'), async (req, res) => {
  const { uid, playerName } = req.body;
  const screenshot = req.file ? req.file.filename : '';

  const newEntry = { uid, playerName, screenshot };

  let data = [];
  if (fs.existsSync('data.json')) {
    data = await fs.readJson('data.json');
  }
  data.push(newEntry);
  await fs.writeJson('data.json', data);

  res.redirect('/success.html');
});

// Admin login page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// API to get uploaded users
app.get('/api/data', (req, res) => {
  const password = req.query.password;

  if (password !== 'admin123') {
    return res.status(403).send('Unauthorized');
  }

  if (fs.existsSync('data.json')) {
    const data = fs.readJsonSync('data.json');
    res.json(data);
  } else {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

