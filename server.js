const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// CONNECT DB
mongoose.connect("mongodb://127.0.0.1:27017/reviewsDB");

// SCHEMA
const reviewSchema = new mongoose.Schema({
    name: String,
    email: String,
    ratings: Object,
    messages: String
});

const Review = mongoose.model("Review", reviewSchema);

// API: Save data
app.post("/submit", async (req, res) => {
    const data = new Review(req.body);
    await data.save();
    res.send("Saved");
});

// API: Get all
app.get("/reviews", async (req, res) => {
    const data = await Review.find();
    res.json(data);
});

app.listen(3000, () => console.log("Server running on port 3000"));