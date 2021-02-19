import {
    GET_FAVORITES,
    ADD_TO_FAVORITES,
    DELETE_FROM_FAVORITES
} from  '../Actions';


const initialiseState = {
    FavoriteData: []
}

function Favorite( state = initialiseState, action ){

    switch (action.type){
        case GET_FAVORITES:
            let favData = JSON.parse(localStorage.getItem("Fav"));
            if (favData){
                state.FavoriteData = favData;
            }
            return state;

        case ADD_TO_FAVORITES:
            let is_here = false;
            let pay = action.payload;
            for (let index = 0; index < state.FavoriteData.length; index++){
                const element = state.FavoriteData[index];
                if (element === pay){
                    is_here = true;
                }
            }


            if (is_here === false){
                let Lstate = state.FavoriteData;
                Lstate.push(action.payload)
                state.FavoriteData = Lstate;
                localStorage.setItem("Fav", JSON.stringify(Lstate))
            } else {
                console.log(' this item is already existed');
            }
            return state;

        case DELETE_FROM_FAVORITES:
            let value = action.payload;
            let arr = state.FavoriteData;
            arr = arr.filter(item => item !== value);

            state.FavoriteData = arr;
            localStorage.setItem("Fav", JSON.stringify(arr));
            return  state;
        default:
            return  state;

    }
}

export default Favorite;
