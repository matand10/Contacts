const feedbackService = require("./feedback.service")
const contactService = require("../contact/contact.service")

//CREATE
async function create(req, res) {
    try {
        const feedback = req.body
        const totalAverageRating = await feedbackService.sumAverageRatingsForContacts([feedback.contactId])

        // Updating the feedback info of the contact
        const savedContact = await contactService.updateContactFeedback(feedback, totalAverageRating)

        const newFeedback = {
            ...feedback,
            userId: req.user._id,
            contact: {
                _id: feedback.contactId,
                category: savedContact.category,
                company: savedContact.company,
                jobTitle: savedContact.jobTitle,
                img: savedContact.img
            }
        }
        delete newFeedback.contactId

        // Save the feedback in the collection
        const savedFeedback = await feedbackService.add(newFeedback)
        res.status(200).json({ status: 'ok', content: savedFeedback });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
}

//GET ALL FEEDBACKS
async function get(req, res) {
    try {
        const filterBy = req.query
        const feedbacks = await feedbackService.get(filterBy)
        res.status(200).json({ status: 'ok', content: feedbacks })
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
}

async function getUserFeedbacks(_, res) {
    try {
        const users = await feedbackService.getUserFeedbacks()
        res.status(200).json({ status: 'ok', content: users })
    } catch (error) {
        res.status(500).json({ status: 'error', message: "Server error" })
    }
}

module.exports = {
    get,
    create,
    getUserFeedbacks
}