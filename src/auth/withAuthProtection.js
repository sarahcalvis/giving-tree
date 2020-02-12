import React from 'react';

import Text from '../components/Text.js';
import { withAuthConsumer } from './context';

const withAuthProtection = (condition = (authUser) => !!authUser ) => Component => {
  class WithAuthorization extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          message: ""
         };
    }

    componentDidMount() {
      setTimeout(() => { this.setState({
        message: "You are not authorized to view this page. Please sign in."
      })}, 1000);
    }

    render() {
      return (
        <React.Fragment>
          {condition(this.props.authUser) ? <Component {...this.props} /> : 
          <Text type='card-heading' text={this.state.message} />}
        </React.Fragment>
      );
    }
  }

  return withAuthConsumer(WithAuthorization);
};

export default withAuthProtection;
