import React from 'react'

export default function Todo(props) {
    return (
        <li>
            {props.text} 
            <button onClick={(e) => props.deleteToDo(props.id)}>
                Delete
            </button>
            <button onClick={() => props.completeToDo(props.id)}>
                Complete
            </button>
        </li>
    )
}
