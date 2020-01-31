import React, { useEffect } from 'react';
export default function Login() {
  // Set tab title
  useEffect(() => { document.title = 'Log in to Giving Tree' }, []);

  return (
    <div>
      <p>Hiya there it's time to log in</p>
    </div>
  );
}
