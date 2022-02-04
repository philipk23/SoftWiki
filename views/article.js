import { html } from '../node_modules/lit-html/lit-html.js';

export default({
    title,
    content,
    _id,
    navigationHandler
}) => html`
    <article>
        <h3>${title}</h3>
        <p>${content}</p>
        <a href="/details/${_id}" class="btn details-btn" @click=${navigationHandler}>Details</a>
    </article>
`;