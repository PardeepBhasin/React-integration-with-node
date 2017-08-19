import React, {PropTypes} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as authorizeUserAction from '../../common/actions/userActions';
import MuiThemeProvider from '../../../node_modules/material-ui/styles/MuiThemeProvider';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from '../../../node_modules/material-ui/Table';

class AuthUserDetailComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user : '',
            selected: [1]
        }
        this._logout =  this._logout.bind(this);
        this._addUser = this._addUser.bind(this);
        this._changeUser = this._changeUser.bind(this);
        this.handleRowSelection = this.handleRowSelection.bind(this);
        this.isSelected = this.isSelected.bind(this);
    }

    componentWillMount() {
        this.props.actions.fetchUserDetails();
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <Table onRowSelection={this.handleRowSelection}>
                        <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                            {this.props.users.length ? this.props.users.map(function(item, index) {
                                return  <TableRow>
                                            <TableRowColumn>{item._id}</TableRowColumn>
                                            <TableRowColumn>{item.name}</TableRowColumn>
                                            <TableRowColumn>{item.password}</TableRowColumn>
                                        </TableRow>
                            }) : null}
                        </TableBody>
                    </Table>
                </MuiThemeProvider>
                <input
                        className='form__field-input'
                        type='text'
                        required="required" 
                        value={this.state.user}
                        onChange={this._changeUser}
                        placeholder='Add User'/>
                        <button onClick= {this._addUser} className='form__submit-btn' type='submit'>Add User</button>
                <button onClick= {this._logout} className='form__submit-btn' type='submit'>logout</button>
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

    handleRowSelection(selectedRows) {
        this.setState({
        selected: selectedRows,
        });
    };

    isSelected(index) {
        return this.state.selected.indexOf(index) !== -1;
    };
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