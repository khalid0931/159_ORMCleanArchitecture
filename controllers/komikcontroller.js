const db = require('../models');

async function getAllKomik(req, res) {
    try {
        const komik = await db.Komik.findAll();
        res.status(200).json(komik);
    } catch (error) {
        console.error('Error retrieving komik:', error.message);
        res.status(500).json({ error: 'An error occured while retrieving komik.' });
    }
}