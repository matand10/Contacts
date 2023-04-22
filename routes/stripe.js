const router = require("express").Router();
const CreditTransaction = require('../models/CreditTransaction')
const ContactTransaction = require('../models/ContactTransaction')

const creditTransactionService = require('../services/CreditTransaction.service')
const contactTransactionService = require('../services/contactTransaction.service')
const paymentService = require("../services/payment.service")
const userService = require('../services/user.service')
const utilService = require('../services/util.service')


router.post("/create", async (req, res) => {

  try {
    const transactions = req.body

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
    const { updatedUser, status } = await userService.addCreditTransaction(credits)
    if (status !== 'success') return res.status(401)
    res.status(200).json({ status: 'ok', content: updatedUser })
  } catch (err) {
    res.status(500)
  }
});


router.post("/contact/purchase", async (req, res) => {
  try {
    const { transaction, userId } = req.body

    const transactionAmountInCredits = utilService.getTransactionsContactValueInCredit(transaction)

    // Checks user credits status
    const user = await userService.getById(userId)
    if (!user) return res.status(401).json({ status: 'User not found' })
    else if (user.credits < transactionAmountInCredits) return res.status(409).json({ status: 'error' })

    // Modeling the transactions
    const contactToSave = new ContactTransaction({ ...transaction })

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

module.exports = router;


// router.post("/contact/purchase", async (req, res) => {
//   try {
//     const { transaction, userId } = JSON.parse(req.body.data)

//     console.log(transaction)

//     const transactionAmountInCredits = utilService.getTransactionsContactValueInCredit(transaction)

//     // Checks user credits status
//     const user = await userService.getById(userId)
//     if (!user) return res.status(401).json({ status: 'User not found' })
//     else if (user.credits < transactionAmountInCredits) return res.status(409).json({ status: 'error' })

//     // Modeling the transactions
//     const contactsToSave = transactions.map(transaction => new ContactTransaction({ ...transaction }))

//     // Update the contact_transaction collection for each contact
//     const contactTransactions = await contactTransactionService.add(contactsToSave)

//     //  Update the user's credit transaction history
//     const { updatedUser, status } = await userService.addContactTransaction(contactTransactions, user)
//     if (status !== 'success') return res.status(401)
//     res.status(200).json({ status: 'ok', content: updatedUser })
//   } catch (err) {
//     res.status(500).json(err)
//     throw err
//   }
// })