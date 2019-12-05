/*author: Sullivan Pierce,    Purpose: this component creates all of the articlecards to be shown */
import React, { Component } from 'react'
import APIManager from '../module/APIManager'
import TaskCard from './TaskCard'


class TaskList extends Component {

    state = {
        uncompleteTasks: [],
        completeTasks: [],
    }

    componentDidMount() {
        this.getTasksAndSetState()
    }

    getTasksAndSetState = () => {
        const userId = JSON.parse(localStorage.getItem("credentials")).userId
        APIManager.getAll(`tasks?userId=${userId}`)
            .then((tasks) => {
                const uncompletedTasks = tasks.filter(task => !task.completion)
                const sortedUncompleteTasks = uncompletedTasks.sort(function (a, b) {
                    let dateA = new Date(a.dueDate), dateB = new Date(b.dueDate)
                    return dateA - dateB
                })
                const completedTasks = tasks.filter(task => task.completion)
                const sortedCompleteTasks = completedTasks.sort(function (a, b) {
                    let dateA = new Date(a.dueDate), dateB = new Date(b.dueDate)
                    return dateA - dateB
                })
                this.setState({
                    uncompleteTasks: sortedUncompleteTasks,
                    completeTasks: sortedCompleteTasks
                })
            })
    }

    deleteTask = id => {
       
        APIManager.delete("tasks", id)
            .then(() => {
                this.getTasksAndSetState()
            })
    }

    handleCheckbox = (id, completed) => {
        if (!completed) {
        APIManager.patch("tasks", id, { completion: true })
            .then(() => {
                this.getTasksAndSetState()
            })
        } else {
            APIManager.patch("tasks", id, { completion: false })
            .then(() => {
                this.getTasksAndSetState()
            })
        }
    }

    render() {

        return (
            <>
                <div
                    className="dim pointer ma3 ph4 blue"
                    onClick={() => { this.props.history.push("/tasks/new") }}>
                    Create New Task
                </div>
                <hr />
                <div className="ma3 ph4 w-60">
                    <h2 className="ttu f3 fw6">Uncompleted:</h2>
                    {this.state.uncompleteTasks.map((task, index) =>
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
                <div className="ma3 ph4 w-60">
                    <h2 className="ttu f3 fw6">Completed:</h2>
                    {this.state.completeTasks.map((task) =>
                        <TaskCard
                            key={task.id}
                            task={task}
                            isFirst={false}
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