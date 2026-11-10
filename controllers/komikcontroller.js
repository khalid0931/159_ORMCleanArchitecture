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

async function getKomikbyId(req, res) {
    const { id } = req.params;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found.' });
        }
        res.status(200).json(komik);
    } catch (error) {
        console.error('Error retrieving komik:', error.message);
        res.status(500).json({ error: 'An error occurred while retrieving komik.' });
    }
}

async function createKomik(req, res) {
    const { title, description, author } = req.body;
    try {
        const newKomik = await db.Komik.create({ title, description, author });
        res.status(201).json(newKomik);
    } catch (error) {
        console.error('Error creating komik:', error.message);
        res.status(500).json({ error: 'An error occurred while creating komik.' });
    }
}

async function updateKomik(req, res) {
    const { id } = req.params;
    const { title, description, author } = req.body;

    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found.' });
        }
        komik.title = title;
        komik.description = description;
        komik.author = author;
        await komik.save();
        res.status(200).json(komik);
    } catch (error) {
        console.error('Error updating komik:', error.message);
        res.status(500).json({ error: 'An error occurred while updating komik.' });
    }
}

async function deleteKomik(req, res) {
    const { id } = req.params;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found.' });
        }
        await komik.destroy();
        res.status(200).json({ message: 'Komik deleted successfully.' });
    } catch (error) {
        console.error('Error deleting komik:', error.message);
        res.status(500).json({ error: 'An error occurred while deleting komik.' });
    }
}

module.exports = {
    getAllKomik,
    getKomikbyId,
    createKomik,
    updateKomik,
    deleteKomik
};
