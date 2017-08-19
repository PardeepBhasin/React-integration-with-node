import React, {PropTypes} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as authorizeUserAction from '../../common/actions/userActions';
import MuiThemeProvider from '../../../node_modules/material-ui/styles/MuiThemeProvider';
import RaisedButton from '../../../node_modules/material-ui/RaisedButton';
import TextField from '../../../node_modules/material-ui/TextField';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from '../../../node_modules/material-ui/Table';

class AuthUserDetailComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user : '',
            selected: [1],
            fixedHeader: false,
            fixedFooter: false,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: true,
            height: '400px'
        }
        this._logout =  this._logout.bind(this);
        this._addUser = this._addUser.bind(this);
        this._changeUser = this._changeUser.bind(this);
    }

    componentWillMount() {
        this.props.actions.fetchUserDetails();
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <TextField
                        value={this.state.user}
                        onChange={this._changeUser}
                        hintText="Add User"
                        floatingLabelText="Add New User"
                    />  
                </MuiThemeProvider>&nbsp;&nbsp;&nbsp;
                <MuiThemeProvider>
                    <RaisedButton label="Add User" secondary={true} onClick= {this._addUser}/>
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <Table
                        height={this.state.height}
                        fixedHeader={this.state.fixedHeader}
                        fixedFooter={this.state.fixedFooter}
                        selectable={this.state.selectable}
                        multiSelectable={this.state.multiSelectable}
                        >
                        <TableHeader
                            displaySelectAll={this.state.showCheckboxes}
                            adjustForCheckbox={this.state.showCheckboxes}
                            enableSelectAll={this.state.enableSelectAll}
                        >
                        <TableRow>
                            <TableHeaderColumn colSpan="4" tooltip="Super Header" style={{textAlign: 'center'}}>
                                Super Header
                            </TableHeaderColumn>
                            </TableRow>
                            <TableRow>
                            <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn>
                            <TableHeaderColumn tooltip="The Status">Edit</TableHeaderColumn>
                        </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={this.state.showCheckboxes}
                            deselectOnClickaway={this.state.deselectOnClickaway}
                            showRowHover={this.state.showRowHover}
                            stripedRows={this.state.stripedRows}>
                            {this.props.users.length ? this.props.users.map( function(row, index) {
                                return <TableRow key={index}>
                                    <TableRowColumn>{index}</TableRowColumn>
                                    <TableRowColumn>{row.name}</TableRowColumn>
                                    <TableRowColumn>{row.password}</TableRowColumn>
                                    <RaisedButton label="Add User" secondary={true}/>
                                </TableRow>
                            }) : null}
                        </TableBody>
                </Table>
                </MuiThemeProvider>
            </div>
        )
    }

    _logout(event) {
        localStorage.removeItem("appAccessToken");
        this.context.router.push('/login');
    }

    _changeUser(event) {
        this.setState({user: event.target.value});
    }

    _addUser(event) {
        event.preventDefault();
        this.props.actions.saveUser(this.state.user);
    }
}

AuthUserDetailComponent.contextTypes = {
  router: React.PropTypes.object
};

AuthUserDetailComponent.propTypes = {
    actions : PropTypes.object.isRequired,
    dispatch: React.PropTypes.func
}

function mapStateToProps(state, ownProps) {
    return  Object.assign({}, state, {
        users : state.authData
    });
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
       actions :  bindActionCreators(authorizeUserAction, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthUserDetailComponent)