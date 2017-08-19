export default function(state = [], action) {
    switch(action.type) {
        case 'AUTH_USER_SUCCESS':
            return action.data
        case 'USER_DETAIL_SUCCESS':
            return action.users
        case 'SAVE_USER_SUCCESS':
            return action.user

        default : 
        return state;
    }
} 