const { name } = require('ejs');
const express = require('express');
const path = require('path')

const app = express();
const port = 8000;


app.set('view engine', 'ejs');
app.set('views', './views')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/api', (req, res) => {

  const jsonData = req.body;
  // console.log('JSONDATA-----',jsonData.json)
  const data = jsonData.json

//   const dataSTring = jsonData.json.require(/\\r\\n/g, '\n');
//   const dataSend = JSON.parse(dataSTring)

const modifiedString = data.replace(/\r\n/g, '');
const jsObject = JSON.parse(modifiedString);

// res.json(jsObject);                         // Before rendeering just sending data as it is

//Omplementing advance HTML By Using EJS
for(let key in jsObject) {
  console.log(key);
  let neme = jsObject.name
  return res.render('get_result', {
    key: key,
    jsObject
 })
}

});

app.listen(port, (err) => {
    if(err) {
        console.log('An error occured while running the server!!')
    }
  console.log(`Server is up and running on port :: ${port}`);
});