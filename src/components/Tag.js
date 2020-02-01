import React, { useEffect } from 'react';
export default function Tag(props) {
  const [tag, setTag] = React.useState(props.tag);
  const [removable, setRemovable] = React.useState(props.removable);

  useEffect(() => { setTag(props.tag) }, [props.tag]);
  useEffect(() => { setRemovable(props.removable) }, [props.removable]);

  return (
    <p>{removable ? 'removable ' : 'not removable '} {tag}</p>
  )
}