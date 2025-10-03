import React, { Fragment, useState } from "react";

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);

    //edit description function
    const updateDescription = async e => {
      e.preventDefault();
      try {
        const body = { description };
        const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        })

        console.log(response)
      } catch (err) {
        console.error(err.message);
      }
    }

    return (
        <Fragment>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`}>
            Edit
          </button>

          <div class="modal fade" id={`id${todo.todo_id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Edit Todo</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <input type='text' className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                  <button type="button" class="btn btn-primary" onClick={e => updateDescription(e)} data-bs-dismiss="modal" aria-label="Close">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
    )
}

export default EditTodo;