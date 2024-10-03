const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        db = client.db("apartment_management");

        // Tạo collection nếu chưa tồn tại
        if (!(await db.listCollections({ name: "residents" }).hasNext())) {
            await db.createCollection("residents");
            console.log("Created 'residents' collection");
        }
        if (!(await db.listCollections({ name: "phananh" }).hasNext())) {
            await db.createCollection("phananh");
            console.log("Created 'phananh' collection");
        }
    } catch (error) {
        console.error("Could not connect to MongoDB", error);
        process.exit(1);
    }
}

// API để thêm cư dân mới
app.post("/api/residents", async (req, res) => {
    const { name, apartment, phone, email } = req.body;

    try {
        const result = await db
            .collection("residents")
            .insertOne({ name, apartment, phone, email });
        res.status(201).json({
            message: "Resident added successfully",
            id: result.insertedId,
        });
    } catch (error) {
        console.error("Error adding resident:", error);
        res.status(500).json({ error: "Error adding resident" });
    }
});

// API để lấy danh sách cư dân
app.get("/api/residents", async (req, res) => {
    try {
        const residents = await db.collection("residents").find().toArray();
        res.json(residents);
    } catch (error) {
        console.error("Error fetching residents:", error);
        res.status(500).json({ error: "Error fetching residents" });
    }
});

// API để thêm phản ánh mới
app.post("/api/phananh", async (req, res) => {
    const { nguoiPhanAnh, noiDung, ngayPhanAnh, phanLoai, trangThai, phanHoi } =
        req.body;

    try {
        const result = await db.collection("phananh").insertOne({
            nguoiPhanAnh,
            noiDung,
            ngayPhanAnh,
            phanLoai,
            trangThai,
            phanHoi,
        });
        res.status(201).json({
            message: "Phản ánh added successfully",
            id: result.insertedId,
        });
    } catch (error) {
        console.error("Error adding phản ánh:", error);
        res.status(500).json({ error: "Error adding phản ánh" });
    }
});

// API để lấy danh sách phản ánh
app.get("/api/phananh", async (req, res) => {
    try {
        const phanAnhs = await db.collection("phananh").find().toArray();
        res.json(phanAnhs);
    } catch (error) {
        console.error("Error fetching phản ánh:", error);
        res.status(500).json({ error: "Error fetching phản ánh" });
    }
});

// Kết nối đến database và khởi động server
connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
