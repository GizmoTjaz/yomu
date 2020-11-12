// Modules
import { createStore } from "redux";

// Utils
import { setValue } from "../utils/storage";

// Variables
import { DEFAULT_DATA } from "../utils/constants";

// States
const initialState = DEFAULT_DATA;

initialState.favoriteManga = {
    22151: {"id":22151,"title":"Kanojo, Okarishimasu","artwork":"https://www.mangadex.org//images/manga/22151.jpg?1603448008"},
    32311: {"id":32311,"title":"Chainsaw Man","artwork":"https://www.mangadex.org\/images\/manga\/32311.jpg?1603900915"},
    33537: {"id":33537,"title":"Shuumatsu no Valkyrie","artwork":"https://www.mangadex.org//images/manga/33537.jpg?1598520136"},
    10553: {"id":10553,"title":"Mob Psycho 100","artwork":"https://www.mangadex.org//images/manga/10553.jpg?1534597870"}
};

// Reducers
const reducer = (state = initialState, { type: actionType, payload }) => {

    switch (actionType) {
        case "TOGGLE_FAVORITE_MANGA":;

            const { favoriteManga } = state,
                newFavoriteManga = {};

            if (favoriteManga.hasOwnProperty(payload.id)) { // Remove from favorites
                const { [payload.id]: removedManga, ...newFavoriteList } = favoriteManga;
                newFavoriteManga = { ...state, favoriteManga: newFavoriteList };
            } else { // Add to favorites
                newFavoriteManga = { ...state, favoriteManga: { ...favoriteManga, [payload.id]: payload } };
            }

            setValue("favoriteManga", newFavoriteManga);
            return newFavoriteManga;

            break;
        default:
    }

    return state;
};

// Stores
const store = createStore(reducer);

export default store;