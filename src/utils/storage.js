// Modules
import { getItem, setItem } from "@react-native-community/async-storage";

// Variables
import { DEFAULT_DATA } from "./constants";

/**
 * Returns value from storage
 * @param {String} key Key name
 * @returns {Promise<Any>} Stored value
 */
async function getValue (key) {
    
    const rawData = await getItem(key);

    if (rawData === null) {
        return DEFAULT_DATA[key];
    } else {
        return JSON.parse(rawData);
    }
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

    setItem(key, JSON.stringify(value));

}

export default {
    getValue,
    setValue
};