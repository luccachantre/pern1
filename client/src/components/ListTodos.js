import React, { Fragment, useEffect, useState } from "react";

const ListTodos = () => {

    const getTodos = async () => {
        try {
            
            const response = await fetch("http://localhost:5000/todos"); //by default fetch makes a get request
            const jsonData = await response.json();
            //we do response.json instead of just response because the response body is a stream
            //.json() is a built in function that parses that stream into a JS object that we can interact with and use
            console.log(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTodos();
    })

    return (<Fragment>
        <table class="table table-dark table-striped mt-5 text-center">
            <thead>
            <tr>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {/* <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
            </tr> */}
            </tbody>
        </table>
    </Fragment>);
}

export default ListTodos;