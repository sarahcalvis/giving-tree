import React, { useEffect } from 'react';

import { Button, Typography, Container, FormControl, InputLabel, Input, } from '@material-ui/core';
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

export default function EditableData(props){
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
						<InputLabel htmlFor="component-simple">Foundation Name</InputLabel>
						<Input defaultValue={props.name} key={"name"} onChange={e => props.setName(e.target.value)} />
					</FormControl>
				</ListItem>

				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<EmailIcon />
						</Avatar>
					</ListItemAvatar>
					<FormControl>
						<InputLabel htmlFor="component-simple">Public Email</InputLabel>
						<Input defaultValue={props.email} onChange={e => props.setEmail(e.target.value)} />
					</FormControl>
				</ListItem>

				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<PhoneIcon />
						</Avatar>
					</ListItemAvatar>
					<FormControl>
						<InputLabel htmlFor="component-simple">Public Phone</InputLabel>
						<Input defaultValue={props.phone} onChange={e => props.setPhone(e.target.value)} />
					</FormControl>
				</ListItem>

				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<HttpIcon />
						</Avatar>
					</ListItemAvatar>
					<FormControl>
						<InputLabel htmlFor="component-simple">Foundation URL</InputLabel>
						<Input defaultValue={props.url} onChange={e => props.setUrl(e.target.value)} />
					</FormControl>
				</ListItem>

				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<ContactsIcon />
						</Avatar>
					</ListItemAvatar>
					<FormControl>
						<InputLabel htmlFor="component-simple">Contact First Name</InputLabel>
						<Input defaultValue={props.contactFirstName} onChange={e => props.setContactFirstName(e.target.value)} />
					</FormControl>
				</ListItem>

				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<ContactsOutlinedIcon />
						</Avatar>
					</ListItemAvatar>
					<FormControl>
						<InputLabel htmlFor="component-simple">Contact Last Name</InputLabel>
						<Input defaultValue={props.contactLastName} onChange={e => props.setContactLastName(e.target.value)} />
					</FormControl>
				</ListItem>

				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<AlternateEmailIcon />
						</Avatar>
					</ListItemAvatar>
					<FormControl>
						<InputLabel htmlFor="component-simple">Contact Email (Cannot be changed here!)</InputLabel>
						<Input disabled={true} defaultValue={props.contactEmail} onChange={e => props.setContactEmail(e.target.value)} />
					</FormControl>
				</ListItem>

				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<PhoneIphoneIcon />
						</Avatar>
					</ListItemAvatar>
					<FormControl>
						<InputLabel htmlFor="component-simple">Contact Phone</InputLabel>
						<Input defaultValue={props.contactPhone} onChange={e => props.setContactPhone(e.target.value)} />
					</FormControl>
				</ListItem>
			</List>

			<Button onClick={props.toggleEdit}>Discard</Button>
			<Button onClick={props.onSubmit}>Save</Button>
		</Container>
	);
}