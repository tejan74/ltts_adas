// Copyright (C) 2020-2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spin from 'antd/lib/spin';
import { Table, Row, Col } from 'antd';
import './styles.scss';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { getUserList } from 'actions/user-actions';
import { CombinedState } from 'reducers/interfaces';

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
            align: 'center',
            render: (text: any) =>
                (text ? <CheckCircleTwoTone twoToneColor='#52c41a' /> : <CloseCircleTwoTone twoToneColor='#ff0000' />),
            // <CheckCircleTwoTone twoToneColor="#52c41a" />
        },
    ];
    const dispatch = useDispatch();
    // code added by Raju
    const currentData = useSelector((state: CombinedState) => state.userList);
    const userFetching = useSelector((state: CombinedState) => state.userList.fetching);
    const [userlist, setValue] = React.useState([]);
    const [FilterdValue, setFilterValue] = React.useState([]);

    // console.log(currentData);

    useEffect(() => {
        dispatch(getUserList());
    }, [dispatch]);
    React.useEffect(() => {
        setValue(currentData.users);
        setFilterValue(currentData.users);
    }, [currentData]);

    // code ended up
    const handleSearch = (event: any) => {
        const value = event.target.value.toLowerCase();
        let result = [];
        result = userlist.filter((data: any) => data.username.toLowerCase().search(value) !== -1);

        setFilterValue(result);
    };
    const PAGE_SIZE = 5;
    // giconsole.log(userFetching);
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
                    <label htmlFor='user-list-search' className='search-label'>
                        Search:
                        <input id='user-list-search' type='text' onKeyUp={(event) => handleSearch(event)} />
                    </label>
                    <Table
                        rowKey='id'
                        dataSource={FilterdValue}
                        columns={columns}
                        size='middle'
                        pagination={{ pageSize: PAGE_SIZE }}
                    />
                </Col>
            </Row>
        </>
    );
}
