import React, {Component, useState } from 'react';
// import LocationSearch from './LocationSearch';
import AutoCompleteMapsSearchBar from "./AutoCompleteMapsSearchBar";
import SearchRadius from "./SearchRadius";
import firebase from "../firebase.js";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centralLocation: [],
      radius: -1,
      centerLoc: {
        "lat" : 41.15559, 
        "long" : -80.08209
      },
      searchResults: [],
      // lat and then long
      
      dists: [],
    };
  }

  componentDidMount() {
    var grantSearchResults = [];
    var db = firebase.firestore();
    db.collection("grants").get().then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          var cf_name = doc.data().cf_name;
          var cf_id = doc.data().cf_id;
          var title = doc.data().title;
          var nonprofit_name = doc.data().nonprofit_name;
          var address = doc.data().address;
          var lat = doc.data().lat;
          var long = doc.data().long;
          var date_posted = doc.data().date_posted;
          var date_deadline = doc.data().date_deadline;
          var money_raised = doc.data().money_raised;
          var goal_amt = doc.data().goal_amt;
          var desc = doc.data().desc;
          var tags = doc.data().tags;
          var images = doc.data().images;
          grantSearchResults.push({cf_name, cf_id, title, nonprofit_name, address, lat, long, date_posted, date_deadline, money_raised, goal_amt, desc, tags, images});
        });
        this.setState({ searchResults: grantSearchResults})
        console.log(grantSearchResults);
    });
  };

  locationCallback = (childData) => {      
    this.setState({centralLocation: childData});
    console.log("In parent in callback. New Location: ", childData);
    this.setDists();
    console.log("logging the dists: ", this.state.dists);
    // NEED TO RERENDER THE CARDS
  }

  radiusCallback = (childData) => {      
    this.setState({radius: childData});
    console.log("In parent in callback. New Radius: ", childData);
    // NEED TO RERENDER THE CARDS
  }
  //from Geo Data Source
  calcDistance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === "K") {
        dist = dist * 1.609344;
      }
      if (unit === "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }

  addDist = (grant) => {
    console.log("in addDist. the distance: ", this.calcDistance(this.state.centerLoc.lat, this.state.centerLoc.long, grant.lat, grant.long, "M"));
    console.log("grant: ", grant);
    this.setState( {dists: {
        "dist" : this.calcDistance(this.state.centerLoc.lat, this.state.centerLoc.long, grant.lat, grant.long, "M"),
        "grant" : grant
    }});
    /*
    this.setState(prevState => ({
      dists: [...prevState.dists, 
        {
            "dist" : this.calcDistance(this.state.centerLoc.lat, this.state.centerLoc.long, grant.lat, grant.long, "M"),
            "grant" : grant
        }]
    }));
    */
  }

  setDists = () => {  
    this.setState({dists: []});
    this.state.searchResults.forEach(this.addDist); 
    console.log("in setDists with dists: ", this.state.dists);
    //var sortedByDist = this.state.dists.sort((a, b) => (a.dist > b.dist ? 1 : -1));
    //this.setState({ dists: sortedByDist});
  }
  render() {
    return (
      <div>
        <AutoCompleteMapsSearchBar parentCallback={this.locationCallback}/>
        <SearchRadius parentCallback={this.radiusCallback}/>
      </div>  
    );
  }
}

export default Search;

