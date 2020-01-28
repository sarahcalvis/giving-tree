import React from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TagSearch from './TagSearch.js';
import firebase from "../firebase.js";

const styles = theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  button: {
    height: "3.6em",
    width: "8em",
  },
});
class KeywordSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      tagSelected: "",
      suggestions: {},
    }
    this.autofill = this.autofill.bind(this);
    this.getTag = this.getTag.bind(this);
  };
  
  getTag(_State){
    const tagString = _State.tagString;
		this.setState(
			{
				tagSelected: tagString
			},
			() => {
				//console.log(this.state.tagSelected);
			}
    );
  }

  autofill(e) {

  };
  render() {
    const { classes } = this.props;
    return (

      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <div className={classes.heroButtons}>
            <Grid container spacing={2}
              direction="row"
              justify="space-around"
              alignItems="center">
              <Grid item xs={10}>
                <TagSearch
                  getTag={this.getTag}
                />
              </Grid>
            </Grid>
            {this.state.msg}
          </div>
        </Container>
      </div>
    );
  }
}
export default withStyles(styles)(KeywordSearch);
