const countryService = require("./country.service")

//CREATE
async function create(req, res) {
    try {
        const credit = req.body
        const savedCredit = await countryService.add(credit)
        res.status(200).json({ status: 'ok', content: savedCredit });
    } catch (err) {
        res.status(500).json(err);
    }
}

// //UPDATE
async function update(req, res) {
    try {
        const credit = req.body
        await countryService.update(credit)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

// //DELETE
async function remove(req, res) {
    try {
        const { id } = req.body
        await countryService.remove(id)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET ALL
async function getCountry(req, res) {
    try {
        const countries = await countryService.query()
        res.status(200).json({ status: 'ok', content: countries })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}
module.exports = {
    getCountry,
    remove,
    create,
    update
};