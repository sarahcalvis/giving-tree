import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function SortBy(props) {
  const classes = useStyles();
  const [sort, setSort] = React.useState("");

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setSort(event.target.value);
    props.parentCallback(event.target.value);
  };

  return (
    <div>
      <FormControl fullWidth variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="select-radius-ref">
          Sort By
        </InputLabel>
        <Select
          labelId="select-sort-label"
          id="select-sort"
          value={sort}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"deadline"}>Deadline</MenuItem>
          <MenuItem value={"posting"}>Posting Date</MenuItem>
          <MenuItem value={"goalD"}>% of Goal Desc.</MenuItem>
          <MenuItem value={"goalI"}>% of Goal Inc.</MenuItem>
          <MenuItem value={"size"}>Goal Size</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
