// config inicial
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const Person = require('./models/Person')
// forma de ler json => utilizar middlewares

app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// rota inicial / endpoint
app.get('/', (req,res)=>{
    //mostrar requisicao
    res.json({message: 'oi express!'})
})
//Entregar uma porta
const DB_USER = 'Geovanne'
const DB_PASSWORD = encodeURIComponent('tTFSruO7sWvTSOnN')
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.3ss4n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
)
.then(()=>{
    console.log('Conectamos o DB!')
    app.listen(3000)
})
.catch((err)=>{
    console.log(err)
})

