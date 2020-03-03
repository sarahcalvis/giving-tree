import React, { useEffect } from 'react';

import { Button, Typography, Container, FormControl, InputLabel, Input, TextField, } from '@material-ui/core';
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
		<Container maxWidth="md">
			<Typography variant="h5">
				{props.name}
			</Typography>

			<List>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<TitleIcon />
						</Avatar>
					</ListItemAvatar>
					<FormControl>
						<TextField label={'Foundation Name'} defaultValue={props.cfInfo.name} onChange={(e, f) => onChange(e, 'name')} helperText={helperText.name} />
					</FormControl>
				</ListItem>

				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<EmailIcon />
						</Avatar>
					</ListItemAvatar>
					<FormControl>
						<TextField label='Public Email' defaultValue={props.cfInfo.public_email} onChange={(e, f) => onChange(e, 'public_email')} helperText={helperText.public_email}/>
					</FormControl>
				</ListItem>

				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<PhoneIcon />
						</Avatar>
					</ListItemAvatar>
					<FormControl>
						<TextField label='Public Phone' defaultValue={props.cfInfo.public_phone} onChange={(e, f) => onChange(e, 'public_phone')} helperText={helperText.public_phone}/>
					</FormControl>
				</ListItem>

				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<HttpIcon />
						</Avatar>
					</ListItemAvatar>
					<FormControl>
						<TextField label='Foundation URL' defaultValue={props.cfInfo.foundation_url} onChange={(e, f) => onChange(e, 'foundation_url')} helperText={helperText.foundation_url}/>
					</FormControl>
				</ListItem>

				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<ContactsIcon />
						</Avatar>
					</ListItemAvatar>
					<FormControl>
						<TextField label='Contact First Name' defaultValue={props.cfInfo.fname_contact} onChange={(e, f) => onChange(e, 'fname_contact')} helperText={helperText.fname_contact}/>
					</FormControl>
				</ListItem>

				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<ContactsOutlinedIcon />
						</Avatar>
					</ListItemAvatar>
					<FormControl>
						<TextField label='Contact Last Name' defaultValue={props.cfInfo.lname_contact} onChange={(e, f) => onChange(e, 'lname_contact')} helperText={helperText.lname_contact}/>
					</FormControl>
				</ListItem>

				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<AlternateEmailIcon />
						</Avatar>
					</ListItemAvatar>
					<FormControl>
						<TextField label='Contact Email' disabled={true} defaultValue={props.cfInfo.personal_email} />
					</FormControl>
				</ListItem>

				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<PhoneIphoneIcon />
						</Avatar>
					</ListItemAvatar>
					<FormControl>
						<TextField label='Contact Phone' defaultValue={props.cfInfo.personal_phone} onChange={(e, f) => onChange(e, 'personal_phone')} helperText={helperText.personal_phone}/>
					</FormControl>
				</ListItem>
			</List>

			<Button onClick={props.toggleEdit}>Discard</Button>
			<Button onClick={submitForm}>Save</Button>
		</Container>
	);
}