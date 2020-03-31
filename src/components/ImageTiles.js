import React, { useEffect } from 'react';

import Text from './Text.js';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'none',
  },
  padding: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  gridList: {
    width: 800,
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  img: {
    maxWidth: 200,
    maxHeight: 200,
  },
  centeredIcon: {
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  largeIcon: {
    fontSize: '5em',
  },
}))

export default function EditGrant(props) {
  // Styles
  const classes = useStyles();

  return (
    <div className={classes.padding}>
      <Text type='card-heading' text='Grant Images' />
      <GridList cellHeight={200} spacing={1} className={classes.gridList} >
        <GridListTile
          className={classes.img}
          key={'Upload another'}
          cols={1}
          rows={1}>
          <div className={classes.centeredIcon}>
            <label htmlFor='file-upload'>
              <IconButton
                component='span'>
                <AddPhotoAlternateIcon className={classes.largeIcon} />
              </IconButton>
            </label>
          </div>
        </GridListTile>
        {props.url.length > 0 && props.url.map(u => (
          <GridListTile className={classes.img} key={u.name} cols={1} rows={1}>
            <img src={u.url} />
            <GridListTileBar
              title={u.name}
              id={u.name}
              className={classes.titleBar}
              actionIcon={
                <IconButton
                  id={u.name}
                  onClick={props.removeImage}
                  style={{ color: 'white' }}
                  aria-label={`delete image`}>
                  <DeleteIcon id={u.name} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      <input
        className={classes.input}
        id='file-upload'
        type='file'
        accept='image/png, image/jpeg'
        ref={props.fileInput}
        onChange={props.uploadImages}
        multiple />
    </div>
  );
}