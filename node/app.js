// from https://stripe.com/docs/payments/cards/saving-cards-after-payment#create-payment-intent
(async () => {
  const intent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    setup_future_usage: 'off_session',
  });
})();

// attach new payment to customer https://stripe.com/docs/billing/subscriptions/payment#failure-2

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

stripe.customers.update(
  'cus_4fdAW5ftNQow1a',
  source: 'tok_mastercard',
    function(err, customer) {
    // asynchronously called
  }
);

// reattempt payment 
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

stripe.invoices.pay({
  invoice: 'in_EmGqfJMYy3Nt9M',
  expand: ['payment_intent'],
}, function(err, invoice) {
    // asynchronously called
  }
);

// FIGURE OUT THIS AND STEP 3 https://stripe.com/docs/payments/cards/saving-cards-after-payment#submit-payment


// attach payment to customer after success https://stripe.com/docs/payments/cards/saving-cards-after-payment#save-payment-method
// This creates a new Customer and attaches the PaymentMethod in one API call.
const customer = await stripe.customers.create({
  payment_method: intent.payment_method,
});
// If you have an existing Customer, you can attach the PaymentMethod to that object instead.
const paymentMethod = await stripe.paymentMethods.attach(
  intent.payment_method,
  {
    customer: '{{CUSTOMER_ID}}',
  }
);

// Create customer https://stripe.com/docs/billing/subscriptions/payment#signup-3
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

stripe.customers.create({
  email: 'jenny.rosen@example.com',
  source: 'tok_visa',
}, function(err, customer) {
  // asynchronously called
});

//Create subscription and attempt payment 
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

stripe.subscriptions.create({
  customer: 'cus_4fdAW5ftNQow1a',
  items: [
    {
      plan: 'plan_CBXbz9i7AIOTzr',
    },
  ],
  expand: ['latest_invoice.payment_intent'],
}, function(err, subscription) {
    // asynchronously called
  }
);

// create payment intent https://stripe.com/docs/payments/cards/saving-cards-after-payment
(async () => {
  const intent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    setup_future_usage: 'off_session',
  });
})();

// create payment intent on server https://stripe.com/docs/payments/cards/charging-saved-cards#create-payment-intent

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

(async () => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    customer: '{{CUSTOMER_ID}}',
    payment_method: '{{PAYMENT_METHOD_ID}}',
  });
})();


// create payment intent with payment method https://stripe.com/docs/payments/cards/charging-saved-cards#create-payment-intent-off-session
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

(async () => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    payment_method_types: ['card'],
    customer: '{{CUSTOMER_ID}}',
    payment_method: '{{PAYMENT_METHOD_ID}}',
    off_session: true,
    confirm: true,
  });
})();

// create subscription and attempt payment https://stripe.com/docs/billing/subscriptions/payment#signup-4
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

stripe.subscriptions.create({
  customer: 'cus_4fdAW5ftNQow1a',
  items: [
    {
      plan: 'plan_CBXbz9i7AIOTzr',
    },
  ],
  expand: ['latest_invoice.payment_intent'],
}, function(err, subscription) {
    // asynchronously called
  }
);

// handling SCA https://stripe.com/docs/billing/migration/strong-customer-authentication#scenario-1-handling-sca
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

stripe.paymentIntents.confirm('{{PAYMENT_INTENT_ID}}', {return_url: 'https://www.your-website.com/return_url'}, function(err, intent) {
  // asynchronously called
});

// identify charges https://stripe.com/docs/payments/payment-intents/verifying-status#identifying-charges
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

(async () => {
  const intent = await stripe.paymentIntents.retrieve('{{PAYMENT_INTENT_ID}}');
  const charges = intent.charges.data;
})();

// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

(async () => {
  const charges = stripe.charges.list({
    payment_intent: '{{PAYMENT_INTENT_ID}}',
    // Limit the number of objects to return (the default is 10)
    limit: 3,
  });
})();

// notify customer to complete payment if needed https://stripe.com/docs/payments/cards/charging-saved-cards#notify
stripe.paymentIntents.create(
  {
    amount: 1099,
    currency: 'usd',
    payment_method_types: ['card'],
    confirm: true,
    payment_method: '{{PAYMENT_METHOD_ID}}',
  },
  function(err, paymentIntent) {
    if(err.type == 'StripeCardError') {
      console.log('Error is: ', err.message);
      payment_intent_id = err.raw.payment_intent.id;
      stripe.paymentIntents.retrieve(
        payment_intent_id,
        function(err, paymentIntentRetrieved) {
          console.log('PI retrieved: ', paymentIntentRetrieved.id);
        }
      );
    }
  }
);

// reattempt payment https://stripe.com/docs/billing/subscriptions/payment#failure-3
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

stripe.invoices.pay({
  invoice: 'in_EmGqfJMYy3Nt9M',
  expand: ['payment_intent'],
}, function(err, invoice) {
    // asynchronously called
  }
);

// webhook https://stripe.com/docs/webhooks/setup#create-endpoint

// This example uses Express to receive webhooks
const app = require('express')();

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');

// Match the raw body to content type application/json
app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  let event;

  try {
    event = JSON.parse(request.body);
  }
  catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      handlePaymentMethodAttached(paymentMethod);
      break;
    // ... handle other event types
    default:
      // Unexpected event type
      return response.status(400).end();
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});

app.listen(8000, () => console.log('Running on port 8000'));


// Using promises https://github.com/stripe/stripe-node#using-promises
// Create a new customer and then a new charge for that customer:
stripe.customers
  .create({
    email: 'foo-customer@example.com',
  })
  .then((customer) => {
    return stripe.customers.createSource(customer.id, {
      source: 'tok_visa',
    });
  })
  .then((source) => {
    return stripe.charges.create({
      amount: 1600,
      currency: 'usd',
      customer: source.customer,
    });
  })
  .then((charge) => {
    // New charge created on a new customer
  })
  .catch((err) => {
    // Deal with an error
  });
 
// using callbacks https://github.com/stripe/stripe-node#using-callbacks
var stripe = require('stripe')('sk_test_...');

stripe.customers.create(
  {
    email: 'customer@example.com',
  },
  function(err, customer) {
    if (err) {
      // Deal with an error (will be `null` if no error occurred).
    }

    // Do something with created customer object
    console.log(customer.id);
  }
);

//configuring timeout  https://github.com/stripe/stripe-node#configuring-timeout
stripe.setTimeout(20000); // in ms (this is 20 seconds)

// configuring for connect https://github.com/stripe/stripe-node#configuring-for-connect
// Retrieve the balance for a connected account:
stripe.balance
  .retrieve({
    stripe_account: 'acct_foo',
  })
  .then((balance) => {
    // The balance object for the connected account
  })
  .catch((err) => {
    // Error
  });

// configuring a proxy https://github.com/stripe/stripe-node#configuring-a-proxy
if (process.env.http_proxy) {
  const ProxyAgent = require('https-proxy-agent');
  stripe.setHttpAgent(new ProxyAgent(process.env.http_proxy));
}

// network retries https://github.com/stripe/stripe-node#network-retries
// Retry a request twice before giving up
stripe.setMaxNetworkRetries(2);



// implement from here down https://github.com/stripe/stripe-node#examining-responses