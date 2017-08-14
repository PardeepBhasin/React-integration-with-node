import React, {PropTypes} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as authorizeUserAction from '../../common/actions/userActions';

class AuthUserDetailComponent extends React.Component {
    constructor(props) {
        super(props);
        this._logout =  this._logout.bind(this);
    }

    componentWillMount() {
        this.props.actions.fetchUserDetails();
    }
    render() {
        return (
            <div>
                {this.props.users.length ? this.props.users.map(function(item, index) {
                    return <div key={index}>{item.name}</div>;
                }) : null}
                <button onClick= {this._logout} className='form__submit-btn' type='submit'>logout</button>
            </div>
        )
    }

    _logout(event) {
        localStorage.removeItem("appAccessToken");
        this.context.router.push('/login');
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
    return {
        users : state.authData
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
       actions :  bindActionCreators(authorizeUserAction, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthUserDetailComponent)