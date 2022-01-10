import { login, register } from "./services/authService.js";

export const onLoginSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);

    let email = formData.get('email');
    let password = formData.get('password');

    login(email, password)
        .then(data => {
            console.log(data);
        })
}

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
            console.log(data);
        })
}