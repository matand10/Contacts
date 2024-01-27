const companyService = require("./company.service")

//CREATE
async function create(req, res) {
    try {
        const payload = req.body
        if (!payload.company || !payload.category) return res.status(422).json({ status: 'error', message: 'One of the fields are missing' })
        const savedCompany = await companyService.add(payload)
        res.status(200).json({ status: 'ok', content: savedCompany });
    } catch (err) {
        res.status(500).json(err);
    }
}

// //UPDATE
async function update(req, res) {
    try {
        const { company } = req.body
        await companyService.update(company)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

// //DELETE
async function remove(req, res) {
    try {
        const { id } = req.body
        await companyService.remove(id)
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET ALL COMPANIES
async function getCompanies(req, res) {
    try {
        const companies = await companyService.get()
        res.status(200).json({ status: 'ok', content: companies })
    } catch (err) {
        res.status(500).json(err);
        throw err
    }
}

module.exports = {
    getCompanies,
    remove,
    update,
    create,
};