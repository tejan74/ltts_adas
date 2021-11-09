// Copyright (C) 2020-2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserList } from 'actions/user-actions';
import { CombinedState, UserState } from 'reducers/interfaces';
import { Table, Tag, Space } from 'antd';
import { Row, Col } from 'antd';
export default function UserListComponent(): JSX.Element {


    const columns = [
      {
        title: 'SL NO',
        dataIndex: 'id',
        key: 'id',
    },
        {
            title: 'USERNAME',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'EMAIL ADDRESS',
            dataIndex: 'email',
            key: 'email',
        },
        {
          title: 'FIRST NAME',
          dataIndex: 'firstName',
          key: 'firstName',
      },
      {
        title: 'LAST NAME',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
      title: 'STAFF STATUS',
      dataIndex: 'isStaff',
      key: 'isStaff',
  },
    ];
    const dispatch = useDispatch();
// code added by Raju
 const currentData= useSelector((state: CombinedState)  => state.userList);
 const [userlist, setValue] = React.useState(null);
 const [FilterdValue, setFilterValue] = React.useState(null);
    console.log(userlist);

     useEffect(() => {
         dispatch(getUserList());
     }, [dispatch]);
    React.useEffect(() => {
        setValue(currentData.users);
       setFilterValue(currentData.users);
       },[currentData])
// code ended up
    const dimensions = {
        md: 22,
        lg: 18,
        xl: 16,
        xxl: 16,
    };
    const handleSearch = (event:any) => {
       let value = event.target.value.toLowerCase();
       let result = [];
       result = userlist.filter((data:any) => {
        return data.username.toLowerCase().search(value) !== -1;
         });
             setFilterValue(result);
      }
      const PAGE_SIZE = 5
    return (
        <>
            {/* <Table rowKey={(obj) => obj.id} dataSource={userlist} columns={columns} />; */}
            <Row justify='center' align='middle'>
                <Col className='cvat-projects-list'>
                    <h2>User List</h2>
                </Col>
            </Row>
            <Row justify='center' align='middle'>

                <Col>
                <label>Search:
                <input type="text" onKeyUp={(event) =>handleSearch(event)} /></label>
               <Table rowKey='id' dataSource={FilterdValue} columns={columns} size="middle" pagination={{ pageSize: PAGE_SIZE}}/>

                </Col>
            </Row>
        </>
    );
}
