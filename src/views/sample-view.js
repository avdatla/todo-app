import { LitElement, html } from "@polymer/lit-element";


class SampleView extends LitElement {

    static get properties() {
        return {
            name: {
                type: String,
            }
        }
    }

    constructor() {
        super();

        this.name = 'Avinash';
    }

    render() {

        return html `
            <p>To do list of ${this.name}</p>
        `;
    }
}

customElements.define('sample-view', SampleView);