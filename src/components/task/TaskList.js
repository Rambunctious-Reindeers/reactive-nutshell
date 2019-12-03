import React, { Component } from 'react'
import APIManager from '../module/APIManager'
import TaskCard from './TaskCard'


class TaskList extends Component {

    state = {
        tasks: [],
    }

    componentDidMount() {
        localStorage.setItem("userId", 1)
        const userId = localStorage.getItem("userId")
        APIManager.getAll(`tasks?userId=${userId}`)
            .then((tasks) => {
                const completedTasks = tasks.filter(task => !task.completion)
                const sortedTasks = completedTasks.sort(function (a, b) {
                    let dateA = new Date(a.dueDate), dateB = new Date(b.dueDate)
                    return dateA - dateB
                })
                this.setState({
                    tasks: sortedTasks
                })
            })
    }

    deleteTask = id => {
        const userId = localStorage.getItem("userId")
        APIManager.delete("tasks", id)
            .then(() => {
                APIManager.getAll(`tasks?userId=${userId}`)
                    .then((newTasks) => {
                        this.setState({
                            tasks: newTasks
                        })
                    })
            })
    }

    handleCheckbox = (id) => {
        const userId = localStorage.getItem("userId")
        APIManager.patch("tasks", id, { completion: true })
            .then(() => {
                APIManager.getAll(`tasks?userId=${userId}`)
                    .then((tasks) => {
                        const completedTasks = tasks.filter(task => !task.completion)
                const sortedTasks = completedTasks.sort(function (a, b) {
                    let dateA = new Date(a.dueDate), dateB = new Date(b.dueDate)
                    return dateA - dateB
                })
                this.setState({
                    tasks: sortedTasks
                })
                    })
            })
    }

    render() {

        return (
            <>
                <section className="section-content">
                    <button
                        type="button"
                        className="btn"
                        onClick={() => { this.props.history.push("/tasks/new") }}>
                        Add Task
                    </button>
                </section>
                <div className="container-cards">
                    {this.state.tasks.map((task, index) =>
                        <TaskCard
                            key={task.id}
                            task={task}
                            isFirst={index === 0}
                            deleteTask={this.deleteTask}
                            handleCheckbox={this.handleCheckbox}
                            {...this.props}
                        />
                    )}
                </div>
            </>
        )
    }

}

export default TaskList