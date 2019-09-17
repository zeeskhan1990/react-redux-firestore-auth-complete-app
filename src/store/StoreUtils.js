export const updateObject = (oldObject, updatedProperties) => {
    const updatedObject = {
        ...oldObject,
        ...updatedProperties
    }
    return updatedObject
}