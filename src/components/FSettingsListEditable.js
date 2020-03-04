import React, { useEffect } from 'react';

import { Button, Typography, Container, TextField, Grid } from '@material-ui/core';
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

import * as helper from '../helpers/ValidationHelper.js';

export default function EditableData(props){
	
	const [helperText, setHelperText] = React.useState({
    name: '',
    public_email: '',
    public_phone: '',
    foundation_url: '',
    fname_contact: '',
    lname_contact: '',
    personal_email: '',
    personal_phone: ''
	});
	
	const [changedText, setChangedText] = React.useState({});

	const onChange = (event, field) => {
		const value = event.target.value;
		setHelperText({ ...helperText, [field]: helper.validateField(field, value) },
			setChangedText({ ...changedText, [field]: value })
		);
	}

	const submitForm = () => {
		var canSubmit = true;
		for(const key in helperText){
			if(helperText[key] !== ''){
				canSubmit = false;
			}
		}
		if(canSubmit){
			props.onSubmit(changedText)
		}else{
			console.log("Dang it we can't, here's why: ");
			console.log(helperText)
		}
	}

	return (
		<Container maxWidth="lg">
		<Grid container direction={'column'} style={{ 'margin-bottom': 15 }}>
			<Typography variant="h4">
				{props.cfInfo.name}
			</Typography>
			<Grid container direction='row'>
				<Button 
					color='primary'
					onClick={submitForm} 
					variant='outlined'
					style={{ 'margin': 2 }}
				>
					Save
				</Button>
				<Button 
					onClick={props.toggleEdit} 
					variant='outlined'
					style={{ 'margin': 2 }}
				>
					Discard
				</Button>
			</Grid>
		</Grid>

			<Grid container direction={'row'}>
				<Grid item xs="6">
					<Typography variant="h5">Public Information</Typography>
					<Typography variant="p" paragraph={true}>This information will be displayed on all published giving opportunities.</Typography>
					<Grid container direction={'column'} spacing={3}>
						<EditItem 
							icon={<TitleIcon />}
							label={'Foundation Name'}
							default={props.cfInfo.name}
							change={(e, f) => onChange(e, 'name')}
							helper={helperText.name}
						/>
						<EditItem 
							icon={<EmailIcon />}
							label={'Public Email'}
							default={props.cfInfo.public_email}
							change={(e, f) => onChange(e, 'public_email')}
							helper={helperText.public_email}
						/>
						<EditItem 
							icon={<PhoneIcon />}
							label={'Public Phone'}
							default={props.cfInfo.public_phone}
							change={(e, f) => onChange(e, 'public_phone')}
							helper={helperText.public_phone}
						/>
						<EditItem 
							icon={<HttpIcon />}
							label={'Foundation URL'}
							default={props.cfInfo.foundation_url}
							change={(e, f) => onChange(e, 'foundation_url')}
							helper={helperText.foundation_url}
						/>
					</Grid>
				</Grid>

				<Grid item xs="6">
					<Typography variant="h5">Personal Contact Information</Typography>
					<Typography variant="p" paragraph={true}>This information will be used to sign into and manage your account.</Typography>
					<Grid container direction={'column'} spacing={3}>
						<EditItem 
							icon={<ContactsIcon />}
							label={'Contact First Name'}
							default={props.cfInfo.fname_contact}
							change={(e, f) => onChange(e, 'fname_contact')}
							helper={helperText.fname_contact}
						/>
						<EditItem 
							icon={<ContactsOutlinedIcon />}
							label={'Contact Last Name'}
							default={props.cfInfo.lname_contact}
							change={(e, f) => onChange(e, 'lname_contact')}
							helper={helperText.lname_contact}
						/>
						<EditItem 
							icon={<AlternateEmailIcon />}
							label={'Contact Email'}
							default={props.cfInfo.personal_email}
							helper={""}
							disabled={true}
						/>
						<EditItem 
							icon={<PhoneIphoneIcon />}
							label={'Contact Phone'}
							default={props.cfInfo.personal_phone}
							change={(e, f) => onChange(e, 'personal_phone')}
							helper={helperText.personal_phone}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}

function EditItem(props, disabled=false) {
	return(
		<Grid container item spacing={2}>
			<Grid item>
				<Avatar>
					{React.cloneElement(props.icon)}
				</Avatar>
			</Grid>
			<Grid item xs={8} sm container>
				<TextField 
					label={props.label} 
					defaultValue={props.default} 
					onChange={props.change} 
					helperText={props.helper} 
					disabled={props.disabled}
					error={props.helper !== ""}
					fullWidth
				/>
			</Grid>
		</Grid>
	);
}