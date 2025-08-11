// Placeholder for Orange Money API integration
// When merchant account is ready, replace this with actual API calls.

async function initiatePayment(amount, phoneNumber, reference) {
  console.log(`Simulating payment: ${amount} to ${phoneNumber} [Ref: ${reference}]`);
  return {
    status: 'pending',
    transactionId: 'SIMULATED_TX_' + Date.now()
  };
}

async function checkPaymentStatus(transactionId) {
  console.log(`Checking status for transaction: ${transactionId}`);
  return {
    status: 'success'
  };
}

module.exports = { initiatePayment, checkPaymentStatus };
