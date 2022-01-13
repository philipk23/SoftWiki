import { getUserData } from "./authService.js";
import request from "./request.js";

const urlBuilder = (resource) => {
    let idToken = getUserData().idToken;

    return `https://softwiki-1e4cc-default-rtdb.firebaseio.com/${resource}.json?auth=${idToken}`;
}

export const create = async (article) => {
    
    let response = await request.post(urlBuilder('articles'), article)

    return response;
}