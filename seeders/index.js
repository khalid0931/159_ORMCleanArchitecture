require('dotenv').config();
const express = require('express');
const connectDatabase = require('./config/db');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', require('./routes/komikroutes'));

async function startServer() {
    await connectDatabase();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer();