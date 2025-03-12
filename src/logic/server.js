require("dotenv").config({path: "../../.env"});
console.log("🔹 MONGO_URI:", process.env.MONGO_URI);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Підключення до MongoDB
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB Connected"))
	.catch((err) => console.error(err));

// Створення схеми для MongoDB
const DataSchema = new mongoose.Schema({
	id: {type: Number, required: true},
	title: {type: String, required: true},
	desc: {type: String, required: true},
});

const DataModel = mongoose.model("Data", DataSchema);

// POST Запит для отримання даних з React і збереження в MongoDB
app.post("/submit", async (req, res) => {
	try {
		const newData = new DataModel(req.body);
		console.log("📥 Received data:", req.body);
		await newData.save();
		res.status(201).json({message: "Data saved successfully!"});
	} catch (err) {
		res.status(500).json({error: err.message});
	}
});

// GET Запит для отримання даних з MongoDB
app.get("/data", async (req, res) => {
	try {
		const data = await DataModel.find();
		res.json(data);
	} catch (err) {
		res.status(500).json({error: err.message});
	}
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
