



// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

// import React from 'react';
// import { connect } from 'react-redux';

// import { UserState , CombinedState } from 'reducers/interfaces';
// import UserListComponent from 'components/user-list-page/user-list';

// import { getUserList } from 'actions/user-actions';

// interface StateToProps {
//     userList: UserState;
// }

// interface DispatchToProps {
//     getTasks: () => void;
// }

// interface OwnProps {
//     onSwitchPage: (page: number) => void;
// }

// function mapStateToProps(state: CombinedState): StateToProps {
//     return {
//         userList: state.userList,
//     };
// }

// function mapDispatchToProps(dispatch: any): DispatchToProps {
//     return {
//         getTasks: (): void => {
//             dispatch(getUserList());
//         },
//     };
// }

// type TasksListContainerProps = StateToProps & DispatchToProps & OwnProps;

// function TasksListContainer(props: TasksListContainerProps): JSX.Element {
//     const { userList, onSwitchPage } = props;

//     return (
//         <UserListComponent
//             onSwitchPage={onSwitchPage}
//             // currentTasksIndexes={1}
//             currentPage={1}
//             numberOfTasks={10}
//         />
//     );
// }

// export default connect(mapStateToProps, mapDispatchToProps)(TasksListContainer);
