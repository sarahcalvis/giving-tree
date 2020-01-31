import React, { useEffect } from 'react';
import Link from '@material-ui/core/Link';

export default function ContactPopout(props) {
  const [cfName, setCfName] = React.useState(props.cfName);
  const [cfUrl, setCfUrl] = React.useState(props.cfUrl);
  const [cfEmail, setCfEmail] = React.useState(props.cfEmail);
  const [cfPhone, setCfPhone] = React.useState(props.cfPhone);
  const [nonprofitName, setNonprofitName] = React.useState(props.nonprofitName);
  const [nonprofitUrl, setNonprofitUrl] = React.useState(props.nonprofitUrl);
  const [nonprofitEmail, setNonprofitEmail] = React.useState(props.nonprofitEmail);
  const [nonprofitPhone, setNonprofitPhone] = React.useState(props.nonprofitPhone);

  useEffect(() => { setCfName(props.cfName); }, [props.cfName]);
  useEffect(() => { setCfUrl(props.cfUrl) }, [props.cfUrl]);
  useEffect(() => { setCfEmail(props.cfEmail) }, [props.cfEmail]);
  useEffect(() => { setCfPhone(props.cfPhone) }, [props.cfPhone]);
  useEffect(() => { setNonprofitName(props.nonprofitName); }, [props.nonprofitName]);
  useEffect(() => { setNonprofitUrl(props.nonprofitUrl) }, [props.nonprofitUrl]);
  useEffect(() => { setNonprofitEmail(props.nonprofitEmail) }, [props.nonprofitEmail]);
  useEffect(() => { setNonprofitPhone(props.nonprofitPhone) }, [props.nonprofitPhone]);

  return (
    <div>
      <p>Please contact <Link
        textDecoration='none'
        color='inherit'
        target='_blank'
        rel='noopener noreferrer'
        href={cfUrl}>{cfName}</Link> with any concerns at {cfPhone} or {cfEmail}</p>
      <p><Link
        textDecoration='none'
        color='inherit'
        target='_blank'
        rel='noopener noreferrer'
        href={nonprofitUrl}>{nonprofitName}</Link> can be reached at {nonprofitPhone} or {nonprofitEmail}</p>
    </div>
  )
}