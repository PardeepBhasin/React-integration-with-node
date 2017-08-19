import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorizeUserAction from '../../common/actions/userActions';
import MuiThemeProvider from '../../../node_modules/material-ui/styles/MuiThemeProvider';
import RaisedButton from '../../../node_modules/material-ui/RaisedButton';
import TextField from '../../../node_modules/material-ui/TextField';

class LoginComponent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
          username: '',
          password: ''
        }
        this._onSubmit = this._onSubmit.bind(this)
        this._changeUsername = this._changeUsername.bind(this)
        this._changePassword = this._changePassword.bind(this)
    }
    render() {
        return(
            <form className='form' onSubmit={this._onSubmit} style={{marginLeft: '50%'}}>
                    <MuiThemeProvider>
                        <TextField
                            value={this.state.username}
                            onChange={this._changeUsername}
                            hintText="Enter Username"
                            floatingLabelText="username"
                        />
                    </MuiThemeProvider><br></br>
                    <MuiThemeProvider>
                        <TextField
                            value={this.state.password}
                            onChange={this._changePassword}
                            hintText="Enter Password"
                            floatingLabelText="password"
                        />
                    </MuiThemeProvider><br></br>
                    <MuiThemeProvider>
                        <RaisedButton label="sign in" primary={true} onClick={this._onSubmit}/>
                    </MuiThemeProvider>
            </form>
        )
    }

    _changeUsername (event) {
        this.setState({username: event.target.value});
    }

    _changePassword (event) {
        this.setState({password: event.target.value});
    }
    _onSubmit (event) {
        event.preventDefault();
        this.props.actions.authorizeUser(this.state.username, this.state.password);
        if (localStorage.appAccessToken) {
            this.context.router.push('/usersDetail');
        }
    }
}

LoginComponent.propTypes = {
    actions : PropTypes.object.isRequired,
    dispatch: React.PropTypes.func
}

LoginComponent.contextTypes = {
  router: React.PropTypes.object
};

function mapStateToProps(state, ownProps) {
    if (state.authData.token) {
        localStorage.setItem('appAccessToken', state.authData.token);
    } 
    return Object.assign({}, state, {
        authData : state.authData
    });
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authorizeUserAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
