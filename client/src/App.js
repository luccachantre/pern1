import React, { Fragment } from "react"; //deprecated I believe
import './App.css';
//"Tip for you guys following along in 2024. Fragments is no longer needed in react. 
//You can just use empty elements "<></>" instead of a fragment now." - a youtube comment

//components
import InputTodo from "./components/InputTodo";

function App() {
  return (
    <Fragment>
      <InputTodo></InputTodo>
    </Fragment>
  );
}

export default App;
