const express = require('express'); // backend framework
const cors = require('cors');  

const app = express();
const port = 3000;

let coordinatesArr = [];

app.use(
    express.urlencoded({ 
        extented: true,
    })
)

app.use(express.json({ 
    type: "*/*"
}))

app.use(cors());





app.get('/api', (req, res) => {
    res.send(JSON.stringify(coordinatesArr));
})

app.post('/api', (req, res) => {
    let coordinates = req.body;
    coordinatesArr.push(coordinates);
    res.send(JSON.stringify('coordenadas guardadas'));
    console.log(coordinatesArr);
})


app.listen(port, () => {
    console.log(`Estoy ejecutandome en http://localhost:${port}`);
});