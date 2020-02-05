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
      tempMeta: [],
      distResults: [],
      radiusResults: [],
      metaGrants: [],
    };
  }

  componentWillMount() {
    var newMetaGrants = [];
    this.props.docs.forEach((doc) => {
      newMetaGrants.push({
        dist: -1,
        grant: doc,
      });
    });
    this.setState({metaGrants: newMetaGrants});
  }

  locationCallback = (childData) => {   
    var lat = 40;
    var long = -80;   
    this.setState({centerLoc: { address: childData, lat: lat, long: long }});
    console.log("In parent in callback. New Location: ", childData);
    this.setDists();
    console.log("logging the distResults: ", this.state.metaGrants);
    // NEED TO RERENDER THE CARDS
    this.props.parentCallback(this.state.metaGrants);
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
  calcDistance = (lat1, lon1, lat2, lon2) => {
    if ((lat1 === lat2) && (lon1 === lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      return dist;
    }
  }

  addDist = (doc) => {
    let newDist = this.calcDistance(this.state.centerLoc.lat, this.state.centerLoc.long, doc.grant.lat, doc.grant.long);
    console.log("adding in add ", {dist: newDist, grant: doc.grant});
    var tempTemp = this.state.tempMeta;
    tempTemp.push({dist: newDist, grant: doc.grant});
    this.setState({tempMeta: tempTemp});
    console.log("temp in add: ", this.state.tempMeta);
  }

  setDists = () => { 
    this.setState({tempMeta: []});
    this.state.metaGrants.forEach(this.addDist); 
    console.log("temp contents", this.state.tempMeta);
    var sortedByDist = this.state.tempMeta;
    console.log("unsorted with dists: ", sortedByDist);
    let actuallySorted = sortedByDist.sort((a, b) => (a.dist > b.dist ? 1 : -1));
    this.setState({metaGrants: actuallySorted});
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

