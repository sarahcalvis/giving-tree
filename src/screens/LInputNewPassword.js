import React, { useEffect } from 'react';

export default function LInputNewPassword() {
  // Set tab title
  useEffect(() => { document.title = 'Input new password' }, []);

  return (
    <p>Input a new password</p>
  );
}