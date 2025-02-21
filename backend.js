const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for frontend requests

app.get("/bfhl", (req, res) => {
    var ansobj={
        "operation_code":1
    }
    res.status(200).send(ansobj)
})

app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ error: "Invalid input. Expected 'data' as an array." });
        }

        if (data.length === 0) {
            return res.status(400).json({ error: "Data array cannot be empty." });
        }

        // Separate numbers and alphabets
        const alphabets = data.filter(item => /^[a-zA-Z]+$/.test(item));
        const numbers = data.filter(item => /^[0-9]+$/.test(item)).map(Number);
        
        // Find the highest alphabet (case insensitive)
        const highestAlphabet = alphabets.length > 0 
            ? alphabets.reduce((a, b) => (a.toLowerCase() > b.toLowerCase() ? a : b)) 
            : null;

        res.json({
            success: true,
            alphabets,
            numbers,
            highest_alphabet: highestAlphabet
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
