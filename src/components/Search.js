import React, {Component } from 'react';
// import LocationSearch from './LocationSearch';
import LocationSearch from "./LocationSearch";
import SearchRadius from "./SearchRadius";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radius: -1,
      centerLoc: {
        address: "111 Home St",
        lat : 41.15559, 
        long : -80.08209
      },
      tempResults: [],
      distResults: [],
      radiusResults: [],
      metaDocs: [],
    };
  }

  componentDidMount() {
    var newMetaDocs = [];
    this.props.docs.forEach((doc) => {
      newMetaDocs.push({
        dist: -1,
        grant: doc,
      })
    });
    this.setState({metaDocs: newMetaDocs});
  }

  locationCallback = (childData) => {   
    var lat = 40;
    var long = -80;   
    this.setState({centerLoc: { address: childData, lat: lat, long: long }});
    console.log("In parent in callback. New Location: ", childData);
    this.setDists();
    console.log("logging the distResults: ", this.state.distResults);
    // NEED TO RERENDER THE CARDS
    this.props.parentCallback(this.state.tempResults);
  }

  radiusCallback = (radius) => {      
    console.log("In parent in callback. New Radius: ", radius);
    var newDocs = [];
    this.props.docs.forEach((doc) => {
      if(doc.dist < radius) {
        newDocs.push({ doc });
      }
    }); 
    this.setState({ radiusResults: newDocs});
    this.props.parentCallback(newDocs);
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
      dist = (dist * 180 ) / Math.PI;
      dist = dist * 60 * 1.1515;
      return dist;
    }
  }

  addDist = (grant) => {
    this.setState({
      "dist" : this.calcDistance(this.state.centerLoc.lat, this.state.centerLoc.long, grant.lat, grant.long),
    });
  }

  setDists = () => { 
    this.state.metaDocs.forEach(this.addDist); 
    var sortedByDist = this.state.metaDocs;
    sortedByDist.sort((a, b) => (a.dist > b.dist ? 1 : -1));
    this.setState({metaDocs: sortedByDist});
    this.setState({tempResults: sortedByDist});
    this.setState({distResults: this.state.tempResults});
  }

  render() {
    return (
      <div>
        <LocationSearch parentCallback={this.locationCallback}/>
        <SearchRadius parentCallback={this.radiusCallback}/>
      </div>  
    );
  }
}

export default Search;

