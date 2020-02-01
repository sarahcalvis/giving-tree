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
          variant="h5"
        >
          {text}
        </Typography>
      }
      {type === "card-aboveheading" &&
        <Typography
          variant="button"
          color="primary" 
          component="p">
          {text}
        </Typography>
      }
      {type === "card-subheading" &&
        <Typography
          variant="body2"
          color="textSecondary" 
          component="p"
          gutterBottom>
          {text}
        </Typography>
      }
      {type === "tag" &&
        <Typography
          variant="body2">
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

