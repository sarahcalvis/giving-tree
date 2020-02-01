import React, { useEffect } from 'react';
export default function FSettings() {
  // Set tab title
  useEffect(() => { document.title = 'Settings- Giving Tree'; }, []);

  return (
    <p>Foundation settings!</p>
  );
}