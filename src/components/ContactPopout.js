import React from 'react';
export default function ContactPopout (props) {
  const [nonprofitId] = React.useState(props.nonprofitId);
  const [cfId] = React.useState(props.cfId);
  return (
    <p>Contact Popout {nonprofitId} {cfId}</p>
  )
}