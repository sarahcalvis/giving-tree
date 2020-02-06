import React from 'react';
import TextField from '@material-ui/core/TextField';
// TODO: address might be its own thing
export default function Validation(props) {
  return (
    <div>
      {props.type === 'email' &&
        <TextField fullWidth label={props.label} />
      }
      {props.type === 'phone' &&
        <TextField fullWidth label={props.label} />
      }
      {props.type === 'username' &&
        <TextField fullWidth label={props.label} />
      }
      {props.type === 'password' &&
        <TextField fullWidth label={props.label} />
      }
      {props.type === 'address' &&
        <TextField fullWidth label={props.label} />
      }
      {props.type === 'money' &&
        <TextField fullWidth label={props.label} />
      }
      {!props.type &&
        <TextField fullWidth label={props.label} />
      }
    </div>
  )
}