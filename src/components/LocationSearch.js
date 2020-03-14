import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import Geocode from "react-geocode";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.secondary,
  }
}));

export default function LocationSearch(props) {
  Geocode.setApiKey("AIzaSyDntA49IGS_w5ZRD3ijey8OVS8CNYpqXqA");
  const classes = useStyles();
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);
  if (typeof window !== "undefined" && !loaded.current) {
    //console.log(document.querySelector("#google-maps"));
    if (!document.querySelector("#google-maps")) {
      loadScript(
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDntA49IGS_w5ZRD3ijey8OVS8CNYpqXqA&libraries=places",
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const handleKeyPress = (event) => {
    setInputValue(event.target.value);
  }

  const handleChange = (event, value) => {
    if (!(value === null)) {
      Geocode.fromAddress(value.description).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          props.parentCallback({address: value, lat: lat, long: lng});
        },
        error => {
          console.error(error);
        }
      );
    }
  };

  const fetch = React.useMemo(
    () =>
      throttle((input, callback) => {
        autocompleteService.current.getPlacePredictions(input, callback);
      }, 200),
    []
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions([]);
      return undefined;
    }

    fetch({ input: inputValue }, results => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue]);

  return (
    <Autocomplete
      id="loc-bar"
      getOptionLabel={option =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={x => x}
      options={options}
      autoComplete
      fullWidth
      includeInputInList
      disableOpenOnFocus
      fullWidth
      defaultValue={props.address}
      onChange={handleChange}
      renderInput={params => (
        <TextField
          name="loc-textfield"
          id="loc-textfield"
          error={props.error}
          {...params}
          label="Search from a location"
          onChange={handleKeyPress}
          fullWidth
        />
      )}
      renderOption={option => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map(match => [match.offset, match.offset + match.length])
        );

        return (
          <Grid container alignItems="center">
            <Grid item xs={12}>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}
              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
