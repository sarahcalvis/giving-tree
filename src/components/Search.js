import React, {Component } from 'react';
import { withStyles } from '@material-ui/styles';
import LocationSearch from "./LocationSearch";
import SearchRadius from "./SearchRadius";
import SortBy from "./SortBy";
import TagSearch from "./TagSearch";

 const styles = theme => ({
  searchWrapper: {
    display: 'flex',
    'flex-wrap': 'wrap',
  },
  
});
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radius: -1,
      centerLoc: {
        address: "111 Home St",
        lat : 40, 
        long : -80,
      },
      tempMeta: [],
      radiusResults: [],
      metaGrants: [],
      tags: [],
      freeText: [],
    };
  }

  componentWillMount() {
    var newMetaGrants = [];
    this.props.docs.forEach((doc) => {
      newMetaGrants.push({
        dist: this.calcDistance(this.state.centerLoc.lat, this.state.centerLoc.long, doc.lat, doc.long),
        grant: doc,
      });
    });
    this.setState({metaGrants: newMetaGrants});
  }

  tagFreeTextCallback = (tagsAndFreeText) => {
    this.setState({tags: tagsAndFreeText.tags, freeText: tagsAndFreeText.freeText}, () => {
      console.log("tags and free text: ", tagsAndFreeText);

    });
  }

  locationCallback = (location) => {   
    this.setState({centerLoc: { address: location, lat: this.state.centerLoc.lat, long: this.state.centerLoc.long }});
    console.log("In parent in callback. New Location: ", location);
    this.setDists();
    // NEED TO RERENDER THE CARDS
    //this.props.parentCallback(this.state.metaGrants);
  }

  radiusCallback = (radius) => {      
    console.log("In parent in callback. New Radius: ", radius);
    if(radius === -1) {
      this.setState({ radiusResults: this.state.metaGrants}, () => {
        this.props.parentCallback(this.state.radiusResults);
      });
    }
    else {
      var newRadRes = [];
      this.state.metaGrants.forEach((meta) => {
        console.log("meta.dist and radius ", meta.dist, radius);
        if(meta.dist < radius) {
          console.log("pushing in radCallback: ", meta);
          newRadRes.push(meta);
        }
      }); 
      this.setState({ radiusResults: newRadRes}, () => {
        console.log("rad results: ", this.state.radiusResults);
        this.props.parentCallback(this.state.radiusResults);
      });
    }
  }

  sortByCallback = (sortBy) => {
    console.log("sort by: ", sortBy);
    if(sortBy === "deadline") {this.sortByDeadline();}
    else if(sortBy === "posting") {this.sortByPosting();}
    else if(sortBy === "goalD") {this.sortByGoalDecreasing();}
    else if(sortBy === "goalI") {this.sortByGoalIncreasing();}
    else if(sortBy === "size") {this.sortBySize();}
    else {console.log("nothing selected?");}
  }

  sortByDeadline = () => {
    var sortedByDeadline = this.state.metaGrants;
    sortedByDeadline.sort((a, b) => (a.grant.dateDeadline > b.grant.dateDeadline ? 1 : -1));
    this.setState({metaGrants: sortedByDeadline}, () => {
      //console.log("meta set: ", this.state.metaGrants);
      this.props.parentCallback(this.state.metaGrants);
    });
  }
  
  sortByPosting = () => {
    var sortedByPosted = this.state.metaGrants;
    sortedByPosted.sort((a, b) => (a.grant.datePosted > b.grant.datePosted ? 1 : -1));
    this.setState({metaGrants: sortedByPosted}, () => {
      //console.log("meta set: ", this.state.metaGrants);
      this.props.parentCallback(this.state.metaGrants);
    });
  }
  
  sortByGoalDecreasing = () => {
    var sortedByGDec = this.state.metaGrants;
    sortedByGDec.sort((a, b) => ((a.grant.moneyRaised / a.grant.goalAmt) < (b.grant.moneyRaised / b.grant.goalAmt) ? 1 : -1));
    this.setState({metaGrants: sortedByGDec}, () => {
      //console.log("meta set: ", this.state.metaGrants);
      this.props.parentCallback(this.state.metaGrants);
    });
  }
  
  sortByGoalIncreasing = () => {
    var sortedByGDec = this.state.metaGrants;
    sortedByGDec.sort((a, b) => ((a.grant.moneyRaised / a.grant.goalAmt) > (b.grant.moneyRaised / b.grant.goalAmt) ? 1 : -1));
    this.setState({metaGrants: sortedByGDec}, () => {
      //console.log("meta set: ", this.state.metaGrants);
      this.props.parentCallback(this.state.metaGrants);
    });
  }

  sortBySize = () => {
    var sortedBySize = this.state.metaGrants;
    //console.log("sortedbySize: ", sortedBySize);
    sortedBySize.sort((a, b) => (a.grant.goalAmt > b.grant.goalAmt ? 1 : -1));
    this.setState({metaGrants: sortedBySize}, () => {
      //console.log("meta set: ", this.state.metaGrants);
      this.props.parentCallback(this.state.metaGrants);
    });
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
    //console.log("adding in add ", {dist: newDist, grant: doc.grant});
    var tempTemp = this.state.tempMeta;
    tempTemp.push({dist: newDist, grant: doc.grant});
    this.setState({tempMeta: tempTemp});
    console.log("temp in add: ", this.state.tempMeta);
  }

  setDists = () => { 
    this.setState({tempMeta: []}, () => {
      this.state.metaGrants.forEach(this.addDist); 
    });
    //console.log("temp contents", this.state.tempMeta);
    var sortedByDist = this.state.tempMeta;
    //console.log("unsorted with dists: ", sortedByDist);
    sortedByDist.sort((a, b) => (a.dist > b.dist ? 1 : -1));
    this.setState({metaGrants: sortedByDist}, () => {
      //console.log("meta set: ", this.state.metaGrants);
      this.props.parentCallback(this.state.metaGrants);
    });
  }

  render() {
    return (
      <div className={styles.searchWrapper}>
        <TagSearch parentCallback={this.tagFreeTextCallback}/>
        <LocationSearch parentCallback={this.locationCallback}/>
        <SearchRadius parentCallback={this.radiusCallback}/>
        <SortBy parentCallback={this.sortByCallback}/>
      </div>  
    );
  }
}

export default withStyles(styles)(Search);

