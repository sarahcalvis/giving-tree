import React, {Component} from 'react';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

import * as helper from '../helpers/SearchHelper.js'; 

import LocationSearch from "./LocationSearch";
import SearchRadius from "./SearchRadius";
import SortBy from "./SortBy";
import TagSearch from "./TagSearch";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
 
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];

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
      console.log("tags and free text: ", tagsAndFreeText);
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
      console.log("np name: ", doc.grant.nonprofitName);
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
    console.log("central location: ", this.state.centerLoc);  
    var newRadRes = [];  
    if(radius === -1) {
      newRadRes = this.state.tftResults;
    }
    else {
      this.state.tftResults.forEach((meta) => {
        console.log("distance from center: ", meta.dist);
        console.log("radius: ", radius);
        console.log("meta.dist < radius", meta.dist < radius);
        if(meta.dist < radius) {
          newRadRes.push(meta);
          console.log("radius grant results: ", newRadRes);
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
    const filterOptions = createFilterOptions({
      matchFrom: 'start'
    });

    return (
      <div className={styles.searchWrapper}>
        <Grid container spacing={2} >
          <Grid item xs={12} md={6} lg={4}>
            <Autocomplete
              id="combo-box-demo"
              options={top100Films}
              getOptionLabel={(option) => option.title}
              style={{ width: 300 }}
              filterOptions={filterOptions}
              renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
            />
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
  /*
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
  */
}

export default withStyles(styles)(Search);

