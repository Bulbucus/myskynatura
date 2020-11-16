const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { urlencoded, json } = require('body-parser');
const app = express();

app.use(cors());
//app.use(urlencoded({extended:true}))
app.use(json())


app.get('/',(req, res) => {
  res.json({
    message:"API"
  })
})

app.post('/', (req, res) => {
  console.log(req.body);
})

app.use((req, res) => {
  res.status(404);
  res.send({message: 'Nothing to see were'})
} )

app.listen(8888, () => {
  console.log('Server is up');
})
