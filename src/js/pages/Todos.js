import React from "react";

import Todo from "../components/Todo";
import * as TodoActions from "../actions/TodoActions"
import TodoStore from "../components/stores/TodoStore";


export default class Featured extends React.Component {
  constructor() {
    super();
    this.getTodos = this.getTodos.bind(this);
    this.state = {
      todos: TodoStore.getAll(),
    };
  }

  componentWillMount(){
    TodoStore.on("change", this.getTodos);
    console.log("count", TodoStore.listenerCount("change"));
    }

  componentWillUnmount() {
    TodoStore.removeListener("change", this.getTodos);
  }


  reloadTodos() {
    TodoActions.reloadTodos();
  }

  getTodos() {
    this.setState({
      todos: TodoStore.getAll(),
    }); 
  }


  render() {
    const { todos } = this.state;

    const TodoComponents = todos.map((todo) => {
//{...todo} The properties of the object that you pass in are copied onto the component's props.
        return <Todo key={todo.id} {...todo}/>;
    });

    return (
      <div>
      <button onClick={this.reloadTodos.bind(this)}>Reload!</button>
        <h1>Todos</h1>
        <ul>{TodoComponents}</ul>
      </div>
    );
  }
}
