// Copyright (C) 2020-2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserList } from 'actions/user-actions';
import { CombinedState, UserState } from 'reducers/interfaces';
import Spin from 'antd/lib/spin';
import { Table, Tag, Space } from 'antd';
import { Row, Col } from 'antd';
import './styles.scss';
export default function UserListComponent(): JSX.Element {


    const columns = [
      {
        title: 'SL NO',
        dataIndex: 'id',
        key: 'id',
        minWidth: 320,
    },
        {
            title: 'USERNAME',
            dataIndex: 'username',
            key: 'username',
            minWidth: 320,
        },
        {
            title: 'EMAIL ADDRESS',
            dataIndex: 'email',
            key: 'email',
            minWidth: 320,
        },
        {
          title: 'FIRST NAME',
          dataIndex: 'firstName',
          key: 'firstName',
          minWidth:320,
      },
      {
        title: 'LAST NAME',
        dataIndex: 'lastName',
        key: 'lastName',
        minWidth: 320,
    },
    {
      title: 'STAFF STATUS',
      dataIndex: 'isStaff',
      key: 'isStaff',
      minWidth: 320,
  },
    ];
    const dispatch = useDispatch();
// code added by Raju
 const currentData= useSelector((state: CombinedState)  => state.userList);
 const userFetching = useSelector((state: CombinedState) => state.userList.fetching);
 const [userlist, setValue] = React.useState([]);
 const [FilterdValue, setFilterValue] = React.useState([]);

    console.log(userlist);

     useEffect(() => {
         dispatch(getUserList());
     }, [dispatch]);
    React.useEffect(() => {
        setValue(currentData.users);
       setFilterValue(currentData.users);
       },[currentData])
// code ended up
    const handleSearch = (event:any) => {
       let value = event.target.value.toLowerCase();
       let result = [];
       result = userlist.filter((data:any) => {
        return data.username.toLowerCase().search(value) !== -1;
         });
             setFilterValue(result);
      }
      const PAGE_SIZE = 5
      console.log(userFetching);
      if (userFetching) {
        return <Spin size='large' className='cvat-spinner' tip='Loading...' />;
    }
    return (
        <>
            <Row justify='center' align='middle'>
                <Col className='user-list-title'>
                    <h2>User List</h2>
                </Col>
            </Row>
            <Row justify='center' align='top' className='cvat-create-task-form-wrapper search-wrapper'>
            <Col md={20} lg={16} xl={14} xxl={9}>


                <label className="search-label">Search:
                <input id ="user-list-search" type="text" onKeyUp={(event) =>handleSearch(event)} /></label>
                <Table rowKey='id' dataSource={FilterdValue} columns={columns} size="middle" pagination={{ pageSize: PAGE_SIZE}}/>

                </Col>
            </Row>
        </>
    );
}
