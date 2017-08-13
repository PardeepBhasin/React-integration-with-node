import React, {PropTypes} from 'react';
import Header from './common/header/header';
import Footer from './common/footer/footer';

export class AppComponent extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}

AppComponent.propTypes = {
    children : PropTypes.object.isRequired
};

export default AppComponent;