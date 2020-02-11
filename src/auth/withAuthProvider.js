import React from 'react';

import AuthUserContext from './context';
import firebase from '../firebase.js';

const withAuthProvider = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      this.listener = firebase.auth().onAuthStateChanged(
        authUser => {
          if (authUser) {
            authUser.getIdTokenResult()
              .then((idTokenResult) => {
                idTokenResult
                  ? this.setState({ authUser: idTokenResult.claims })
                  : this.setState({ authUser: null });
              })
              .catch((error) => {
                console.log("ERROR: " + error.message);
              });
          }
          else {
            this.setState({ authUser: null });
          }
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return WithAuthentication;
};

export default withAuthProvider;