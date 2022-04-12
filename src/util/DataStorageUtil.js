import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        console.log(`Storing ${key}: ${jsonValue}`);
        await AsyncStorage.setItem(key, jsonValue);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e);
    }
}

export const getUnescaped = async () => {
    let keys = [];
    let value = null;
    try {
        let unescaped = [];
        keys = await AsyncStorage.getAllKeys();
        for (let key of keys) {
            value = await getData(key);
            if (key != "@Data_Loaded_Flag" && value != null && !value["escaped"]) {
                unescaped.push(value);
            }
        }
        return unescaped;
    } catch (e) {
        console.log(e);
    }
}

export const getEscaped = async () => {
    let keys = [];
    let value = null;
    try {
        let escaped = [];
        keys = await AsyncStorage.getAllKeys();
        for (let key of keys) {
            value = await getData(key);
            if (key != "@Data_Loaded_Flag" && value != null && value["escaped"]) {
                escaped.push(value);
            }
        }
        return escaped;
    } catch (e) {
        console.log(e);
    }
}

export const resetStorage = async () => {
    let keys = [];
    try {
        keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export const markSafe = async (key) => {
    try {
        let value = await getData(key);
        value["escaped"] = true;
        await storeData(key, value);
        return value;
    } catch (e) {
        console.log(e);
    }
}
