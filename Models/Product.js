const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = Schema({
    Name : String,
    Price : Number,
    Quantity : Number
});
const Product = mongoose.model("Products",productSchema);

module.exports=Product;