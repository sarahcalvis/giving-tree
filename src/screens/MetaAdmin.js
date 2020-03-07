import React from 'react';

import Foundation from '../components/Foundation.js';

export default function MetaAdmin() {
  const cfName = "Test CF";
  return(
    <div>
      <Foundation cfName={cfName}></Foundation>
    </div>
    
  );
}