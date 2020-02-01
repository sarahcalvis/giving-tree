/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import $ from 'jquery';
import PropTypes from "prop-types";
import firebase from '../firebase.js';
import { withRouter } from 'react-router-dom';

class TagSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [{}],
      //tagString: "",
      activeTags: [],
      loading: false,
      //incomingTag: null
    };
    
    this.updateRequest = this.updateRequest.bind(this);
    this.setCached = this.setCached.bind(this);
    this.retrieveCached = this.retrieveCached.bind(this);
    this.updateSearch = this.updateSearch.bind(this);

  };

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  componentDidMount () {
    const { match, location, history } = this.props;
    //this.setState((state, props) => {
    if(location){
      console.log(location);
      let a = this.state.activeTags.slice(); //creates the clone of the state
      a[0] = location.state.incomingTag;
      console.log(a);
      this.setState({activeTags: a}, () => {
        console.log(this.state.activeTags);
      });
      
    }
  }

  updateRequest() {
		this.props.updateTags(this.state.activeTags);
  }

  handleAutoChange = (event, values) => {
    //this.setState({tagString: values}, this.updateRequest);
    this.setState({
      activeTags: values
    }, () => {
      // This will output an array of objects
      // given by Autocompelte options property.
      console.log(this.state.activeTags);
      //this.updateRequest();
    });
  }

  handleClick = (event) => {
    this.updateSearch();
  }


  setCached(key, val){
    //var now = (new Date().getTime());
    var stringVal = JSON.stringify({ value : val});
    sessionStorage.setItem(key, stringVal);
  }
  
  // If the cached value is present and it is less than
  //    ttl seconds old, return it.
  // Otherwise, return null
  retrieveCached(key, ttl){
              
    if(key in sessionStorage){
      var data = JSON.parse(sessionStorage.getItem(key));
      /*var now = (new Date().getTime());
      var timeCached = data.time;
      if((now - timeCached) < (ttl*1000)){*/
          return data.value;
      //}
    }
    return null;
    // TODO: complete this
  }

  updateSearch() {
    
    function displayResults(results){
        $("#results").text(results.num_found + " results found.");
    }

    var query = "tagArray";
    var cacheResult = this.retrieveCached(query, 600);
    var tags = [];
    if(cacheResult){
      console.log("Getting from cache :)");
      tags = cacheResult;
      this.setState({ tags: tags })
      displayResults(cacheResult);
    }else{
      console.log("Have to start over :(");
      var db = firebase.firestore();
      var dbRef = db.collection("tags");

      dbRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var dbTags = doc.data().tags;
          for (var i = 0; i < dbTags.length; i++) {
            tags.push(dbTags[i]);
          }
        });

        this.setState({ tags: tags })
        this.setCached(query, tags);
        displayResults(tags); 
        
        if(this.state.dataLoaded === false){
          this.setState({ dataLoaded: true })
        }
      });
    }
  }

  

  render() {
    return (
      <Autocomplete
        id="combo-box-demo"
        options={this.state.tags}
        autoComplete
        defaultValue={this.componentDidMount}
        disableOpenOnFocus
        multiple
        freeSolo
        getOptionLabel={option => option}
        onChange={this.handleAutoChange}
        style={{ top: "auto", bottom: "auto", height:"auto", postion: "absolute" }}
        renderInput={params => (
             
          <TextField {...params}
            label="Select Tags"
            variant="outlined"
            fullWidth
            onClick={this.handleClick}
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

export default withRouter(TagSearch);