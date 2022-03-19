const paypal = require('paypal-rest-sdk');
const configuration = require('./../configuration/paypalConfiguration');

paypal.configure(configuration);

exports.createPayment = async (
  servicePackage,
  paidPrice,
  returnUrl,
  cancelUrl
) => {
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: returnUrl,
      cancel_url: cancelUrl,
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: servicePackage.packageName,
              sku: '001',
              price: servicePackage.price.USD,
              currency: 'USD',
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: 'USD',
          total: paidPrice.USD,
        },
        description: servicePackage.description,
      },
    ],
  };
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      console.log(payment);
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          return payment.links[i].href;
        }
      }
    }
  });
};
exports.executePayment = async (payerId, paymentId, paidPrice) => {
  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: 'USD',
          total: paidPrice,
        },
      },
    ],
  };
  const payment = paypal.payment.execute(paymentId, execute_payment_json);
  return payment;
};
