import React, {PropTypes} from 'react';
import createFragment from 'react-addons-create-fragment';

class ProductDetailFilterPanel extends React.Component {
    render() {
         return (
                <div className="left_section">
                    <aside className="pb-40 pb-xs-20">
                         <div className="scrollbox">
                             <h4 className="mb-30 mt-25">DATA</h4>
                             <div className="product_filters">
                                <div className="product_tags">
                                    {this.props.items.map(function(item, index) {
                                        return React.Children.map(item.filterValues, function(elem) {
                                           return <div>{elem}</div>
                                        });
                                    })}
                                </div>   
                             </div>
                         </div>

                    </aside>
                </div>
        );
    }
}

ProductDetailFilterPanel.propTypes = {
    items : PropTypes.array.isRequired
};

export default ProductDetailFilterPanel;