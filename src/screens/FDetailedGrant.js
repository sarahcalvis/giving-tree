import React, {useEffect} from 'react';
export default function FDetailedGrant() {
  // Set tab title
  useEffect(() => { document.title = 'Grant name here' }, []);

  return(
    <p>Foundation Detailed Grant!</p>
  );
}