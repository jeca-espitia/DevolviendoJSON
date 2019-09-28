var express = require('express');
var mongoose = require("mongoose");
var app = express();


app.use(express.urlencoded());
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
}, {
    timestamps: true
});
var Products = mongoose.model("Products", productsSchema);

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error", function (e) { console.error(e); });

app.post('/register', (req, res) => {
    var parametros = {
    name: req.body.name,
    price: req.body.price,
    }
    Products.create(parametros, function (err) {
    if (err) return console.error(err);
    res.send("<h1>El producto fue agregado con Éxito</h1>"+'<p><a href="http://localhost:3000/register"> Registrar otro Producto </a></p>');
    });
});

app.get('/register', (req, res) => {
    var formulario = '<form action="/register" method="post" style="width:100px">' +
        '<label for="name"> Name </label> <input type="text" id="name" name="name">' +
        '<label for="price"> Price </label><input type="text" id="price" name="price">' +
        '<button type="submit">Registrar</button>' +
        '</form>'
    res.send(formulario);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/products', async (req, res) => {
    const products = await Products.find({});
    res.setHeader("Content-Type", "application/json");
    res.json(products);
});
  

app.listen(3000, () => console.log('Listening on port 3000!'));