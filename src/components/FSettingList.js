import React, { useEffect, Component } from 'react';
import { Link } from 'react-router-dom';

import { Button, Typography, Container, Grid} from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import TitleIcon from '@material-ui/icons/Title'
import PhoneIcon from '@material-ui/icons/Phone';
import HttpIcon from '@material-ui/icons/Http';
import EmailIcon from '@material-ui/icons/Email';
import ContactsIcon from '@material-ui/icons/Contacts';
import ContactsOutlinedIcon from '@material-ui/icons/ContactsOutlined';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function NonEditableData(props){
	return (
		<Container maxWidth="lg">
			<Grid container direction={'column'} style={{ 'margin-bottom': 15 }}>
				<Typography variant="h4">
					{props.cfInfo.name}
				</Typography>
				<Grid container direction='row'>
					<Button 
						color='primary'
						onClick={props.toggleEdit} 
						variant='outlined'
						style={{ 'margin': 2 }}
					>
						Edit
					</Button>
					<Link to={{ pathname: "/forgot" }}>
						<Button 
							variant='outlined'
							style={{ 'margin': 2}}
						>
							Change Password
						</Button>
					</Link>
					<ToggleActive 
						active={props.cfInfo.status}
						toggleAccountActive={props.toggleAccountActive}
					/>
				</Grid>
			</Grid>
			
			<Grid container direction={'row'}>
				<Grid item xs="6">
					<Typography variant="h5">Public Information</Typography>
					<Typography variant="p" paragraph={true}>This information will be displayed on all published giving opportunities.</Typography>
					<Grid container direction={'column'} spacing={2}>
						<StaticItem 
							icon={<TitleIcon />}
							label={"Foundation Name"}
							value={props.cfInfo.name}
						/>
						<StaticItem 
							icon={<EmailIcon />}
							label={"Public Email"}
							value={props.cfInfo.public_email}
						/>
						<StaticItem 
							icon={<PhoneIcon />}
							label={"Public Phone"}
							value={props.cfInfo.public_phone}
						/>
						<StaticItem 
							icon={<HttpIcon />}
							label={"Foundation URL"}
							value={props.cfInfo.foundation_url}
						/>
					</Grid>
				</Grid>
				
				<Grid item maxWidth="6">
					<Typography variant="h5">Personal Contact Information</Typography>
					<Typography variant="p" paragraph={true}>This information will be used to sign into and manage your account.</Typography>
					<Grid container direction={'column'} spacing={2}>
						<StaticItem 
							icon={<ContactsIcon />}
							label={"Contact First Name"}
							value={props.cfInfo.fname_contact}
						/>
						<StaticItem 
							icon={<ContactsOutlinedIcon />}
							label={"Contact Last Name"}
							value={props.cfInfo.lname_contact}
						/>
						<StaticItem 
							icon={<AlternateEmailIcon />}
							label={"Contact Email"}
							value={props.cfInfo.personal_email}
						/>
						<StaticItem 
							icon={<PhoneIphoneIcon />}
							label={"Contact Phone"}
							value={props.cfInfo.personal_phone}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Container>
		
	);
}


function StaticItem(props) {
	return(
		<Grid container item spacing={2}>
			<Grid item>
				<Avatar>
					{React.cloneElement(props.icon)}
				</Avatar>
			</Grid>
			<Grid item sm container>
				<ListItemText 
					primary={props.label}
					secondary={props.value} 
				/>
			</Grid>
		</Grid>
	);
}


function ToggleActive(props) {
	console.log(props.active);
	const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleYesClose = () => {
		props.toggleAccountActive();
		setOpen(false);
	};
	const handleNoClose = () => {
    setOpen(false);
	};
	
	if(props.active === 'current'){
		return(
			<div>
				<Button 
					color='secondary'
					onClick={handleClickOpen} 
					variant='contained'
					style={{ 'margin': 2 }}
				>Deactivate Account</Button>
				<Dialog
					open={open}
					onClose={handleNoClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Are you sure you would like to deactivate your account?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleNoClose} color="primary">
							No
						</Button>
						<Button onClick={handleYesClose} color="secondary" variant='contained' autoFocus>
							Yes
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}else if(props.active === 'deactivated'){
		return(
			<div>
				<Button 
					color='primary'
					onClick={handleClickOpen} 
					variant='contained'
					style={{ 'margin': 2 }}
				>Activate Account</Button>
				<Dialog
					open={open}
					onClose={handleNoClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Are you sure you would like to activate your account?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleNoClose} color="secondary">
							No
						</Button>
						<Button onClick={handleYesClose} color="primary" variant='contained' autoFocus>
							Yes
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
	else{
		return(null);
	}
}