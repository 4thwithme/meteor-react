import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Tasks } from '../api/tasks.js';

const Task = (props) => {

  const toggleChecked = () => 
    Meteor.call('tasks.setChecked', props.task._id, !props.task.checked);

  const deleteThisTask = () =>
    Meteor.call('tasks.remove', props.task._id);
  
  const togglePrivate = () => 
    Meteor.call('tasks.setPrivate', props.task._id, !props.task.private);

  const taskClassName = classnames({
    checked: props.task.checked,
    private: props.task.private,
  });

  return (
    <li className={taskClassName}>
      <button className="delete" onClick={deleteThisTask}>
        &times;
      </button>

      <input
        type="checkbox"
        readOnly
        checked={!!props.task.checked}
        onChange={toggleChecked}
      />

      {props.showPrivateButton 
        ? <button className="toggle-private" onClick={togglePrivate}>
            { props.task.private ? 'Private' : 'Public' }
          </button>
        : null
      }

      <span className="text">
        <strong>{props.task.username}</strong>
        {' '}
        {props.task.text}
      </span>
    </li>
  );
};

export default Task;