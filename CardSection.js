// from https://github.com/stripe/react-stripe-elements/blob/master/README.md
import React from 'react';
import {CardElement} from 'react-stripe-elements';

class CardSection extends React.Component {
  render() {
    return (
      <label>
        Card details
        <CardElement style={{base: {fontSize: '18px'}}} />
      </label>
    );
  }
}

// using onReady https://github.com/stripe/react-stripe-elements/blob/master/README.md#using-onready

export default CardSection;

import React from 'react';
import {CardElement} from 'react-stripe-elements';

class CardSection extends React.Component {
  render = () => {
    return (
      <label>
        Card details
        <CardElement onReady={(el) => el.focus()} />
      </label>
    );
  };
}

export default CardSection;