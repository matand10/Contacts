const router = require("express").Router();
const CreditTransaction = require('../models/CreditTransaction')
const ContactTransaction = require('../models/ContactTransaction')

const creditTransactionService = require('../services/CreditTransaction.service')
const contactTransactionService = require('../services/contactTransaction.service')
const paymentService = require("../services/payment.service")
const userService = require('../services/user.service');
const { verifyToken } = require("./verifyToken");


router.post("/create", verifyToken, async (req, res) => {

  try {
    const transactions = req.body
    const userId = req.user._id

    // Process the payment for each credit
    const payments = await Promise.all(
      transactions.map(async (credit) => {
        const payment = await paymentService.processPayment(credit);
        return payment;
      })
    );

    // Checks if the payment successed
    const isPaymentCancled = payments.some(payment => !payment.success)
    if (isPaymentCancled) return res.status(402)

    // Modeling the transactions
    const creditsToSave = transactions.map(transaction => new CreditTransaction({ ...transaction }))


    // Update the credit_transaction collection for each credit
    const credits = await creditTransactionService.add(creditsToSave)


    //  Update the user's credit transaction history 
    const updatedUser = await userService.addCreditTransaction(credits, userId)
    if (!updatedUser) return res.status(401)
    res.status(200).json({ status: 'ok', content: updatedUser })
  } catch (err) {
    res.status(500)
  }
});


router.post("/contact/purchase", verifyToken, async (req, res) => {
  try {
    const { transaction, userId, type } = req.body

    // const transactionAmountInCredits = utilService.getTransactionsContactValueInCredit(transaction)

    // Checks user credits status
    const user = await userService.getById(userId)
    if (!user) return res.status(401).json({ status: 'User not found' })
    else if (user.credits < transaction.priceInCredit) return res.status(409).json({ status: 'error' })

    // Modeling the transactions
    const newTransaction = { ...transaction, type, userId }
    const contactToSave = new ContactTransaction(newTransaction)

    // Update the contact_transaction collection for each contact
    const contactTransaction = await contactTransactionService.add(contactToSave)

    //  Update the user's credit transaction history 
    const { updatedUser, status } = await userService.addContactTransaction(contactTransaction, user)
    if (status !== 'success') return res.status(401)
    res.status(200).json({ status: 'ok', content: updatedUser })
  } catch (err) {
    res.status(500).json(err)
    throw err
  }
})

router.post("/contact/remove", verifyToken, async (req, res) => {
  try {
    const { transactionId, userId, type } = req.body

    // Checks if user exists
    const user = await userService.getById(userId)
    if (!user) return res.status(401).json({ status: 'Not Authorized' })

    // Finding user transaction
    const contactTransaction = user.contactTransactions.find(trans => {
      return trans._id.toString() === transactionId
    })

    if (!contactTransaction) return res.status(404).json('You do not own this contact')

    // Removing the contact purchase from the table
    await contactTransactionService.remove(contactTransaction._id)

    // Update the user's credit transaction history 
    await userService.removeContactTransaction(contactTransaction, user)
    res.status(200).json({ status: 'ok' })
  } catch (err) {
    res.status(500).json(err)
    throw err
  }
})


module.exports = router;