import React, { useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../api/tasks.js';
import { useToggle } from '../hooks'

import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx'


const App = ({tasks, ...props}) => {
  const [text, setText] = useState('');

  const [hideCompleted, toggleHideCompleted] = useToggle(false);

  const renderTasks = () => {
    const filteredTasks = hideCompleted
      ? tasks.filter((task) => !task.checked)
      : tasks;

    return filteredTasks.map((task) => {
      const currentUserId = props.currentUser && props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return <Task key={task._id} task={task} showPrivateButton={showPrivateButton} />
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Meteor.call('task.insert', text)

    setText('');
  };

  return (
    <div className="container">
      <header>
        <h1>Todo List [{props.incompleteCount}]</h1>
      </header>

      <AccountsUIWrapper />

      {!!props.currentUser
        ? <>
            <label className="hide-completed">
              <input
                type="checkbox"
                readOnly
                checked={hideCompleted}
                onClick={() => toggleHideCompleted()} />
              Hide Completed Tasks
            </label>

            <form className="new-task" onSubmit={handleSubmit} >
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type to add new tasks" />
            </form>

            <ul>
              {renderTasks()}
            </ul>
          </>
          : null
      }
      

    </div>
  );
};

//like connect in redux
export default withTracker(() => {
  Meteor.subscribe('tasks');
  
  return {
    tasks: Tasks.find({ owner: Meteor.userId() }, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ owner: Meteor.userId() ,checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  }
})(App);
