import * as React from "react";
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
// import * as ReactDOM from "react-dom";
import {  Col } from 'antd/lib/grid';
//import { Table } from 'antd';
import getCore from 'cvat-core-wrapper';
import 'actions/auth-actions';
import { getUserList } from 'actions/user-actions';
//import Menu from 'antd/lib/menu';

const cvat = getCore();
// const userList = getUserList();
//console.log(getUserList);
interface DispatchToProps {
  getUsers: () => void;
}
function mapDispatchToProps(dispatch: any): DispatchToProps {
  return {
    getUsers: (): void => dispatch(getUserList()),
      // onLogout: (): void => dispatch(logoutAsync()),
  };
}

type Props =  DispatchToProps;

function UserListComponent(props: Props)  {
  const {
    getUsers
} = props;
console.log("props",props);
getUsers();
  // const users = cvat.users.get({ self: true });
  // users.then((response: any) => {
  //   console.log(response);
  //   const dataSource = [
  //     {
  //       key: '1',
  //       name: 'Mike',
  //       email: 'abcdefg@gmail.com',
  //       role: 'admin',
  //     },
  //     {
  //       key: '2',
  //       name: 'John',
  //       email: 'xxxx@gmail.com',
  //       role: 'checker',
  //     },

  //   ];

  //   const columns = [
  //     {
  //       title: 'Name',
  //       dataIndex: 'name',
  //       key: 'name',
  //     },
  //     {
  //         title: 'email',
  //         dataIndex: 'email',
  //         key: 'email',
  //       },
  //       {
  //         title: 'Role',
  //         dataIndex: 'role',
  //         key: 'role',
  //       },
  //     ];
  //   return (
  //     <div>
  //       <Col md={20} lg={16} xl={14} xxl={9}>
  //         <p>List of Users</p>
  //       </Col>
  //       <Table dataSource={dataSource} columns={columns} />;
  //     </div>
  //   );
  // });
  // console.log(users);


  return (

      //<SettingsModal visible={settingsDialogShown} onClose={() => switchSettingsDialog(false)} />
      <div>
        <Col md={20} lg={16} xl={14} xxl={9}>
          <p>List of Userss</p>
        </Col>
        {/* <Table dataSource={dataSource} columns={columns} />; */}
      </div>

  );

}
export default withRouter(connect(null,mapDispatchToProps)(React.memo(UserListComponent)));