import React from 'react';
import SmallGrantCard from '../components/SmallGrantCard.js';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

export default function DDashboard() {
  return (
    <Container maxWidth='md'>
      <Grid container spacing={2} >
        <SmallGrantCard
          grant='Grant Name'
          foundation='Foundation Name'
          nonprofit='Nonprofit Name'
          goal='100'
          raised='10'
          img='GivingTree.png' />
      <SmallGrantCard
          grant='Grant Name'
          foundation='Foundation Name'
          nonprofit='Nonprofit Name'
          goal='100'
          raised='10'
          img='GivingTree.png' />
      <SmallGrantCard
          grant='Grant Name'
          foundation='Foundation Name'
          nonprofit='Nonprofit Name'
          goal='100'
          raised='10'
          img='GivingTree.png' />
      </Grid>
    </Container>
  );
}
