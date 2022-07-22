let express = require('express');
let app = express();
let dotenv = require('dotenv');
let morgan = require('morgan');
dotenv.config();
let port = process.env.PORT || 9870;
let mongo = require('mongodb');
let cors = require('cors')
let MongoClient = mongo.MongoClient;
let bodyParsel = require('body-parser')
const mongoUrl = 'mongodb+srv://trial321:trial321@atlascluster.kpsc2.mongodb.net/LensData?retryWrites=true&w=majority';
let db;

app.use(morgan('common'))
app.use(bodyParsel.urlencoded({extended:true}));
app.use(bodyParsel.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send('Greeting from Express');
})

app.get('/category',(req,res)=>{
    db.collection('category').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.get('/size',(req,res)=>{
    db.collection('size').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


// app.get('/products',(req,res)=>{
//     let {Category_Id} = req.query
//     db.collection('products').find({categories_id:Number(Category_Id)}).toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//     })
// })

app.get('/products',(req,res)=>{
    let query = {}
    let Category_Id = Number(req.query.Category_Id);
    let Size_Id = Number(req.query.Size_Id);
    if(Category_Id){
        query = {categories_id:Category_Id}
    }else if(Size_Id){
        query = {size_id:Size_Id}
    }else{
        query = {}
    }
    db.collection('products').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.get(`/filter/:Category_Id`,(req,res)=>{
    let query = {}
    let sort = {Price:1}
    let Category_Id = Number(req.params.Category_Id);
    let Size_Id = Number(req.query.Size_Id);
    let low = Number(req.query.low);
    let high = Number(req.query.high);
    
    if(req.query.sort){
        sort={Price:req.query.sort}
    }
    if(Size_Id && low && high){
        query = {
            categories_id:Category_Id,
            size_id:Size_Id,
            $and:[{Price:{$gt:low,$lt:high}}]
        }
    }
    else if(Size_Id){
        query = {
            categories_id:Category_Id,
            size_id:Size_Id}
    }else if(low && high){
        query = {
            categories_id:Category_Id,
            $and:[{Price:{$gt:low,$lt:high}}]
        }
    }
    else{
        query = {
            categories_id:Category_Id
        }
    }
    db.collection('products').find(query).sort(sort).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

app.get('/details/:id', (req, res) => {
    // let id = mongo.ObjectId(req.params.id)
    let id = Number(req.params.id)
    db.collection('products').find({product_id:id}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })

})

app.post('/select',(req,res) => {
    if(Array.isArray(req.body.id)){
        db.collection('products').find({product_id:{$in:req.body.id}}).toArray((err,result) => {
            if(err) throw err;
            res.send(result)
        })
    }else{
        res.send('Invalid Input')
    }
})

app.post('/placeOrder',(req,res) =>{
    db.collection('orders').insert(req.body, (err,result) => {
        if(err) throw err;
        res.send('Order Placed')

    })
})


// create connection with db
MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log(`Error While Connecting`);
    db = client.db('LensData')
    app.listen(port,() => {
        console.log(`listening on port ${port}`);
    })
})

