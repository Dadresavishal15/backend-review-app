const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas connection
mongoose.connect("mongodb+srv://vishal:Vi9569@cluster0.pudps7l.mongodb.net/?appName=Cluster0")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("MongoDB Error ❌", err));

// Schema
const reviewSchema = new mongoose.Schema({
    name: String,
    email: String,
    ratings: Object,
    messages: String
});

const Review = mongoose.model("Review", reviewSchema);

// Routes
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

app.post("/submit", async (req, res) => {
    const data = new Review(req.body);
    await data.save();
    res.json({ message: "Saved" });
});

app.get("/reviews", async (req, res) => {
    const data = await Review.find();
    res.json(data);
});

// ✅ IMPORTANT PORT FIX
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});