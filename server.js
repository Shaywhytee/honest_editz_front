const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use(express.static(__dirname + '/dist/'));
app.get(/.*/, function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});