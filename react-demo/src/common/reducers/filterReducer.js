export default function(state = [], action) {
    switch(action.type) {
        case 'LOAD_FILTERS_SUCCESS' : 
        return action.filters;

        default : 
        return state;
    }
} 