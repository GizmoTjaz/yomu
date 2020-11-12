// Modules
import AsyncStorage from "@react-native-community/async-storage";

// Variables
import { DEFAULT_DATA } from "./constants";

/**
 * Returns value from storage
 * @param {String} key Key name
 * @param {Boolean} returnFullObject Returns key-value pair of requested key
 * @returns {Promise<Any>} Stored value
 */
async function getValue (key, returnFullObject) {
    
    const rawData = await AsyncStorage.getItem(key).catch(() => null);
    let response = DEFAULT_DATA[key];

    if (rawData !== null) {
        response = JSON.parse(rawData);
    }

    return returnFullObject
    ?  { key, value: response }
    : response;

}

/**
 * Sets value to key in storage
 * @param {String} key Key name
 * @param {Any} [value] Value (if none passed, default is used)
 */
function setValue (key, value) {

    if (typeof value === undefined) {
        value = DEFAULT_DATA[key];
    }

    AsyncStorage.setItem(key, JSON.stringify(value));
}

/**
 * Returns full save data
 * @returns {Promise<Object>} Saved data
 */
async function getSavedData () {

    const data = { ...DEFAULT_DATA };

    // Re-creates save data by promisifying keys, getting key-value pairs and assigning them to the data object (IDK EITHER, JUST WORKS)
    const resolvedData = (await Promise.all(Object.keys(data).map(key => getValue(key, true)))).forEach(({ key, value }) => {
        Object.assign(data, { [key]: value });
    });

    data.favoriteManga = {
        22151: {"id":22151,"title":"Kanojo, Okarishimasu","artwork":"https://www.mangadex.org//images/manga/22151.jpg?1603448008"},
        32311: {"id":32311,"title":"Chainsaw Man","artwork":"https://www.mangadex.org\/images\/manga\/32311.jpg?1603900915"},
        33537: {"id":33537,"title":"Shuumatsu no Valkyrie","artwork":"https://www.mangadex.org//images/manga/33537.jpg?1598520136"},
        10553: {"id":10553,"title":"Mob Psycho 100","artwork":"https://www.mangadex.org//images/manga/10553.jpg?1534597870"}
    };

    return data;
}

export {
    getValue,
    setValue,
    getSavedData
};