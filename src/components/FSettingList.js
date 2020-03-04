import React, { useEffect, Component } from 'react';

import { Button, Typography, Container, FormControl, InputLabel, Input, Grid, Paper, } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
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

export default function NonEditableData(props){
	return (
		<Container maxWidth="lg">
			<Typography variant="h4">
				{props.cfInfo.name}
			</Typography>
			<Grid container direction={'row'}>
				<Grid item xs="6">
					<Typography variant="h5">
						Public Information
					</Typography>
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
					<Typography variant="h5">
						Giving Tree Contact Information
					</Typography>
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
			<Button onClick={props.toggleEdit}>Edit</Button>
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