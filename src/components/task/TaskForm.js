import React, { Component } from 'react'
import APIManager from '../module/APIManager';

class TaskForm extends Component {

    state = {
        taskName: "",
        date: "",
        loadingStatus: false,
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }

    constructNewTask = evt => {
        evt.preventDefault();
        if (this.state.taskName === "" || this.state.date === "") {
            window.alert("Please enter a task and a date!")
        } else {
            this.setState({ loadingStatus: true });
            const userId = localStorage.getItem("userId")
            const task = {
                taskName: this.state.taskName,
                dueDate: this.state.date,
                completion: false,
                userId: userId
            }

            APIManager.post("tasks", task)
                .then(() => this.props.history.push("/tasks"))
        }
    }

    updateExistingTask = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedTask = {
            id: this.props.match.params.taskId,
            taskName: this.state.taskName,
            dueDate: this.state.date,
            userId: localStorage.getItem("userId")
        };

        APIManager.put("tasks", this.props.match.params.taskId, editedTask)
            .then(() => this.props.history.push("/tasks"))
    };

    componentDidMount() {
        if (!this.props.isNew) {
            APIManager.get("tasks", this.props.match.params.taskId)
                .then(task => {
                    console.log(task)
                    this.setState({
                        taskName: task.taskName,
                        date: task.dueDate,
                        loadingStatus: false,
                    });
                });
        }
    }

    render() {
        return (
            <>
                <form>
                    <fieldset>
                        <div className="formgrid">
                            <label htmlFor="taskName">Task</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="taskName"
                                placeholder="Task"
                                value={this.state.taskName}
                            />
                            <label htmlFor="date">Finish By</label>
                            <input
                                type="date"
                                required
                                onChange={this.handleFieldChange}
                                id="date"
                                placeholder="date"
                                value={this.state.date}
                            />


                        </div>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick=
                                {this.props.isNew ? this.constructNewTask : this.updateExistingTask}
                            >Submit</button>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }
}

export default TaskForm