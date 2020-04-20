import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


// 1) Radius should be set to none and disabled when nothing is in search.
// 2) Radius should be enabled and default to 25mi when location is chosen.
// 3) (1) and (2) should properly switch between each other.

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function SearchRadius(props) {
  const classes = useStyles();
  const [radius, setRadius] = React.useState(-1);

  const inputLabel = React.useRef("None");
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setRadius(event.target.value);
    props.parentCallback(event.target.value);
  };

  React.useEffect(() => {
    if (props.loc && radius == -1) {
      setRadius(25)
      props.parentCallback(25);
    }
    if (!props.loc) {
      setRadius(-1)
      props.parentCallback(-1);
    }
  }, [props.loc])

  return (
    <div>
      <FormControl fullWidth variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="select-radius-ref">
          Radius (mi)
        </InputLabel>
        <Select
          labelId="select-radius-label"
          id="select-radius"
          value={radius}
          onChange={handleChange}
          labelWidth={labelWidth}
          fullWidth
        >
          <MenuItem value={-1}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
