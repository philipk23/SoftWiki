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
import articleDetails from './views/article-details.js';

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
    },
    {
        path: '/details/(?<id>\.+)',
        template: articleDetails,
        getData: articleService.getOne,
    }
];

const router = (path) => {
    history.pushState({}, '', path);

    
    let route = routes.find(x => new RegExp(`^${x.path}$`, 'i').test(path)) || routes.find(x => x.path == '/not-found');

    let context = route.context;

    let params = new RegExp(`^${route.path}$`, 'i').exec(path).groups;

    let userData = getUserData();
    if (route.getData) {
        route.getData()
            .then(data => {
                render(layout(route.template, { navigationHandler, onLoginSubmit, ...userData, ...context, data, params}), document.getElementById('app'));
            })
    }
    render(layout(route.template, { navigationHandler, onLoginSubmit, ...userData, ...context, params}), document.getElementById('app'));

}

function navigationHandler(e){
    if (e.target.tagName == 'A') {
        e.preventDefault();
        
        //console.log(e.target.href);

        let url = new URL(e.target.href);

        //console.log(url);

        router(url.pathname);
    }
};

export default router;