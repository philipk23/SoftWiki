import { html } from '../node_modules/lit-html/lit-html.js';
import article from './article.js';

export default ({
    data = [],
    navigationHandler
}) => {
    return html`
    <!-- Home -->
    <div class="content">
        <section class="js">
            <h2>JavaScript</h2>
            <div class="articles">
                ${data.filter(x => x.category == 'JS').map(x => article({...x, navigationHandler}))}
            </div>
        </section>
        <section class="CSharp">
            <h2>C#</h2>
            <div class="articles">
                ${data.filter(x => x.category == 'C#').map(x => article({...x, navigationHandler}))}
            </div>
        </section>
        <section class="Java">
            <h2>Java</h2>
            <div class="articles">
                ${data.filter(x => x.category == 'Java').map(x => article({...x, navigationHandler}))}
            </div>
        </section>
        <section class="Pyton">
            <h2>Pyton</h2>
            <div class="articles">
                  ${data.filter(x => x.category == 'Python').map(x => article({...x, navigationHandler}))}
            </div>
        </section>
    </div>
`
 };