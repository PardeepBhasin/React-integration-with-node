import React from 'react';
import MuiThemeProvider from '../../../node_modules/material-ui/styles/MuiThemeProvider';
import AppBar from '../../../node_modules/material-ui/AppBar';
import IconMenu from '../../../node_modules/material-ui/IconMenu';
import IconButton from '../../../node_modules/material-ui/IconButton';
import FontIcon from '../../../node_modules/material-ui/FontIcon';
import NavigationExpandMoreIcon from '../../../node_modules/material-ui/svg-icons/navigation/expand-more';
import MenuItem from '../../../node_modules/material-ui/MenuItem';
import DropDownMenu from '../../../node_modules/material-ui/DropDownMenu';
import RaisedButton from '../../../node_modules/material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from '../../../node_modules/material-ui/Toolbar';

export class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 3
        };
        this.handleChange = this.handleChange.bind(this)
    }
    render() {
         var buttonStyle = {
            backgroundColor: 'transparent',
            color: 'white'
        };
        return (
            <div>
                <MuiThemeProvider>
                   <Toolbar>
                        <ToolbarGroup firstChild={true}>
                            <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                                <MenuItem value={1} primaryText="About" />
                                <MenuItem value={2} primaryText="Home" />
                                <MenuItem value={3} primaryText="React + Node Crud" />
                                <MenuItem value={7} primaryText="Users" />
                            </DropDownMenu>
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <RaisedButton label="About" primary={true} />
                            <ToolbarSeparator />
                            <RaisedButton label="HOME" primary={true} />
                            <IconMenu
                                iconButtonElement={
                                <IconButton touch={true}>
                                    <NavigationExpandMoreIcon />
                                </IconButton>
                                }
                            >
                                <MenuItem primaryText="Login" />
                            </IconMenu>
                        </ToolbarGroup>
                </Toolbar>
                </MuiThemeProvider>
            </div>
        );
    }

    handleChange (event, index, value) {
        this.setState({value});
    }

}

export default HeaderComponent;