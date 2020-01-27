// from hamzaq aisrani medium article
// Imports
import React, { Component } from 'react';
// import AutoComplete from 'material-ui/AutoComplete';
// Import Search Bar Components
import SearchBar from 'material-ui-search-bar';

// Import React Scrit Libraray to load Google object
import Script from 'react-load-script';

class AutoCompleteSearchBar extends Component {
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      city: '',
      query: ''
    };

  }

  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const options = {
      types: ['(cities)'],
    };

    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    this.autocomplete.setFields(['address_components', 'formatted_address']);

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }
  
  handlePlaceSelect = () => {

    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      // Set State
      this.setState(
        {
          city: address[0].long_name,
          query: addressObject.formatted_address,
        }
      );
    }
  }

  render() {
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=your_api_key&libraries=places"
          onLoad={this.handleScriptLoad}
        />
        <SearchBar id="autocomplete" placeholder="" hintText="Search City" value={this.state.query}
          style={{
            margin: '0 auto',
            maxWidth: 800,
          }}
        />
      </div>
    );
  }
}

export default AutoCompleteSearchBar;

/*

// Imports
import React, { useState, useRef } from "react";

// Import Search Bar Components
import SearchBar from "material-ui-search-bar";

// Import React Scrit Libraray to load Google object
import Script from "react-load-script";

export default function Search(props) {
  var autocomplete = useRef();
  console.log("hi");
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");

  function handleScriptLoad() {
    // Declare Options For Autocomplete
    const options = {
      types: ["(cities)"]
    }; // To disable any eslint 'google not defined' errors

    // Initialize Google Autocomplete

    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    autocomplete.setFields(["address_components", "formatted_address"]);

    // Fire Event when a suggested name is selected
    autocomplete.addListener("place_changed", handlePlaceSelect);
  }
  function handlePlaceSelect() {
    // Extract City From Address Object
    const addressObject = autocomplete.getPlace();
    const address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      // Set stuff
      setCity(address[0].long_name);
      setQuery(addressObject.formatted_address);
    }
  }

  return (
    <div>
      <p>hello</p>
    </div>
    
    <div>
      <div>{city}</div>
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=your_api_key&libraries=places"
          onLoad={handleScriptLoad}
        />
        <SearchBar
          id="autocomplete"
          placeholder=""
          hintText="Search City"
          value={query}
          style={{
            margin: "0 auto",
            maxWidth: 800
          }}
        />
      </div>
    </div>
    
  );
}
*/