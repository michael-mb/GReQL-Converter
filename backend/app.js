const express = require('express');
const bodyParser = require('body-parser');
const { parse } = require('plantuml-parser');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

app.post('/convert', (req, res) => {
  const plantUMLCode = req.body.code;
  try {
    const parsedJSON = parse(plantUMLCode);
    if(parsedJSON.length === 0)
      res.status(500).json({ error: 'Failed to parse PlantUML code' });

    res.json(parsedJSON);
  } catch (error) {
    res.status(500).json({ error: 'Failed to parse PlantUML code' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});