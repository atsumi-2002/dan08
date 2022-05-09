const express = require('express');
const app = express();
app.listen(3000, () => {
    console.log('Servidor en Puerto 3000');
});
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { send } = require('express/lib/response');
const url = require('url'); 
const http = require('http')
const server = http.createServer(app)

const {Server} = require('socket.io')
const io = new Server(server)


const initDB = require('./config/db');
const modelProduct = require('./models/product');

initDB();

app.use(express.static("public")); 

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    modelProduct.find()
        .then(async (products) =>  {
            await 
            console.log(products)
            res.render('index',{products:products});
        })
        .catch((error) => {
            console.log('Error en Login: ' + error);  
        });
});

app.get('/newP', (req, res) => {
    res.render('addProduct');
});

app.post('/addP', (req, res) => {

    const data = req.body;

    modelProduct.create(data, (err, docs) =>{
        if(err){
            console.log('Error ', err);
        }else{
            console.log({data:docs});
            res.redirect(url.format({
                pathname:"/",
                query: {
                "notif": 'registerSuccess'
                }
            }));
        }
        
    })
});

app.get('/product/:id', (req, res) => {
    res.redirect(url.format({
        pathname:"/productUpdate",
        query: {
        "id": req.params.id
        }
    }));
});

app.get('/productUpdate', (req, res) => {
    connection.query(`SELECT * FROM historias WHERE id = ${req.query.id}`, function(err, row, field) {
        if (err) throw err;
        res.render('updateStory',{story:row[0]});
    })
});

app.post('/updateS', (req, res) => {
    connection.query(`UPDATE historias SET titulo = '${req.body.titulo}', autor = '${req.body.autor}', texto = '${req.body.texto}' WHERE id = ${req.body.id}`), function(err, rows, field) {
        if (err) throw err;
        console.log(req.body);
    }
    res.redirect(url.format({
        pathname:"/menu",
        query: {
            "notif": 'UserUpdateSuccess'
        }
    }));
});

app.post('/deleteP/:id', (req, res) => {
    var sql = `DELETE FROM historias WHERE id = ${req.params.id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(objS);
        res.redirect(url.format({
        pathname:"/menu",
        query: {
        }
    }));
    });
});