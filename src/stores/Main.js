// Modules
import { createStore } from "redux";

// Utils
import { getSavedData, setValue } from "../utils/storage";

export default async function () {
    
    const initialState = await getSavedData();
    const reducer = (state = initialState, { type: actionType, payload }) => {

        switch (actionType) {
            case "TOGGLE_FAVORITE_MANGA":;
    
                const { favoriteManga } = state;
                let updatedFavoriteManga = {};
    
                if (favoriteManga.hasOwnProperty(payload.id)) { // Remove from favorites
                    const { [payload.id]: removedManga, ...newFavoriteList } = favoriteManga;
                    updatedFavoriteManga = { ...state, favoriteManga: newFavoriteList };
                } else { // Add to favorites
                    updatedFavoriteManga = { ...state, favoriteManga: { ...favoriteManga, [payload.id]: payload } };
                }
    
                setValue("favoriteManga", updatedFavoriteManga);
                return updatedFavoriteManga;
    
            case "CHANGE_READING_DIRECTION":
                return { ...state, readerSettings: { ...state.readerSettings, readingDirection: payload } };
            default:
        }
    
        return state;
    };

    return createStore(reducer);
};