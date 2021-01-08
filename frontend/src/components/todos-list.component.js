import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Todo = (props) => 

{
    const deleteTodo = (todo_id) => {

        axios
        .get("http://localhost:4000/todos/delete/" + todo_id)
        .then((response) => {
            props.getTodos();
        })
        .catch(function (error) {
            console.log(error);
        });
    }
  
    return (
        <tr>
          <td className={props.todo.todo_completed ? "completed" : ""}>
            {props.todo.todo_description}
          </td>
          <td className={props.todo.todo_completed ? "completed" : ""}>
            {props.todo.todo_responsible}
          </td>
          <td className={props.todo.todo_completed ? "completed" : ""}>
            {props.todo.todo_priority}
          </td>
          <td>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>
            <a href="#"  onClick={() => deleteTodo(props.todo._id)}>
              {" "}
              Delete
            </a>
          </td>
        </tr>
      );
}




export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
    this.getTodoList = this.getTodoList.bind(this);
  }

  componentDidMount() {
    this.getTodoList();
  }

  getTodoList() {
    axios
      .get("http://localhost:4000/todos/")
      .then((response) => {
        this.setState({ todos: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.todoList(this.getTodoList)}</tbody>
        </table>
      </div>
    );
  }

  todoList(getTodoList) {
    return this.state.todos.map(function (currentTodo, i) {
      return <Todo todo={currentTodo} getTodos={getTodoList} key={i} />;
    });
  }
}
