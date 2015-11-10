import React from 'react';

export default React.createClass({
  getInitialState: function() {
    return {
      newTask: '',
      tasks: []
    }
  },

  removeTask: function(index, e) {
    e.preventDefault();
    this.state.tasks.splice(index, 1);

    this.setState({
      tasks: this.state.tasks
    });
  },

  addTask: function(e) {
    e.preventDefault();

    this.setState({
      newTask: '',
      tasks: this.state.tasks.concat({
        title: this.state.newTask,
        completed: false
      })
    });
  },

  completeTask: function(index, e) {
    e.preventDefault();
    var tasks = this.state.tasks;
    tasks[index].completed = true;

    this.setState({
      tasks: tasks
    });
  },

  onChange: function(e) {
    this.setState({
      newTask: e.target.value
    });
  },

  render: function() {
    var inProcessTasks = this.state.tasks.filter(task => !task.completed);
    var completedTasks = this.state.tasks.filter(task => task.completed);

    if(inProcessTasks.length) {
      var list = this.state.tasks.map((task, index) => {
        if(!task.completed) {
          return (
            <li className="list-group-item" key={index}>
              {task.title}
              <div className="btn-group pull-right">
                <a className="btn btn-success-outline btn-sm"
                  href="#"
                  onClick={this.completeTask.bind(this, index)}>&#10004;</a>

                <a className="btn btn-danger-outline btn-sm"
                  href="#"
                  onClick={this.removeTask.bind(this, index)}>X</a>
              </div>
            </li>
          )
        }
      });

      var inProcessMarkup = (
        <div>
          <h2 className="m-b">{inProcessTasks.length} Task(s)</h2>
          <ul className="list-group">{list}</ul>
        </div>
      )
    }

    if(completedTasks.length) {
      var list = completedTasks.map((task, index) => {
        return (
          <li className="list-group-item" key={index}>
            {task.title}
          </li>
        )
      });

      var completedMarkup = (
        <div>
          <h2 className="m-b m-t">{completedTasks.length} Completed Task(s)</h2>
          <ul className="list-group">{list}</ul>
        </div>
      )
    }

    return (
      <section>
        <nav className="navbar navbar-light bg-faded">
          <div className="container">
            <a className="navbar-brand" href="#">Tasks</a>
          </div>
        </nav>

        <div className="container m-t">
          <form className="m-b" onSubmit={this.addTask}>
            <input type="text"
              className="form-control"
              placeholder="I need to..."
              value={this.state.newTask}
              onChange={this.onChange} />
          </form>

          {inProcessMarkup}
          {completedMarkup}
        </div>
      </section>
    )
  }
});
