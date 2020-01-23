import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function LargeGrantCard(props) {
  let { grant } = useParams();
  console.log(grant);
  return (
    <div>
      <p>Large grant card!</p>
      <Link to={'/' + grant + '/give'}>click to donate</Link>
    </div>
  );
}
