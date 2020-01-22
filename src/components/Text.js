// https://stripe.com/docs/recipes/elements-react

import React from 'react';
import Typography from '@material-ui/core/Typography';

class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      type: this.props.type
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.text !== prevProps.text) this.setState({ text: this.props.text });
  }

  render() {
    return (
      <div>
        {this.state.type === "card-heading" &&
          <Typography
            component="h1"
            variant="h4">
            {this.state.text}
          </Typography>
        }
        {this.state.type === "card-subheading" &&
          <Typography
            component="h1"
            color="textSecondary"
            variant="subtitle1">
            {this.state.text}
          </Typography>
        }
      </div>
    );
  }
}

export default Text;