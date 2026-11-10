const express = require('express');
const connectDatabase = require('./config/db');
const komikRoutes = require('./routes/komikroutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(komikRoutes);

async function startServer() {
    await connectDatabase();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    });
}

startServer().catch((error) => {
    console.error('Unable to start the server:', error.message);
    process.exitCode = 1;
});
