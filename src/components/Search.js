import React, { useState } from 'react';
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
  const [locBarRef, setLocBarRef] = useState(React.createRef());
  return (
      <div className={classes.searchbox}>
        <AutoCompleteMapsSearchBar ref={locBarRef}/>
        <LocationSearch/>
      </div>
      
  );
}
