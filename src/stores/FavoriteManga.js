// Modules
import create from "zustand";

// Utils
import { getValue } from "../utils/storage";

const createActions = (set) => ({
    addFavorite: ({ id, getHusk }) => (
        set(prev => (
            { ...prev, favorites: { ...prev.favorites, [id]: getHusk() } }
        ), true)
    ),
    removeFavorite: ({ id }) => (
        set(state => {
            delete state.favorites[id]
            return state;
        }, true)
    )
});

export default FavoriteManga = create(set => ({
    favorites: {
        22151: {"id":22151,"title":"Kanojo, Okarishimasu","artwork":"https://www.mangadex.org//images/manga/22151.jpg?1603448008"},
        32311: {"id":32311,"title":"Chainsaw Man","artwork":"https://www.mangadex.org\/images\/manga\/32311.jpg?1603900915"},
        33537: {"id":33537,"title":"Shuumatsu no Valkyrie","artwork":"https://www.mangadex.org//images/manga/33537.jpg?1598520136"},
        10553: {"id":10553,"title":"Mob Psycho 100","artwork":"https://www.mangadex.org//images/manga/10553.jpg?1534597870"}
    },
    ...createActions(set)
}));