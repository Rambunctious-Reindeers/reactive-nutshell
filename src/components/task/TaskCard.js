/*author:  Sullivan Pierce,  purpose:  this component creates an individual card for a single task */

import React, { Component } from 'react'
import "../Nutshell.css"



class TaskCard extends Component {



    render() {

        const { taskName, dueDate } = this.props.task;

        const cardCheckbox = this.props.task.completion ?
            <input className="dib" type="checkbox" defaultChecked={true} onClick={() => this.props.handleCheckbox((this.props.task.id), this.props.task.completion)} /> :
            <input className="dib" type="checkbox"  onClick={() => this.props.handleCheckbox(this.props.task.id)} />

        const cardContent =
            <div className="pa2 ma2">
                <div
                    className="f3 fl pr3 pb4 gray hover-orange pointer" 
                    alt="Edit task"
                    onClick={() => { this.props.history.push(`/tasks/${this.props.task.id}/edit`) }}>
                        &#x270E;
                </div>
                {cardCheckbox}
                <h3 className="ttu f4 fw6 dib pl3 blue">{taskName}</h3>
                <p className="f6">
                    <span className="i dib">Finish By:</span>
                    <span className="fw6 dib pl1">{dueDate}</span>
                </p>
                <div className="ttu f7 fw6 fr grow pointer orange" onClick={() => this.props.deleteTask(this.props.task.id)}>
                    Delete task
                </div>
            </div>

        const cardContainer = this.props.isFirst ?
            <div className="card-first pv1">{cardContent}</div> : <div className="pv1">{cardContent}<hr/></div>


        return cardContainer;
    }
}

export default TaskCard