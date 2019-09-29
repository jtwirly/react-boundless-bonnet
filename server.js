// server.js

// init project
var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/app/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// create charge on server - from https://stripe.com/docs/recipes/elements-react#create-charge

const app = require("express")();
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

app.use(require("body-parser").text());

// add a POST request handler for the charge

app.post("/charge", async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body
    });

    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
});

// make the server listen on the desired port number:

app.listen(9000, () => console.log("Listening on port 9000"));

// from https://github.com/stripe/react-stripe-elements/blob/master/README.md

class PaymentRequestForm extends React.Component {
  constructor(props) {
    super(props);

    // For full documentation of the available paymentRequest options, see:
    // https://stripe.com/docs/stripe.js#the-payment-request-object
    const paymentRequest = props.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Demo total',
        amount: 1000,
      },
    });

    paymentRequest.on('token', ({complete, token, ...data}) => {
      console.log('Received Stripe token: ', token);
      console.log('Received customer information: ', data);
      complete('success');
    });

    paymentRequest.canMakePayment().then((result) => {
      this.setState({canMakePayment: !!result});
    });

    this.state = {
      canMakePayment: false,
      paymentRequest,
    };
  }

  render() {
    return this.state.canMakePayment ? (
      <PaymentRequestButtonElement
        paymentRequest={this.state.paymentRequest}
        className="PaymentRequestButton"
        style={{
          // For more details on how to style the Payment Request Button, see:
          // https://stripe.com/docs/elements/payment-request-button#styling-the-element
          paymentRequestButton: {
            theme: 'light',
            height: '64px',
          },
        }}
      />
    ) : null;
  }
}
export default injectStripe(PaymentRequestForm);

// Initialize this.state.stripe to null in the constructor, then update it in componentDidMount when the script tag has loaded. https://github.com/stripe/react-stripe-elements/blob/master/README.md

class App extends React.Component {
  constructor() {
    super();
    this.state = {stripe: null};
  }
  componentDidMount() {
    if (window.Stripe) {
      this.setState({stripe: window.Stripe('pk_test_12345')});
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({stripe: window.Stripe('pk_test_12345')});
      });
    }
  }
  render() {
    // this.state.stripe will either be null or a Stripe instance
    // depending on whether Stripe.js has loaded.
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          <InjectedCheckoutForm />
        </Elements>
      </StripeProvider>
    );
  }
}

// Server-side rendering https://github.com/stripe/react-stripe-elements/blob/master/README.md#server-side-rendering-ssr
class App extends React.Component {
  constructor() {
    super();
    this.state = {stripe: null};
  }
  componentDidMount() {
    // Create Stripe instance in componentDidMount
    // (componentDidMount only fires in browser/DOM environment)
    this.setState({stripe: window.Stripe('pk_test_12345')});
  }
  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          <InjectedCheckoutForm />
        </Elements>
      </StripeProvider>
    );
  }
}

// use existing stripe instance https://github.com/stripe/react-stripe-elements/blob/master/README.md#using-an-existing-stripe-instance
class App extends React.Component {
  render() {
    return (
      <StripeProvider stripe={this.props.stripe}>
        <Elements>
          <InjectedCheckoutForm />
        </Elements>
      </StripeProvider>
    );
  }
}

// from https://github.com/stripe/react-stripe-elements/blob/master/README.md#elements
type ElementsProps = {
  locale?: string,
  fonts?: Array<Object>,
  // The full specification for `elements()` options is here: https://stripe.com/docs/elements/reference#elements-options
};

// props shape https://github.com/stripe/react-stripe-elements/blob/master/README.md#props-shape-2
type ElementProps = {
  id?: string,
  className?: string,

  // For full documentation on the events and payloads below, see:
  // https://stripe.com/docs/elements/reference#element-on
  onBlur?: () => void,
  onChange?: (changeObject: Object) => void,
  onFocus?: () => void,
  onReady?: (StripeElement) => void,
};

// props shape for the PaymentRequestButtonElement are: https://github.com/stripe/react-stripe-elements/blob/master/README.md#props-shape-2
type PaymentRequestButtonProps = {
  id?: string,
  className?: string,

  paymentRequest: StripePaymentRequest,

  onBlur?: () => void,
  onClick?: () => void,
  onFocus?: () => void,
  onReady?: (StripeElement) => void,
};

// inject Stripe HOC https://github.com/stripe/react-stripe-elements/blob/master/README.md#injectstripe-hoc

function injectStripe(
  WrappedComponent: ReactClass,
  options?: {
    withRef?: boolean = false,
  }
): ReactClass; 

// example https://github.com/stripe/react-stripe-elements/blob/master/README.md#example
// 1. Create a component that uses this.props.stripe:
class CheckoutForm extends React.Component {
  render() {
    /* ... */
  }
  onCompleteCheckout() {
    this.props.stripe.createPaymentMethod('card').then(/* ... */);
  }
}

// 2. Wrap it in a higher-order component that provides the `stripe` prop:
const InjectedCheckoutForm = injectStripe(CheckoutForm);

// 3. Render the wrapped component in your app:
const CheckoutRoute = (props) => (
  <div>
    <InjectedCheckoutForm />
  </div>
);

// Within the wrapped component, the stripe prop has the type:
type FactoryProps = {
  stripe: null | {
    createToken: (tokenData: {type?: string}) => Promise<{
      token?: Object,
      error?: Object,
    }>,
    createSource: (sourceData: {type: string}) => Promise<{
      source?: Object,
      error?: Object,
    }>,
    createPaymentMethod: (
      type: string,
      paymentMethodData?: Object
    ) => Promise<{
      paymentMethod?: Object,
      error?: Object,
    }>,
    handleCardPayment: (
      clientSecret: string,
      paymentMethodData?: Object
    ) => Promise<{
      paymentIntent?: Object,
      error?: Object,
    }>,
    handleCardSetup: (
      clientSecret: string,
      paymentMethodData?: Object
    ) => Promise<{
      setupIntent?: Object,
      error?: Object,
    }>,
    // and other functions available on the `stripe` object,
    // as officially documented here: https://stripe.com/docs/elements/reference#the-stripe-object
  },
};





// webhook part https://glitch.com/edit/#!/gold-town?path=server.js:37:3
const
  stripe = require('stripe')(process.env.API_KEY),
  express = require('express'),
  endpointSecret = process.env.ENDPOINT_SECRET,

  // This example uses Express to receive webhooks
  app = express();

// Retrieve the raw body as a buffer and match all content types
app.use(require('body-parser').raw({type: '*/*'}));

app.post('/webhook', (request, response) => {
  // Validate events are sent by Stripe, not a third party
  let sig = request.headers['stripe-signature'];

  try {
    let event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    
    // For testing purposes, log the request body to the console
    // to compare with the request body shown in the Dashboard.
    // In a production environment, you'll want to store this
    // event in your database.
    console.log(JSON.stringify(event));
    
    // Do something with event
  }
  catch (err) {
    response.status(400).end()
  }
  
  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Running on port ' + listener.address().port);
});