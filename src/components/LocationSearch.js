import React from "react";

class Distance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  fillDists() {  
    this.state.grantLocs.forEach(addDist); 
    function addDist(grantLoc) {
      this.setState(prevState => ({
        dists: [...prevState.dists,
                  {
                    "dist" : this.calcDistance(this.state.centerLoc.lat, this.state.centerLoc.long, this.state.grantLoc.lat, this.state.grantLoc.long, "M"),
                    "grantLoc" : grantLoc
                  }
                ]
      }))
      /*
      this.state.dists.push(
          {
              "dist" : this.calcDistance(this.state.centerLoc.lat, this.state.centerLoc.long, this.state.grantLoc.lat, this.state.grantLoc.long, "M"),
              "grantLoc" : grantLoc
          }
      );
      */
    }
    this.setState(prevState => ({
      dists: prevState.dists.sort((a, b) => (a.dist > b.dist ? 1 : -1))
    }))
    /*
    this.setState({
      dists: this.state.dists.sort((a, b) => (a.dist > b.dist ? 1 : -1))
    }) 
    */
  }
}
/*

}
//from Geo Data Source
function calcDistance(lat1, lon1, lat2, lon2, unit) {
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

// props includes
// 1. a location (centerLoc)
// 2. an array of the grant locations (grantLocs)
export default function getDistance(props) {
  // lat and then long
  const grantLocs = [
    
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
  ];

  //var myHouse = [36.8909, -76.30892];
  var dists = [];
  var centerLoc = {
      "lat" : 41.15559, 
      "long" : -80.08209
  };
  
  grantLocs.forEach(addDist); 
  function addDist(grantLoc) {
    dists.push(
        {
            "dist" : calcDistance(centerLoc.lat, centerLoc.long, grantLoc.lat, grantLoc.long, "M"),
            "grantLoc" : grantLoc
        }
    );
  } 
  dists.sort((a, b) => (a.dist > b.dist ? 1 : -1));
  return (
    <div>
        <div>
            {JSON.stringify(dists)}
        </div>
    </div>);
}

get the central location
store it

get the
*/
