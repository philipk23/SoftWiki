import request from "./request.js";

let createApi = 'https://softwiki-1e4cc-default-rtdb.firebaseio.com/articles.json';

export const create = async (article) => {
    
    let response = await request.post(createApi, article)

    return response;
}