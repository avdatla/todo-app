import {LitElement, html} from "@polymer/lit-element";

import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';

const visibilityFilters = {

    SHOW_ALL: 'All',
    SHOW_ACTIVE: 'Active',
    SHOW_COMPLETED: 'Completed',

};

class TodoView extends LitElement {

    static get properties() {
        return {
            todos: {
                type: Array,
            },
            task: {
                type: String,
            },
            filter: {
                type: String,
            },
        }
    }

    constructor() {
        super();

        this.todos = [];
        this.task = '';
        this.filter = visibilityFilters.SHOW_ALL;
    }

    render() {

        return html`
        <p>To do list of Avinash</p>
        
         <div class="input-layout" @keyup="${this.shortcutListener}">
        <vaadin-text-field
          placeholder="Task"
          value="${this.task}"
          @change="${this.updateTask}"
        ></vaadin-text-field>
        <vaadin-button theme="primary" @click="${this.addTodo}">
          Add Todo
        </vaadin-button>
      </div>
      
      <div class="todo-lists">
        ${this.applyFilter(this.todos).map(todo => html`
            <div class="todo-item">
                <vaadin-checkbox
                   ?checked="${todo.complete}"
                  @change="${
                    e => this.updateTodoStatus(todo, e.target.checked)
                 }"
                >${todo.task}</vaadin-checkbox>
            </div>
        `)}
      </div>
      
      
      <vaadin-radio-group
        class="visibility-filters"
        value="${this.filter}"
        @value-changed="${this.filterChanged}"
      >
      ${Object.values(visibilityFilters).map(fil => html`
        <vaadin-radio-button value="${fil}">${fil}</vaadin-radio-button>
      `)}
      </vaadin-radio-group>
      
      
      <vaadin-button theme="secondary" @click="${this.clearComplete}">Clear Complete</vaadin-button>
        `;

    }

    filterChanged(e) {
        this.filter = e.target.value;
    }

    clearComplete() {
        this.todos = this.todos.filter(todo => !todo.complete);
    }


    applyFilter(todos) {
        switch(this.filter) {
            case visibilityFilters.SHOW_ACTIVE:
                return todos.filter(todo => !todo.complete);
            case visibilityFilters.SHOW_COMPLETED:
                return todos.filter(todo => todo.complete);
            default:
                return todos;
        }
    }

    updateTask(e) {
        this.task = e.target.value;
    }


    addTodo() {
        if (this.task) {
            this.todos = [...this.todos, {
                task: this.task,
                complete: false,
            }];
        }
        this.task = '';
    }

    shortcutListener(e) {
        if (e.key === 'Enter') {
            this.addTodo();
        }
    }

    updateTodoStatus(updatedTodo, complete) {
        this.todos = this.todos.map( todo => {
            return updatedTodo === todo ? { ...updatedTodo, complete } : todo
        });
    }

}

customElements.define('todo-view', TodoView);