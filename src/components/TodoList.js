
import { useState, useEffect } from 'react';

function TodoList() {

    const [toDoItem, setToDoItem] = useState([]);
    const [input, setInput] = useState("");

    const enteredInput = (e) => {
        const inputVal = e.target.value
        setInput(inputVal)
    }

    let todoData = {
        id: Date.now(),
        content: input,
        completed: false
    }

    const addNewTodo = () => {
        setToDoItem([...toDoItem, todoData])
        localStorage.setItem("todoList", JSON.stringify([...toDoItem, todoData]))
        setInput("")
    }

    const deleteItem = (id) => {
        const confirmation = window.confirm("Do you want to delete?")
        if (confirmation) {
            const deletedData = toDoItem.filter((data) => data.id !== id)
            localStorage.setItem("todoList", JSON.stringify(deletedData))
            setToDoItem(deletedData)
        } else {
            return
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addNewTodo();
        }
    };

    function toggleCompleted(id) {
        const toggledItems = toDoItem.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };

            } else {
                return { ...task }
            }
        });
        setToDoItem(toggledItems)
        localStorage.setItem("todoList", JSON.stringify(toggledItems))
    }

    useEffect(() => {
        const localStoredItem = localStorage.getItem("todoList")
        if (localStoredItem) {
            const parsedData = JSON.parse(localStoredItem)
            setToDoItem(parsedData)
        }
    }, [])

    return (
        <div className="toDo bg-secondary-subtle">
            <h1>My ToDo App</h1><hr></hr>
            <div className="toDo-Container">
                <div className="toDoInput">
                    <input onChange={enteredInput} value={input} type="text" onKeyDown={handleKeyPress} placeholder='Enter your todo' />
                    <button type='button' className='btn btn-secondary' onClick={addNewTodo}>Add</button>
                </div>
                <div className="ToDo-Content">
                    <div>
                        {toDoItem.map((data) => {
                            return <div className="form-check form-switch">
                                <div className="containercustom">
                                    <div className="columncustom">
                                        <input className="form-check-input border-success" type="checkbox" role="switch"
                                            checked={data.completed}
                                            onChange={e => { toggleCompleted(data.id); }} />
                                    </div>
                                    <div className="columncustom">
                                        <span>{data.content}</span>
                                    </div>
                                    <div className="columncustom">
                                        <button type="button" className="btn btn-danger rounded" onClick={() => deleteItem(data.id)}>x</button>
                                    </div>
                                </div>
                            </div>

                        })}
                    </div>

                    <ul>
                        <h3> Completed Tasks</h3>
                        {toDoItem.map((data) => {
                            if (data.completed) {
                                return <li>
                                    {data.completed ? data.content : null}
                                </li>
                            }

                        })}
                    </ul>
                </div>
            </div>

        </div>
    )

}

export default TodoList;