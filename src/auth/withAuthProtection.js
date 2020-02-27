import React, { useEffect } from 'react';

import Text from '../components/Text.js';
import { withAuthConsumer } from './context';

const withAuthProtection = (condition = (authUser) => !!authUser) => Component => {
  function WithAuthorization(props) {
    const [message, setMessage] = React.useState("");

    useEffect(() => {
      setTimeout(() => {
        setMessage("You are not authorized to view this page. Please sign in.")
      }, 1000);
    }, []);

    return (
      <React.Fragment>
        {condition(props.authUser) ? <Component {...props} /> :
            <Text type='card-heading' text={message} />
        }
      </React.Fragment>
    );
  }

  return withAuthConsumer(WithAuthorization);
};

export default withAuthProtection;
