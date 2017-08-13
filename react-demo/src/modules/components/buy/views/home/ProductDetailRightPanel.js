import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as productActions from '../../../../../common/actions/productActions';

class ProductDetailRightPanel extends React.Component {
    createRow (product, index) {
        return  (<div className="right_section" key={index}>
                    <div className="products">
                        <div className="product p-0 pb-20">
                            <a className="color-black">
                                <h2 className="product_title pl-20 pr-20 pt-20">
                                    {product.name} <span className="color-grey display-block">{product.storage}</span>
                                </h2>
                            </a>
                        </div>
                    </div>
                </div>);

    }
    render() {
         return (
             <div className="right_section">
                {this.props.items.map(this.createRow)}
            </div>
        );
    }
}

ProductDetailRightPanel.propTypes = {
    items : PropTypes.array.isRequired
};

export default ProductDetailRightPanel;