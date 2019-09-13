import axios from "axios"

const instance = axios.create({
    baseURL: 'https://firestore.googleapis.com/v1/projects/burger-builder-9f0e0/databases/(default)/'
})

export {convertResponse, convertToPostBody} from './axios-common'

export default instance