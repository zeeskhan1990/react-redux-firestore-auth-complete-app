import axios from "axios"

const instance = axios.create({
    baseURL: 'https://firestore.googleapis.com/v1/projects/burger-builder-9f0e0/databases/(default)/'
})

export const convertToPostBody = (sourceObj) => {
    function convert(conObj, desObj={}) {
        Object.keys(conObj).forEach((key) => {
            const conObjKey = conObj[key]
            switch(typeof conObjKey) {
                case "string":
                    desObj[key] = {
                        "stringValue": conObjKey
                    }
                    break
                case "boolean":
                    desObj[key] = {
                        "booleanValue": conObjKey
                    }
                    break
                case "number":
                    if(Number.isInteger(conObjKey)) {
                        desObj[key] = {
                            "integerValue": conObjKey
                        }
                    } else {
                        desObj[key] = {
                            "doubleValue": conObjKey
                        }
                    }
                    break
                case "object":
                    if(conObjKey === null) {
                        desObj[key] = {
                            "nullValue": conObjKey
                        }
                    } else if(Array.isArray(conObjKey)) {
                        const arrayValues = conObjKey.map((currentElem) => {
                            const convertedArrayMap = convert({"arrayKey":currentElem})
                            return convertedArrayMap["arrayKey"]
                        })
                        desObj[key] = {
                            "arrayValue": {
                                "values": arrayValues
                            }
                        }
                    } else {
                        desObj[key] = {
                            "mapValue": {
                                "fields": convert(conObjKey)
                            }
                        }
                    }
                    break
            }
        })
        return desObj
    }        
    let postBodyObj = {
        "fields" : convert(sourceObj)
    }
    return postBodyObj
}

export default instance