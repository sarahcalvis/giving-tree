import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function LargeGrantCard(props) {
  let { grant } = useParams();
  let grantId = props.grantId;
  return (
    <div>
      <p>Large grant card for the grant with ID {grantId}</p>
      <Link to={{
        pathname: '/grants/' + grant + '/give',
        state: { grantId: grantId }
      }}>Donate</Link>
    </div>
  );
}
