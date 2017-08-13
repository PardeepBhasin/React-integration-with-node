import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as productActions from '../../../../../common/actions/productActions';
import ProductDetailRightPanel from './ProductDetailRightPanel';
import ProductDetailFilterPanel from './ProductDetailFilterPanel';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
global.jQuery = require('jquery');
const _ = require('underscore');

class HomePage extends React.Component {
    constructor (props, context) {
        super(props, context);
        this.state = {};
    }
    render() {
        var products = [{
            id: 1,
            name: "Product1",
            price: 120
        }, {
            id: 2,
            name: "Product2",
            price: 80
        }];

         return(
             <div className="container">
                <BootstrapTable data={products} striped hover>
                    <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
                </BootstrapTable>
                <ProductDetailFilterPanel items={this.props.filters}/>
                <ProductDetailRightPanel items={this.props.products}/>
            </div>
        );
    }
}

HomePage.propTypes = {
    products : PropTypes.array.isRequired,
    actions : PropTypes.object.isRequired,
    filters : PropTypes.array.isRequired
};

function mapStateToProps (state, ownProps) {
    let productListData = [];
    let res = state.products;
    for (let i = 0; i < res.length; i++) {
        if (res[i].products) {
            for (let j = 0; j < res[i].products.length; j++) { 
                if (res[i].products[j].productOptions) {
                    for (let k = 0; k < res[i].products[j].productOptions.length; k++) {
                        for (let l = 0; l < res[i].products[j].productOptions[k].allowedValues.length; l++) {
                            res[i].products[j].productOptions[k].allowedValues[l]['isSelected'] = false;
                        }
                    }
                }
                productListData.push(res[i].products[j]);
            }
        }
    }
    if (state.filters) {
        let data = []
        let sortArray = [];
        let res = state.filters;
        for (let i = 0; i < res.length; i++) {
            if(res[i].filters) {
                for (let j = 0; j < res[i].filters.length; j++) {
                    let searchData = _.find(res[i].filters, { filterId: res[i].filters[j].filterId })
                    if (searchData) {
                        searchData['isOpen'] = false
                        data.push(searchData);
                    }
                }
            }
        }
        let myObjects = _.sortBy(data, 'filterId');
        _.forEach(myObjects, function(result) {
            sortArray.push(result);
        });

        for (let i = 0; i < sortArray.length; i++) {
            for (let j = i + 1; j < sortArray.length; j++) {
                if (sortArray[i].filterId == sortArray[j].filterId) {
                    if (!_.isNull(sortArray[j].filterValues) && !_.isEmpty(sortArray[j].filterValues)) {
                        for (let k = 0; k < sortArray[j].filterValues.length; k++) {
                            if (sortArray[i].filterValues.indexOf(sortArray[j].filterValues[k]) == -1)
                            sortArray[i].filterValues.push(sortArray[j].filterValues[k]);
                        }
                        sortArray.splice(j, 1);
                    }
                }
            }
        }
        var filterList = sortArray;
        for (let i = 0 ; i < filterList.length; i++) {
            if (filterList[i].filterName == "Colour") {
                filterList[i]["filterValues"] = filterList[i].colorValues;
                break;
            }
        }
    }
    return {
        products : productListData,
        filters : filterList
    };
}

function mapDispatchToProps (dispatch) {
    return {
        actions : bindActionCreators(productActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);