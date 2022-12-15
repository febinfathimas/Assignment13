
const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
const port=3000;

//config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to mongodb
mongoose.connect(`mongodb+srv://user:crud@crudeapp13.yzopse7.newitemsDB.net/?retryWrites=true&w=majority`)

//data schema
const itemSchema = {
        name: String,
        category: String,
        price: String,
        instock: String
      }
//data model
const Item=mongoose.model("Item", itemSchema);

//read all items
app.get('/items', (req, res) => {
        Item.find()
        .then((items)=>res.json(items))
        .catch((err)=>res.status(400).json("ERROR: " + err));
      });

//create new item
app.post('/newitem', (req, res) => {
        const newItem= new Item(
          newname=req.body.name,
          category=req.body.category,
          price=req.body.price,
          instock=req.body.instock
        );
        newItem.save()
        .then(item => console.log(item))
        .catch((err)=>res.status(400).json("ERROR: " + err));
      });

//delete route
app.delete("/delete/:id", (req, res) => {
        const id = req.params.id;

Item.findByIdAndDelete({ _id: id }, (req, res, err) => {
    if (!err) {
      console.log("Item deleted");
    } else {
      console.log(err);
    }
  });
});

//update route
app.put("/put/:id", (req, res) => {
      const updatedItem = {
        newname:req.body.title,
        category:req.body.category,
        price:req.body.price,
        instock:req.body.instock
        };

  Item.findByIdAndUpdate(
          { _id: req.params.id },
          { $set: updatedItem },
          (req, res, err) => {
            if (!err) {
              console.log("Item updated");
            } else {
              console.log(err);
            }
          }
        );
      });


app.listen(port, function() {
  console.log('express-server is running on port 3000')
})







/*app.use(bodyParser.urlencoded({ extended: true }))
const URL = `mongodb+srv://user:crud@crudeapp13.yzopse7.mongodb.net/?retryWrites=true&w=majority`



  app.get('/', (req, res) => {
    res.sendFile('C:/SDSU-Projects/CS648/Assignment13/index.html')
  })

  app.post('/products', (req, res) => {
    productCollection.insertOne(req.body)})

  MongoClient.connect(URL,{ useUnifiedTopology: true, useNewUrlParser: true },(err)=>{
    if (err) return console.error(err)
    console.log('mongodb database connected successfully',err)
    const db = client.db('mydatabase')
    const productCollection = db.collection('products')*/
    //app.use(/* ... */)
    //app.get(/* ... */)
    //app.post(/* ... */)
   // app.listen(/* ... */)
 // }); 
  
  