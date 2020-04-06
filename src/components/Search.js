import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

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
  paper: {
    padding: theme.spacing(2),
    maxWidth: 400,
  },
});
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radius: -1,
      centerLoc: {
        address: "no where",
        lat : -1000, 
        long : -1000,
      },
      sortBy: "",
      tempMeta: [],
      radiusResults: [],
      tftResults: [],
      sortedResults: [],
      metaGrants: [],
      tags: [],
      freeText: [],
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
    this.setState({
      metaGrants: newMetaGrants, 
      radiusResults: newMetaGrants, 
      tftResults: newMetaGrants,
      sortedResults: newMetaGrants
    });
  }

  tagFreeTextCallback = (tagsAndFreeText) => {
    this.setState({tags: tagsAndFreeText.tags, freeText: tagsAndFreeText.freeText}, () => {
      //console.log("tags and free text: ", tagsAndFreeText);
      if(!(this.state.tags === [] && this.state.freeText === [])) {
        this.setByTags();
      }
    });
  }

  addByTag = (doc) => {
    var tempTemp = this.state.tempMeta;
    if((this.state.tags).every(tag => (doc.grant.tags).includes(tag))) {
      tempTemp.push({dist: doc.dist, grant: doc.grant});
      this.setState({tempMeta: tempTemp, tftResults: tempTemp});
    }
  }

  setByTags = () => { 
    var myMeta = this.state.metaGrants;
    this.setState({tempMeta: [], tftResults: []}, () => {
      (myMeta).forEach(this.addByTag);
      this.setByFreeText();
    });   
  }

  addByFreeText = (doc) => {
    var tempTemp = this.state.tempMeta;
    var docText = (doc.grant.desc + doc.grant.title + doc.grant.nonprofitName + doc.grant.cfName).toLowerCase();
    if((this.state.freeText).every(freeText => (docText).includes(freeText.toLowerCase()))) {
      //console.log("np name: ", doc.grant.nonprofitName);
      tempTemp.push({dist: doc.dist, grant: doc.grant});
      this.setState({tempMeta: tempTemp, tftResults: tempTemp});
    }
  }

  setByFreeText = () => { 
    var myMeta = this.state.tempMeta;
    this.setState({tempMeta: [], tftResults: []}, () => {
      (myMeta).forEach(this.addByFreeText);
      this.locationCallback(this.state.radius);
    });   
  }

  radiusCallback = (radius) => {  
    //console.log("central location: ", this.state.centerLoc);  
    var newRadRes = [];  
    if(radius === -1) {
      newRadRes = this.state.tftResults;
    }
    else {
      this.state.tftResults.forEach((meta) => {
        //console.log("distance from center: ", meta.dist);
        //console.log("radius: ", radius);
        //console.log("meta.dist < radius", meta.dist < radius);
        if(meta.dist < radius) {
          newRadRes.push(meta);
          //console.log("radius grant results: ", newRadRes);
        }
      }); 
    }
    this.setState({radiusResults: newRadRes}, ()=>{
      this.sortByCallback(this.state.sortBy);
    });
    
  }

  locationCallback = (location) => {
    this.setState({centerLoc: location}, () => {
      console.log("new location: ", location);
      this.setDists();
    });
  }

  addDist = (doc) => {
    let newDist = helper.calcDistance(this.state.centerLoc.lat, this.state.centerLoc.long, doc.grant.lat, doc.grant.long);
    var tempTemp = this.state.tempMeta;
    tempTemp.push({dist: newDist, grant: doc.grant});
    tempTemp.sort((a, b) => { return (a.dist - b.dist)});
    this.setState({tempMeta: tempTemp}
    );
  }

  setDists = () => {
    var localGrants = this.state.tftResults; 
    this.setState({tempMeta: []}, () => {
      localGrants.forEach(this.addDist); 
      this.setState({tftResults: this.state.tempMeta}, ()=> {
        this.radiusCallback(this.state.radius);
      });
    });
  }

  sortByCallback = (sortBy) => {
    var sortedBy = this.state.radiusResults; //[this.state.radiusResults || this.state.metaGrants];
    if(sortBy === "deadline") { 
      sortedBy.sort((a, b) => { return (a.grant.dateDeadline.seconds - b.grant.dateDeadline.seconds)});
    } else if(sortBy === "posting") {
      sortedBy.sort((a, b) => { return (a.grant.datePosted.seconds - b.grant.datePosted.seconds)});
    } else if(sortBy === "goalD") {
      sortedBy.sort((a, b) => { return ((b.grant.moneyRaised / b.grant.goalAmt) - (a.grant.moneyRaised / a.grant.goalAmt))});
    } else if(sortBy === "goalI") {
      sortedBy.sort((a, b) => { return ((a.grant.moneyRaised / a.grant.goalAmt) - (b.grant.moneyRaised / b.grant.goalAmt))});
    } else if(sortBy === "size") {
      sortedBy.sort((a, b) => { return (a.grant.goalAmt - b.grant.goalAmt)});
    } else {console.log("nothing selected?");}
    this.setState({sortedResults: sortedBy, sortBy: sortBy}, () => {
      this.props.parentCallback(sortedBy);
    });
  }
  
  render() {
    return (
      <div className={styles.searchWrapper}>
        <Grid container spacing={2} >
          <Grid item xs={12} md={6} lg={4}>
            <TagSearch parentCallback={this.tagFreeTextCallback}/>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <LocationSearch parentCallback={this.locationCallback}/>
          </Grid>
          <Grid item xs={6} lg={2}>
            <SearchRadius parentCallback={this.radiusCallback}/>
          </Grid>
          <Grid item xs={6} lg={2}>
            <SortBy parentCallback={this.sortByCallback}/>
          </Grid>
        </Grid>
      </div>  
    );
  }
}

export default withStyles(styles)(Search);

