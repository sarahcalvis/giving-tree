import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useEffect } from 'react';

export default function Text(props) {
  const [text, setText] = React.useState(props.text);
  const [type, setType] = React.useState(props.type);

  useEffect(() => { setText(props.text); }, [props.text]);
  useEffect(() => { setType(props.type); }, [props.type]);

  return (
    <div>
      {type === "card-heading" &&
        <Typography
          component="h1"
          variant="h4">
          {text}
        </Typography>
      }
      {type === "card-subheading" &&
        <Typography
          component="h1"
          color="textSecondary"
          variant="subtitle1">
          {text}
        </Typography>
      }
      {type === "progress-bold" &&
        <Typography
          variant="subtitle1">
          <Box fontWeight="fontWeightBold">
            {text}
          </Box>
        </Typography>
      }
      {type === "progress" &&
        <Typography
          variant="subtitle1">
          {text}
        </Typography>
      }
    </div>
  );
}

