/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import $ from 'jquery';
import { Button } from '@material-ui/core';

class TagSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [{}],
      //tagString: "",
      activeTags: [],
      loading: false
    };

    this.updateRequest = this.updateRequest.bind(this);

  };

  updateRequest() {
		this.props.getTag(this.state);
  }

  handleAutoChange = (event, values) => {
    //this.setState({tagString: values}, this.updateRequest);
    this.setState({
      activeTags: values
    }, () => {
      // This will output an array of objects
      // given by Autocompelte options property.
      console.log(this.state.activeTags);
    });
  }

  handleChange = (event) => {

    this.setState({ loading: true });

    var settings = {
      async: "true",
      crossDomain: "true",
      url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + event.target.value,
      method: "GET",
      headers: {
        "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        "x-rapidapi-key": "f33e47e69fmshe427476175d1511p18d30djsn436f42242136"
      },
      context: this
    }

    $.ajax(settings).done(function (response) {
      if (typeof response.data !== 'undefined') {
        var newTags = [];
        for (var i = 0; i < response.data.length; i++) {
          newTags.push({ label: response.data[i].title + ' by ' + response.data[i].artist.name });
        }

        this.setState({ tags: newTags, loading: false });
      }
    });

  };

  render() {
    return (
      <Autocomplete
        id="combo-box-demo"
        options={this.state.tags}
        autoComplete
        disableOpenOnFocus
        multiple
        getOptionLabel={option => option.label}
        onChange={this.handleAutoChange}
        style={{ top: "auto", bottom: "auto", height:"auto", postion: "absolute" }}
        renderInput={params => (
             
          <TextField {...params}
            label="Select Tags"
            variant="outlined"
            fullWidth
            //value={this.state.tagString}
            onChange={this.handleChange}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {this.state.loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {/*params.InputProps.endAdornment*/}
                </React.Fragment>
              ),
            }}
          />
          
        )}
      />
    );
  }
}

export default(TagSearch);