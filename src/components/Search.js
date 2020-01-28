import React from 'react';
import LocationSearch from './LocationSearch';
import AutoCompleteMapsSearchBar from "./AutoCompleteMapsSearchBar";
import { makeStyles } from "@material-ui/styles";


const useStyles = makeStyles(theme => ({
  searchbox: {
    height: "100px"
  }
}));

export default function Search() {
  const classes = useStyles();
  return (
      <div className={classes.searchbox}>
        <AutoCompleteMapsSearchBar/>
        <LocationSearch/>
      </div>
      
  );
}
