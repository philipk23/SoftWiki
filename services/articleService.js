import { getUserData } from "./authService.js";
import request from "./request.js";

const urlBuilder = (resource) => {
    let idToken = getUserData().idToken;

    return `https://softwiki-1e4cc-default-rtdb.firebaseio.com/${resource}.json?auth=${idToken}`;
}

export default{
    async getAll(){
        let articles = await request.get(urlBuilder('articles'));

        return Object.keys(articles).map(key => ({_id: key, ...articles[key]})); 
    },

    async create(article){
        let response = await request.post(urlBuilder('articles'), article)
        
        return response;
    },

    async getOne(id){
        let response = await request.get(urlBuilder('articles', id));

        return response;
    }
};