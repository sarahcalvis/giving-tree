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
      this.setByTags();
    });
  }

  addByTag = (doc) => {
    var tempTemp = this.state.tempMeta;
    console.log("state tags: ", this.state.tags);
    console.log("doc tags: ", doc.grant.tags);
    if((this.state.tags).every(tag => (doc.grant.tags).includes(tag))) {
      tempTemp.push({dist: doc.dist, grant: doc.grant});
      console.log("pushing this grant: ", doc);
      this.setState({tempMeta: tempTemp});
    }
  }


  setByTags = () => { 
    console.log("calling setByTags with these tags: ", this.state.tags);
    var myMeta = this.state.metaGrants;
    console.log("myMeta: ", myMeta);
    this.setState({tempMeta: []}, () => {
      (myMeta).forEach(this.addByTag);
      console.log("tempMeta after setting: ", this.state.tempMeta);
    });
    this.props.parentCallback(this.state.tempMeta);
    /*
    this.setState({metaGrants: this.state.tempMeta}, () => {
      this.props.parentCallback(this.state.tempMeta);
    });
    */
    //console.log("metaGrants after callBack: ", this.state.metaGrants);
  }
    /*

  addByTag = (doc) => {
    var tempTemp = this.state.tempMeta;
    if((this.state.tags).every(tag => (doc.grant.tags).includes(tag))) {
      tempTemp.push({dist: doc.dist, grant: doc.grant});
      this.setState({tempMeta: tempTemp});
    }
    var tempTemp = this.state.tempMeta;
    console.log("state tags: ", this.state.tags);
    console.log("doc tags: ", doc.grant.tags);
    if((this.state.tags).every(tag => (doc.grant.tags).includes(tag))) {
      var textMatches = true;
      (this.state.freeText).forEach((text)=> {
        console.log("checking this free text: ", text);
        if(!(doc.grant.desc).includes(text)) {
          console.log("this text isn't found in description");
          textMatches = false;
        }
      })
      if(textMatches) {
        tempTemp.push({dist: doc.dist, grant: doc.grant});
        console.log("pushing this grant: ", doc);
        this.setState({tempMeta: tempTemp});
      }
    }
  }

  setByTags = () => { 
    var myMeta = this.state.metaGrants;
    this.setState({tempMeta: []}, () => {
      (myMeta).forEach(this.addByTag);
    });
    this.setState({metaGrants: this.state.tempMeta}, () => {
      this.props.parentCallback(this.state.tempMeta);      
      //this.setByFreeText();
    });
  }

  addByFreeText = (doc) => {
    var tempTemp = this.state.tempMeta;
    if((this.state.tags).every(tag => (doc.grant.tags).includes(tag))) {
      tempTemp.push({dist: doc.dist, grant: doc.grant});
      this.setState({tempMeta: tempTemp});
    }
  }

  setByFreeText = () => { 
    var myMeta = this.state.metaGrants;
    this.setState({tempMeta: []}, () => {
      (myMeta).forEach(this.addByTag);
    });
    this.setState({metaGrants: this.state.tempMeta}, () => {
      this.props.parentCallback(this.state.tempMeta);
    });
  }

*/

  locationCallback = (location) => {   
    this.setState({centerLoc: { address: location, lat: this.state.centerLoc.lat, long: this.state.centerLoc.long }});
    this.setDists();
  }

  radiusCallback = (radius) => {      
    if(radius === -1) {
      this.setState({ radiusResults: this.state.metaGrants}, () => {
        this.props.parentCallback(this.state.radiusResults);
      });
    }
    else {
      var newRadRes = [];
      this.state.metaGrants.forEach((meta) => {
        if(meta.dist < radius) {
          newRadRes.push(meta);
        }
      }); 
      this.setState({ radiusResults: newRadRes}, () => {
        this.props.parentCallback(this.state.radiusResults);
      });
    }
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
    var tempTemp = this.state.tempMeta;
    tempTemp.push({dist: newDist, grant: doc.grant});
    this.setState({tempMeta: tempTemp});
  }

  setDists = () => { 
    this.setState({tempMeta: []}, () => {
      this.state.metaGrants.forEach(this.addDist); 
    });
    var sortedByDist = this.state.tempMeta;
    sortedByDist.sort((a, b) => (a.dist > b.dist ? 1 : -1));
    this.setState({metaGrants: sortedByDist}, () => {
      this.props.parentCallback(this.state.metaGrants);
    });
  }

  sortByCallback = (sortBy) => {
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
      this.props.parentCallback(this.state.metaGrants);
    });
  }
  
  sortByPosting = () => {
    var sortedByPosted = this.state.metaGrants;
    sortedByPosted.sort((a, b) => (a.grant.datePosted > b.grant.datePosted ? 1 : -1));
    this.setState({metaGrants: sortedByPosted}, () => {
      this.props.parentCallback(this.state.metaGrants);
    });
  }
  
  sortByGoalDecreasing = () => {
    var sortedByGDec = this.state.metaGrants;
    sortedByGDec.sort((a, b) => ((a.grant.moneyRaised / a.grant.goalAmt) < (b.grant.moneyRaised / b.grant.goalAmt) ? 1 : -1));
    this.setState({metaGrants: sortedByGDec}, () => {
      this.props.parentCallback(this.state.metaGrants);
    });
  }
  
  sortByGoalIncreasing = () => {
    var sortedByGDec = this.state.metaGrants;
    sortedByGDec.sort((a, b) => ((a.grant.moneyRaised / a.grant.goalAmt) > (b.grant.moneyRaised / b.grant.goalAmt) ? 1 : -1));
    this.setState({metaGrants: sortedByGDec}, () => {
      this.props.parentCallback(this.state.metaGrants);
    });
  }

  sortBySize = () => {
    var sortedBySize = this.state.metaGrants;
    sortedBySize.sort((a, b) => (a.grant.goalAmt > b.grant.goalAmt ? 1 : -1));
    this.setState({metaGrants: sortedBySize}, () => {
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

