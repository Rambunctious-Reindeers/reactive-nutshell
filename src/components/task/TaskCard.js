import React, { Component } from 'react'
import "../Nutshell.css"



class TaskCard extends Component {

    

    render() {

        const { taskName, dueDate } = this.props.task;

        const cardContent =
            <div className="card-content">
               <input type="checkbox" onClick={() => this.props.handleCheckbox(this.props.task.id)}/>
                <h3>Task: <b>{taskName}</b></h3>
                <p>Finish By: {dueDate}</p>

                <button type="button"
                    onClick={() => { this.props.history.push(`/tasks/${this.props.task.id}/edit`) }}>Edit</button>
                <button type="button" onClick={() => this.props.deleteTask(this.props.task.id)}>Delete</button>
            </div>

        const cardContainer = this.props.isFirst ?
            <div className="card-first">{cardContent}</div> : <div className="card">{cardContent}</div>


        return cardContainer;
    }
}

export default TaskCard