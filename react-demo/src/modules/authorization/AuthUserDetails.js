import React, {PropTypes} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as authorizeUserAction from '../../common/actions/userActions';

class AuthUserDetailComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount() {
        this.props.actions.fetchUserDetails();
    }
    render() {
        return (
            <div>
                {this.props.users ? this.props.users.map(function(item, index) {
                    return <div key={index}>{item.name}</div>;
                }) : null}
            </div>
        )
    }
}

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