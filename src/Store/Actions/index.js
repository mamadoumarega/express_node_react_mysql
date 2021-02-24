
export const GET_FAVORITES = 'GET_FAVORITES';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const DELETE_FROM_FAVORITES = 'DELETE_FROM_FAVORITES';
export const RE_USER_STATE  = 'RE_USER_STATE';


// getting the favorite state ...
export function GETFavoritesState(){
    const action = {
        type: GET_FAVORITES
    }
    return action;
}

// Add Data to are favorite list
export function AddFavorite(item){
    const action = {
        type: ADD_TO_FAVORITES,
        payload: item
    }
    return action;
}

//delete from favorite
export function DelFromFavorite(item){
    const action = {
        type: DELETE_FROM_FAVORITES,
        payload: item
    }
    return action;
}

// re state
export function ReUserState(authSTATE){
    const action = {
        type:RE_USER_STATE,
        payload: authSTATE
    }
    return action;
}

