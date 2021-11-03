import { connect } from 'react-redux';

import { Task, TasksQuery, CombinedState } from 'reducers/interfaces';

import UserListComponent from 'components/user-list-page/user-list';

import { getTasksAsync, hideEmptyTasks, importTaskAsync } from 'actions/tasks-actions';


