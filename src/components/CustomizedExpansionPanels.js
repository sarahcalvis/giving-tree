import React, { useEffect } from 'react';

import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css';

const useStyles = makeStyles(theme => ({
  title: {
    fontFamily: 'Fredericka the Great',
  },
}));

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(237, 237, 237, 1)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(238, 238, 238, 1)',
    borderBottom: '1px solid rgba(238, 238, 238, 1)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
    alignItems:'center',
    justifyContent:'center',
    color: 'rgba(69, 163, 41, 1)'
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: 'rgba(238, 238, 238, 1)',
    borderBottom: '10px solid rgba(238, 238, 238, 1)',
  },
}))(MuiExpansionPanelDetails);

export default function CustomizedExpansionPanels() {
  const [expanded, setExpanded] = React.useState('panel1');
  const classes = useStyles();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <ExpansionPanel square defaultExpanded onChange={handleChange('panel1')}>
        <ExpansionPanelSummary  aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon/>}>
          <Typography  variant={'h5'} className={classes.title}>Welcome to Giving Tree</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <span style={{'fontWeight': 380, textAlign: 'center'}}>
          Giving Tree connects nonprofit organizations with potential donors through community foundations (regional nonprofit organizations which manage and distribute money for charitable giving). Foundations learn about the specific needs of nonprofits in their area and post these "giving opportunities" on Giving Tree, where they are visible to members of the community like yourself. You can search for, view, and donate to giving opportunities that interest you. Every dollar makes a difference!
          </span>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}