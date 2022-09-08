import * as React from 'react';

export default function useLocalStorage(keyName, defaultValue) {

    const [storedValue, setStoredValue] = React.useState(() => {
        const value = window.localStorage.getItem(keyName);
        if (value) {
            return JSON.parse(value);
        } else {
            window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
            return defaultValue;
        }
    });

    const setValue = (newValue) => {
        window.localStorage.setItem(keyName, JSON.stringify(newValue));
        setStoredValue(newValue);
    };

    return [storedValue, setValue];
}