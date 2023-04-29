import is from "@app/utils/is";
import React from "react";
export function cloneObject(originalObject = {}) {
    const suppressError = true;
    if (!is.anObject(originalObject))
        return;
    let clonedObject = {};
    Object.keys(originalObject).forEach(key => {
        const currentValue = originalObject[key];
        if (React.isValidElement(currentValue))
            clonedObject[key] = currentValue; // valid React elements are added to the new object as-is
        else if (is.anObject(currentValue, suppressError))
            clonedObject[key] = cloneObject(currentValue);  // set this key to the CLONED object
        else if (is.anArray(currentValue, suppressError))
            clonedObject[key] = cloneArray(currentValue);  // set this key to the CLONED array
        else
            clonedObject[key] = currentValue;  // if it's neither an object nor an array, just set this key to the value
    });
    return clonedObject;
};

export function cloneArray(originalArray = []) {
    const suppressError = true;
    if (!is.anArray(originalArray))
        return;
    return originalArray.map(element => {
        if (React.isValidElement(element))
            return element; // valid React elements are pushed to the new array as-is
        if (is.anObject(element, suppressError))
            return cloneObject(element); // push the CLONED object to the new array
        if (is.anArray(element, suppressError))
            return cloneArray(element);  // push the CLONED array to the new array
        return element;  // if it's neither an array nor an object, just push it to the new array
    });
};