import {act} from "@testing-library/react";

export const GET_FAVORITES = 'GET_FAVORITES';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const DELETE_FROM_FAVORITES = 'DELETE_FROM_FAVORITES';

// getting the favorit state ...
export function GETFavoritesState(){
    const action = {
        type: GET_FAVORITES
    }
    return action;
}

// Add Data to are favorit list
export function AddFavorite(item){
    const action = {
        type: ADD_TO_FAVORITES,
        payload: item
    }
    return action;
}

//delete from favorit
export function DelFromFavorite(item){
    const action = {
        type: DELETE_FROM_FAVORITES,
        payload: item
    }
    return act;
}

