import React, {Component, useState } from 'react';
// import LocationSearch from './LocationSearch';
import AutoCompleteMapsSearchBar from "./AutoCompleteMapsSearchBar";
import SearchRadius from "./SearchRadius";

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
      // lat and then long
      grantLocs: [
        {
          "lat": 36.8909, 
          "long" : -76.30892, 
          "name": "Bathroom Supplies", 
          "address": "1421 Bolling Ave, Norfolk, VA 23508"
        },
        {
          "lat": 38.89308, 
          "long": -76.97667, 
          "name": "Emotional Support", 
          "address": "1911 C Street NE Washington DC 20002"
        },
        {    
          "lat" : 41.16895,
          "long": -80.1132,
          "name": "Taco Bell",
          "address" : "1560 W. Main Street, Grove City, PA 16127"
        }
      ],
      dists: [],
    };
  }

  locationCallback = (childData) => {      
    this.setState({centralLocation: childData});
    console.log("In parent in callback. New Location: ", this.state.centralLocation);
    this.setDists();
    // NEED TO RERENDER THE CARDS
  }

  radiusCallback = (childData) => {      
    this.setState({radius: childData});
    console.log("In parent in callback. New Radius: ", this.state.radius);
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

  addDist = (grantLoc) => {
    this.setState(prevState => ({
      dists: [...prevState.dists,
                {
                  "dist" : this.calcDistance(this.state.centerLoc.lat, this.state.centerLoc.long, grantLoc.lat, grantLoc.long, "M"),
                  "grantLoc" : grantLoc
                }
              ]
    }))
  }

  setDists = () => {  
    this.state.grantLocs.forEach(this.addDist); 
    this.setState(prevState => ({
      dists: prevState.dists.sort((a, b) => (a.dist > b.dist ? 1 : -1))
    }))
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

