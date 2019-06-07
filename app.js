var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Book = require("./Book.model")
var port = 80;
var db = 'mongodb://127.0.0.1:27017/example';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect(db,{useNewUrlParser: true});

mongoose.connection.on('connected',()=>{
    console.log('Mongoose Connected SuccessFully');
})

mongoose.connection.on('error',(err)=>{
    console.log('Error in Connection Mongoose',err);
});

app.get('/',function(req,res){
    res.send("Welcome to my website");
});

// Fetching All Books
app.get('/books',(req,res)=>{
    console.log("Fetching Books");
    Book.find({})
    .exec((err,books)=>{
        if(err){
            console.log('Error in fetching books',err)
        }else{
            res.json(books);
        }
    });    
});

//For Fetching Based on ID
app.get('/books/:id',(req,res)=>{
    Book.findById({
        _id : req.params.id
    }).exec((err,books)=>{
        if(err){
            console.log("Error in Fetching");
        }else{
            res.json(books);
        }
    })
});

//For Inserting
app.post('/insert',(req,res)=>{
    Book.create(req.body,function(err,book){
        if(err){
            console.log('Error in Insertion');
        }else{
            console.log('Inserted');
            res.send(book);
        }
    })
});

app.listen(port,function(){
    console.log("App Listening on " + port);
});