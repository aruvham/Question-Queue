import { remove } from 'lodash';
import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';

class NavBar extends React.Component {
	constructor(props) {
	    super(props);

	    // Parse cookie to set up a user object with user's name and role
	    const user = {};

	    document.cookie.split(';').forEach((str) => {
			const [k, v] = str.split('=').map(s => s.trim());
				if (k === 'username' || k === 'role' || k === 'img') {
				user[k] = v;
			}
	    });

	    this.state = {
	    	open: false,
			user,
	    };

	    this.state.user.img = unescape(this.state.user.img);

	    //console.log(user);

	    // Navigation stuff
	    this.openDrawer = this.openDrawer.bind(this);
	    this.handleToggle = this.handleToggle.bind(this);
	    this.handleClose = this.handleClose.bind(this);
	}


	// Navigation
	openDrawer() {
		console.log("open drawer");
		this.setState({open: true});
	}

	handleToggle() {
		this.setState({open: !this.state.open});
	}

	handleClose() {
		this.setState({open: false});
	}

	render() {
		return (
			<MuiThemeProvider>
			<div>
			<AppBar
				className="appbar"
	            title="Question Queue"
	            onLeftIconButtonTouchTap = {this.openDrawer}
	            iconElementRight = {<IconMenu iconButtonElement={
	                <IconButton><MoreVertIcon /></IconButton>
	              }
	              targetOrigin={{horizontal: 'right', vertical: 'top'}}
	              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
	            >
					<MenuItem href="/auth/logout" primaryText="Sign out" />
	            </IconMenu>}
	          />

				<Drawer
				docked={false}
				width={275}
				open={this.state.open}
				onRequestChange={(open) => this.setState({open})}
				>
					<AppBar title="Question Queue" showMenuIconButton={false} />
					<MenuItem className="navbarItem" href="#/home" onTouchTap={this.handleClose}>
					  <i className="material-icons">home</i>
					  <span className="navbarText"> Home </span>
					</MenuItem>
					<MenuItem className="navbarItem" href="#/question" onTouchTap={this.handleClose}>
					  <i className="material-icons">speaker_notes</i>
					  <span className="navbarText"> Ask Question </span>
					</MenuItem>
					<MenuItem className="navbarItem" href="#/profile" onTouchTap={this.handleClose}>
					  <i className="material-icons">account_circle</i>
					  <span className="navbarText"> Profile </span>
					</MenuItem>
					{ this.state.user.role == "admin" ? (
						<MenuItem className="navbarItem" href="#/manage" onTouchTap={this.handleClose}>
						  <i className="material-icons">settings</i>
						  <span className="navbarText"> Manage </span>
						</MenuItem> ) :  <span /> }
					{ this.state.user.role == "admin" ? (
						<MenuItem className="navbarItem" href="#/analytics" onTouchTap={this.handleClose}>
						  <i className="material-icons">show_chart</i>
						  <span className="navbarText"> Analytics </span>
						</MenuItem>) :  <span /> }
					<MenuItem className="navbarItem" onTouchTap={this.handleClose}>
					  <i className="material-icons">highlight_off</i>
					  <span className="navbarText"> Close </span>
					</MenuItem>
				</Drawer>
			</div>
			</MuiThemeProvider>
		)
	}


}

export default NavBar;
