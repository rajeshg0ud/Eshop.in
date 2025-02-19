import mongoose from "mongoose";

const reviewsSchema= mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name:{
        type: String,
        required:true
    },
    rating: {
        type: Number,
        required:true,
        default:0
    },
    comment:{
        type: String,
        required:true
    },
},{
    timestamps:true
})

const productSchema= mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    brand:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    countInStock:{
        type: Number,
        required: true,
    },
    reviews: [reviewsSchema],
    rating:{
        type: Number,
        required: true,
        default: 0,
    },
    numOfReviews:{
        type: Number,
        required: true,
        default: 0,
    }
},{
    timestamps: true
});

const Product= mongoose.model("Product", productSchema);

export default Product;