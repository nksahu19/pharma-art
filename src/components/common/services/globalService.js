export const setVar = (key, value) => {
    let obj = getSessionObject();
    obj[key] = value;
    setSessionObject(obj);
}

export const getVar = key => getSessionObject()[key]

export const clearVar = () => setSessionObject({});

const getSessionObject = () => JSON.parse(window.sessionStorage.getItem("__globals")) || {};

const setSessionObject = obj => window.sessionStorage.setItem("__globals", JSON.stringify(obj));