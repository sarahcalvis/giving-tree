import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';

import * as helper from '../helpers/SearchHelper.js'; 

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
        dist: helper.calcDistance(this.state.centerLoc.lat, this.state.centerLoc.long, doc.lat, doc.long),
        grant: doc,
      });
    });
    this.setState({metaGrants: newMetaGrants, radiusResults: newMetaGrants});
  }

  tagFreeTextCallback = (tagsAndFreeText) => {
    this.setState({tags: tagsAndFreeText.tags, freeText: tagsAndFreeText.freeText}, () => {
      console.log("tags and free text: ", tagsAndFreeText);
      if(!(this.state.tags === [] && this.state.freeText === [])) {
        this.setByTags();
      }
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
      this.props.parentCallback(tempTemp);
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
  }

/*
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

  radiusCallback = (radius) => {  
    console.log("central location: ", this.state.centerLoc);    
    if(radius === -1) {
      this.setState({ radiusResults: this.state.metaGrants}, () => {
        this.props.parentCallback(this.state.radiusResults);
      });
    }
    else {
      var newRadRes = [];
      this.state.metaGrants.forEach((meta) => {
        console.log("distance from center: ", meta.dist);
        console.log("radius: ", radius);
        console.log("meta.dist < radius", meta.dist < radius);
        if(meta.dist < radius) {
          newRadRes.push(meta);
          console.log("radius grant results: ", newRadRes);
        }
        this.props.parentCallback(newRadRes);
      }); 
      this.setState({ radiusResults: newRadRes});
    }
  }

  locationCallback = (location) => {
    this.setState({centerLoc: location}, () => {
      this.setDists();
    });
  }

  addDist = (doc) => {
    let newDist = helper.calcDistance(this.state.centerLoc.lat, this.state.centerLoc.long, doc.grant.lat, doc.grant.long);
    var tempTemp = this.state.tempMeta;
    tempTemp.push({dist: newDist, grant: doc.grant});
    tempTemp.sort((a, b) => (a.dist > b.dist ? 1 : -1));
    this.setState({tempMeta: tempTemp}, ()=> {
      this.props.parentCallback(tempTemp);
    });
  }

  setDists = () => {
    var localGrants = this.state.metaGrants; 
    this.setState({tempMeta: []}, () => {
      localGrants.forEach(this.addDist); 
      this.setState({metaGrants: this.state.tempMeta});
    });
  }

  sortByCallback = (sortBy) => {
    var sortedBy = [this.radiusResults || this.state.metaGrants];
    if(sortBy === "deadline") { 
      sortedBy.sort((a, b) => (a.grant.dateDeadline > b.grant.dateDeadline ? 1 : -1));
    } else if(sortBy === "posting") {
      sortedBy.sort((a, b) => (a.grant.datePosted > b.grant.datePosted ? 1 : -1));
    } else if(sortBy === "goalD") {
      sortedBy.sort((a, b) => ((a.grant.moneyRaised / a.grant.goalAmt) < (b.grant.moneyRaised / b.grant.goalAmt) ? 1 : -1));
    } else if(sortBy === "goalI") {
      sortedBy.sort((a, b) => ((a.grant.moneyRaised / a.grant.goalAmt) > (b.grant.moneyRaised / b.grant.goalAmt) ? 1 : -1));
    } else if(sortBy === "size") {
      sortedBy.sort((a, b) => (a.grant.goalAmt > b.grant.goalAmt ? 1 : -1));
    } else {console.log("nothing selected?");}
    this.setState({metaGrants: sortedBy}, () => {
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

