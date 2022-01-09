import { login } from "./services/authService.js";


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