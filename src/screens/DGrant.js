import React from 'react';
import LargeGrantCard from '../components/LargeGrantCard.js';

export default function DGrant(props) {
  let grantId = props.location.state.grantId;
  return (
    <LargeGrantCard grantId={grantId} />
  );
}
