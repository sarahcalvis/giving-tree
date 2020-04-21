import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import * as helper from '../helpers/SearchHelper.js';

import LocationSearch from "./LocationSearch";
import SearchRadius from "./SearchRadius";
import SortBy from "./SortBy";
import TagSearch from "./TagSearch";

const useStyles = makeStyles(theme => ({
  searchWrapper: {
    display: 'flex',
    'flex-wrap': 'wrap',
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    maxWidth: 400,
  },
}));

export default function Search(props) {
  const classes = useStyles();
  
  //State Variables
  const [searchDocs, setSearchDocs] = useState([{ dist: -1, data: {}}]);
  const [searchResults, setSearchResults] = useState([{ dist: -1, data: {}}]);
  const [tagSearchResults, setTagSearchResults] = useState({tags: [], freeText: []});
  const [radius, setRadius] = useState(-1);
  const [location, setLocation] = useState({address: '', lat: -1000, long: -1000});
  const [sortBy, setSortBy] = useState('');
  const [updateDistCount, setUpdateDistCount] = useState(0);

  //Destructure props
  const props_docs = props.docs;
  const props_parentCallback = props.parentCallback;

  useEffect(() => {
    console.log(1);
    let newSearchDocs = [];
    props_docs.forEach((doc) => {
      newSearchDocs.push({ dist: -1, data: doc});
    });
    setSearchDocs(newSearchDocs);
  }, [props_docs]);

  //Filters the results when search component values change
  useEffect(() => {
    console.log(2);
    let results = searchDocs.filter((searchDoc) => {
      const {tags, freeText} = tagSearchResults;
      const dat = searchDoc.data;
      const dist = searchDoc.dist;

      //Check that doc includes all tags in the search
      if (tags.length !== 0){
        const lcTags = dat.tags.map(t => t.toLowerCase());
        if (!tags.every(tag => (lcTags).includes(tag.toLowerCase()))) return false;
      } 
      //Check that doc includes all free text in the search
      if (freeText.length !== 0) {
        const docText = (dat.desc + dat.title + dat.nonprofitName + dat.cfName).toLowerCase();
        if(!freeText.every(el => (docText).includes(el.toLowerCase()))) return false;
      }
      //Check that doc is within the radius specified
      if(radius !== -1 && dist > radius) return false;
      
    });

    setSearchResults(results);

  }, [props_parentCallback, searchDocs, tagSearchResults, updateDistCount, radius]);

  //Sorts and returns the search results when either they or sortBy changes
  useEffect(() => {
    console.log(3);
    let sortedResults = searchResults.slice();
    sortedResults.sort((a, b) => { return (a.data.dist - b.data.dist)});

    switch(sortBy){
      case "deadline":
        sortedResults.sort((a, b) => { return (a.data.dateDeadline.seconds - b.data.dateDeadline.seconds)});
        break;
      case "posting":
        sortedResults.sort((a, b) => { return (a.data.datePosted.seconds - b.data.datePosted.seconds)});
        break;
      case "goalD":
        sortedResults.sort((a, b) => { return ((b.data.moneyRaised / b.data.goalAmt) - (a.data.moneyRaised / a.data.goalAmt))});
        break;
      case "goalI":
        sortedResults.sort((a, b) => { return ((a.data.moneyRaised / a.data.goalAmt) - (b.data.moneyRaised / b.data.goalAmt))});
        break;
      case "sizeI":
        sortedResults.sort((a, b) => { return (a.data.goalAmt - b.data.goalAmt)});
        break;
      case "sizeD":
        sortedResults.sort((a, b) => { return (b.data.goalAmt - a.data.goalAmt)});
        break;
      default:
    }

    props_parentCallback(sortedResults);
  }, [props_parentCallback, sortBy, searchResults]);

  //Updates the distances of grants when location changes
  useEffect(() => {
    console.log(4);
    searchDocs.map((searchDoc) => searchDoc.dist = helper.calcDistance(location.lat, location.long, searchDoc.data.lat, searchDoc.data.long));
    setUpdateDistCount(u => u+1); //Bad practice
  }, [location, searchDocs]);


  const tagFreeTextCallback = (tagsAndFreeText) => setTagSearchResults({ tags: tagsAndFreeText.tags, freeText: tagsAndFreeText.freeText });
  const radiusCallback = (radius) => setRadius(radius);
  const sortByCallback = (sortBy) => setSortBy(sortBy);
  const locationCallback = (location) => setLocation(location);

  return (
    <div className={classes.searchWrapper}>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6} lg={4}>
          <TagSearch parentCallback={tagFreeTextCallback} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <LocationSearch parentCallback={locationCallback} />
        </Grid>
        <Grid item xs={6} lg={2}>
          <SearchRadius
            parentCallback={radiusCallback} />
        </Grid>
        <Grid item xs={6} lg={2}>
          <SortBy parentCallback={sortByCallback} />
        </Grid>
      </Grid>
    </div>
  );
}
