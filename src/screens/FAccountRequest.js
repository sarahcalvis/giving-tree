import React, { useEffect } from 'react';
export default function FAccountRequest() {
  // Set tab title
  useEffect(() => { document.title = 'Giving Tree: Request Account' }, []);

  return (
    <p>Account request screen</p>
  )
}