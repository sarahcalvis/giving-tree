import React, { useEffect } from 'react';

import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';



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

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <ExpansionPanel square onChange={handleChange('panel1')}>
        <ExpansionPanelSummary  aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon/>}>
          <Typography  variant={'h5'}>Welcome to Giving Tree</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          Giving Tree connects nonprofit foundations with potential donors. Foundations post giving 
          opportunities and their details, so that donors can browse the various opportunities that 
          have been made available. You can search for giving opportunities by tag, free-text, and/or 
          location. We hope you will make a difference through this platform!
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}