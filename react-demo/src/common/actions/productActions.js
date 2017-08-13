import productApi from '../../modules/components/buy/views/api/mockProductApi';
import filterApi from '../../modules/components/buy/views/api/mockFilterApi';

export function loadProductsSuccess(products) {
    return {type: 'LOAD_PRODUCTS_SUCCESS',  products};
}

export function loadFilterSuccess(filters) {
    return {type: 'LOAD_FILTERS_SUCCESS',  filters};
}

export function loadProducts() {
    return function (dispatch) {
        return productApi.getAllProducts().then(products => {
            dispatch(loadProductsSuccess(products));
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadFilters() {
    return function (dispatch) {
        return filterApi.getFilters().then(filters => {
            dispatch(loadFilterSuccess(filters));
        }).catch(error => {
            throw(error);
        });
    };
}