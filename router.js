import { render } from './node_modules/lit-html/lit-html.js';

import layout from './views/layout.js';
import home from './views/home.js';
import login from './views/login.js';
import notFound from './views/not-found.js';
import { onLoginSubmit } from './eventListeners.js';

const routes = [
    {
        path: '/',
        template: home
    },
    {
        path: '/login',
        template: login,
        context:{
            onLoginSubmit
        }
    },
    {
        path: '/not-found',
        template: notFound
    }
];

const router = (path) => {
    history.pushState({}, '', path);

    let route = routes.find(x => x.path == path) || routes.find(x => x.path == '/not-found');
    let context = route.context
    render(layout(route.template(context), { navigationHandler }), document.getElementById('app'));
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