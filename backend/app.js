const express = require('express');
const bodyParser = require('body-parser');
const { parse } = require('plantuml-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/convert', (req, res) => {
  const code = req.body.code;
  try {
    const parsedCode = parse(code);
    if(parsedCode.length === 0)
       throw new Error('Failed to parse PlantUML code')

    res.json(parsedCode);
  } catch (error) {
    res.status(500).json({ error: 'Failed to parse PlantUML code' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});