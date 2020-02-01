import React, { useEffect } from 'react';
export default function LRequestNewPassword() {
  // Set tab title
  useEffect(() => { document.title = 'Request New Password'}, []);

  return (
    <p>Request a new password</p>
  );
}