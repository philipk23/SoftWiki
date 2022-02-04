import { render } from './node_modules/lit-html/lit-html.js';

import layout from './views/layout.js';
import home from './views/home.js';
import login from './views/login.js';
import notFound from './views/not-found.js';
import register from './views/register.js';
import createArticle from './views/createArticle.js';
import { onLoginSubmit, onRegisterSubmit, onCreateSubmit } from './eventListeners.js';
import { getUserData, logout } from './services/authService.js';
import articleService from './services/articleService.js';

const routes = [
    {
        path: '/',
        template: (props) => {
            let template = home;
            let url = ('/');

            if (!props.isAuthenticated) {
                template = login;
                url = ('/login');
            }

            history.pushState({}, '', url);

            return template(props);
        },
        getData: articleService.getAll,
    },
    {
        path: '/logout',
        template: (props) => {
            logout();
            history.pushState({}, '', '/');
            return login(props); 
        }
    },
    {
        path: '/login',
        template: login,
    },
    {
        path: '/not-found',
        template: notFound,
    },
    {
        path: '/register',
        template: register,
        context: {
            onRegisterSubmit
        }
    },
    {
        path: '/create',
        template: createArticle,
        context: {
            onCreateSubmit
        }
    }
];

const router = (path) => {
    history.pushState({}, '', path);

    let route = routes.find(x => x.path == path) || routes.find(x => x.path == '/not-found');
    let context = route.context;
    let userData = getUserData();
    if (route.getData) {
        route.getData()
            .then(data => {
                render(layout(route.template, { navigationHandler, onLoginSubmit, ...userData, ...context, data }), document.getElementById('app'));
            })
    }
    render(layout(route.template, { navigationHandler, onLoginSubmit, ...userData, ...context}), document.getElementById('app'));

}

function navigationHandler(e){
    if (e.target.tagName == 'A') {
        e.preventDefault();
        
        console.log(e.target.href);

        let url = new URL(e.target.href);

        console.log(url);

        router(url.pathname);
    }
};

export default router;