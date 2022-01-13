import router from "./router.js";
import { create } from "./services/articleService.js";
import { login, register } from "./services/authService.js";

export const onLoginSubmit = (e) => {
    console.log('logged in');
    
    e.preventDefault();

    let formData = new FormData(e.target);

    let email = formData.get('email');
    let password = formData.get('password');

    login(email, password)
        .then(data => {
            router('/');
        });
};

export const onRegisterSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    let email = formData.get('email');
    let password = formData.get('password');
    let repPass = formData.get('rep-pass');
       
    if (password != repPass) {
        return;
    }

    if (password.length < 6) {
        return;
    }

    register(email, password)
        .then(data => {
            router('/')
        });
};

export const onCreateSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);

    let article = {
        title: formData.get('title'),
        category: formData.get('category'),
        content: formData.get('content'),
    }

    create(article)
        .then(data => {
            console.log(data);
            router('/');
        })

}