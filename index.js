const express = require ("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port =3000;
const Product = require("./Models/Product.js")

mongoose.connect ("mongodb://AhmedRagheb:Ahmed072001@ac-anvs4ap-shard-00-00.cm7ixic.mongodb.net:27017,ac-anvs4ap-shard-00-01.cm7ixic.mongodb.net:27017,ac-anvs4ap-shard-00-02.cm7ixic.mongodb.net:27017/InventoryManagementSystem?ssl=true&replicaSet=atlas-kds3i0-shard-0&authSource=admin&appName=Cluster1")
.then(()=>{
    console.log("Connected Sucessfully");
    app.listen(port,() =>{
        console.log(`I am listening now on port ${port}`);
    })
})
.catch((error) =>{
    console.log("Connection Error : ",error);
})

/*These are the endpoints of the project : */

//To get the Home page 

app.get("/",(req,res) => {
    res.sendFile(__dirname+"/Views/Home.html");
})

app.get("/addProduct",(req,res) =>{
    res.sendFile(__dirname+"/Views/addProduct.html");
});

app.post("/addProduct" ,async(req,res) =>{
    try{
        const newProduct = new Product();
        newProduct.Name = req.body.Name;
        newProduct.Price = req.body.Price;
        newProduct.Quantity  =req.body.Quantity;
        await newProduct.save();
        res.status(200).json(newProduct);
    }
    catch(error)
    {
        console.log(error);
        res.json({message : "The product didnot added"});
    }
});

//This is the endpoint to get all the products 
app.get("/allTheProducts" , async (req,res) =>{
    try{
        const products = await Product.find();
    res.render("allTheProducts.ejs",{
        products : products
    });
    }
    catch(error)
    {
        res.status(400).json({message: error})
    }
});

app.get("/getProduct/:productId",async (req,res) =>{
    try{
        const ID = req.params.productId;
        const product = await Product.findById(ID);
        if(!product)
        {
            return res.status(404).send("The product is not found!");
        }
        res.status(200).render("specificProduct.ejs",{product: product});
    }catch(error)
    {
        console.log("The error : ",error);
        res.status(400).json({message:"Invalid Product ID!"})
    }
})