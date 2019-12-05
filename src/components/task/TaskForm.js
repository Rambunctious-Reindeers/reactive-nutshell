/*author: Sullivan Pierce,  Purpose: this creates a form for either editing a task or creating a new one */
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
            const userId = JSON.parse(localStorage.getItem("credentials")).userId
            const task = {
                taskName: this.state.taskName,
                dueDate: this.state.date,
                completion: false,
                userId: Number(userId)
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
            userId: Number(JSON.parse(localStorage.getItem("credentials")).userId)
        };

        APIManager.put("tasks", this.props.match.params.taskId, editedTask)
            .then(() => this.props.history.push("/tasks"))
    };

    componentDidMount() {
        if (!this.props.isNew) {
            APIManager.get("tasks", this.props.match.params.taskId)
                .then(task => {
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
                <form className="ph5 pt4 pb5 mt5 ml4 br3 shadow-1 w-40">
                    <fieldset>
                        <label htmlFor="taskName" className="f6 b db mb2">Task</label>
                        <input
                            className="w-100"
                            type="text"
                            required
                            onChange={this.handleFieldChange}
                            id="taskName"
                            placeholder="Your task"
                            value={this.state.taskName}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="date" className="f6 b db mb2">Finish By</label>
                        <input
                            className="w-100"
                            type="date"
                            required
                            onChange={this.handleFieldChange}
                            id="date"
                            placeholder="date"
                            value={this.state.date}
                        />
                    </fieldset>
                    <button
                        className="f6 fw5 bg-white orange hover-blue link pointer pa2 pv1 mt2 mb3 mr3 fr br2"
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick=
                        {this.props.isNew ? this.constructNewTask : this.updateExistingTask}
                    >Submit</button>
                </form>
            </>
        )
    }
}

export default TaskForm