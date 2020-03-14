/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from "prop-types";
import firebase from '../firebase.js';
import { withRouter } from 'react-router-dom';

class TagSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      activeTags: [],
      activeTextSearch: [],
      loading: false,
      incomingTag: null
    };
    
    

    this.setCached = this.setCached.bind(this);
    this.retrieveCached = this.retrieveCached.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.updateParent = this.updateParent.bind(this);
    
  };

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  

  componentWillMount() {
    // Get the tags from cache or database and set the 'tags' state accordingly
    const db = firebase.firestore();
    this.updateSearch(db, (tags) => this.setState({ tags: tags }));
    
    const { match, location, history } = this.props;
    if(location && location.state){
      console.log(location);
      if(location.state.incomingTag){
        let a = this.state.activeTags.slice(); //creates the clone of the state
        a[0] = location.state.incomingTag;
        console.log(a);
        this.setState({activeTags: a}, () => { console.log(this.state.activeTags); });
        this.setState({incomingTag: a[0]}, () => { 
          console.log(this.state.incomingTag); 
          this.updateParent();
          return React.createElement('TextField');
          
        });
      }
    }
  }

  // Pass the selected tags and free text up to the Search component
  updateParent() {
    this.props.parentCallback({ tags: this.state.activeTags, freeText: this.state.activeTextSearch})
  }

  handleAutoChange = ( values) => {
    var tagArr = [];
    var freeTextArr = [];
    values.forEach(element => {
      if(this.state.activeTags.includes(element)){
        tagArr.push(element);
      }else if(this.state.activeTextSearch.includes(element)){
        freeTextArr.push(element);
      }else if(this.state.tags.includes(element)){
        tagArr.push(element);
      }else{
        freeTextArr.push(element);
      }
    });
    
    this.setState({ activeTags: tagArr, activeTextSearch: freeTextArr  }, () => { 
      this.updateParent();
     });
  }

  // Set the cache
  setCached(key, val){
    var now = (new Date().getTime());
    var stringVal = JSON.stringify({ time: now, value : val});
    sessionStorage.setItem(key, stringVal);
  }
  
  // If the cached value is present and it is less than ttl seconds old, return it. Otherwise, return null
  retrieveCached(key, ttl){
    if(key in sessionStorage){
      var data = JSON.parse(sessionStorage.getItem(key));
      var now = (new Date().getTime());
      var timeCached = data.time;
      if((now - timeCached) < (ttl*1000)){ 
        return data.value; 
      }
    }
    return null;
  }

  // Sets tag state. Checks if there are cached tags. If not, queries the database and caches them
  updateSearch(db, callback) {

    var query = "tagArray";
    var cacheResult = this.retrieveCached(query, 600);
    var tags = [];

    // If we have a cached array, use that. Otherwise, query database
    if(cacheResult){
      tags = cacheResult;
      callback(tags)
    }else{
      var dbRef = db.collection("tags");

      dbRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var dbTags = doc.data().tags;
          for (var i = 0; i < dbTags.length; i++) {
            tags.push(dbTags[i]);
          }
        });

        this.setCached(query, tags);
        callback(tags)
      });
    }
  }

  setDefaultAuto(incoming) {
    if(this.props.tags) {
      return this.props.tags;
    }
    if(incoming) {
      return [incoming];
    }else{
      return null;
    }
  }

  

  render() {
    return (
      <Autocomplete
        {...this.state}
        id="combo-box-demo"
        options={this.state.tags}
        defaultValue={ this.setDefaultAuto(this.state.incomingTag) }
        autoComplete
        disableOpenOnFocus
        multiple
        freeSolo
        getOptionLabel={option => option}
        onChange={this.handleAutoChange}
        style={{ top: "auto", bottom: "auto", height:"auto", postion: "absolute" }}
        renderInput={params => (
             
          <TextField {...params}
            label="Select Tags"
            fullWidth
            multiline
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

export { TagSearch };
export default withRouter(TagSearch);