import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorizeUserAction from '../../common/actions/userActions';
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
    
    componentWillMount() {
        this.props.actions.fetchUserDetails();
    }
    render() {
        return(
            <form className='form' onSubmit={this._onSubmit}>
                <div className='form__field-wrapper'>
                    <input
                        className='form__field-input'
                        type='text'
                        id='username'
                        value={this.state.username}
                        onChange={this._changeUsername}
                        placeholder='username'/>
                    <label className='form__field-label'>
                        Username
                    </label>
                </div>
                <div className='form__field-wrapper'>
                    <input
                        className='form__field-input'
                        id='password'
                        type='password'
                        value={this.state.password}
                        onChange={this._changePassword}
                        placeholder='••••••••••'/>
                    <label className='form__field-label'>
                        Password
                    </label>
                </div>
                <div className='form__submit-btn-wrapper'>
                    <button className='form__submit-btn' type='submit'>sign in</button>
                </div>
                <div>
                    {this.props.users ? this.props.users.map(function(item, index) {
                        return <div key={index}>{item.name}</div>;
                    }) : null}
                </div>
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
    }
}

LoginComponent.propTypes = {
    actions : PropTypes.object.isRequired,
    dispatch: React.PropTypes.func
}

function mapStateToProps(state, ownProps) {
    if (state.authData.token) {
        localStorage.setItem('appAccessToken', state.authData.token);
        return {
            authData : state.authData
        }
    } else {
        if (state.authData.length) {
            return {
                users : state.authData
            }
        }
    }
    return {
        authData : state.authData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authorizeUserAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
