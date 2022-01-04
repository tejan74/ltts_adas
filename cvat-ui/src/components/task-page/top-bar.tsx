// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { useHistory } from 'react-router';
import { Row, Col } from 'antd/lib/grid';
import Icon, { LeftOutlined } from '@ant-design/icons';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';
import Text from 'antd/lib/typography/Text';

import ActionsMenuContainer from 'containers/actions-menu/actions-menu';
import { MenuIcon } from 'icons';

interface DetailsComponentProps {
    taskInstance: any;
    userRole: any;
}

export default function DetailsComponent(props: DetailsComponentProps): JSX.Element {
    console.log(props, 'props');
    const { taskInstance, userRole } = props;
    const history = useHistory();
    const isUseraction = userRole?.isSuperuser;
    return (
        <Row className='cvat-task-top-bar' justify='space-between' align='middle'>
            <Col>
                {taskInstance.projectId === 'null' ? (
                    <Button
                        onClick={() => history.push(`/projects/${taskInstance.projectId}`)}
                        type='link'
                        size='large'
                    >
                        {/* <LeftOutlined />
                        Back to project */}
                    </Button>
                ) : (
                    <Button onClick={() => history.push('/tasks')} type='link' size='large'>
                        <LeftOutlined />
                        Back to tasks
                    </Button>
                )}
            </Col>
            {isUseraction ? (
                <Col>
                    <Dropdown overlay={<ActionsMenuContainer taskInstance={taskInstance} />}>
                        <Button size='large'>
                            <Text className='cvat-text-color'>Actions</Text>
                            <Icon className='cvat-menu-icon' component={MenuIcon} />
                        </Button>
                    </Dropdown>
                </Col>
            ) : null}
        </Row>
    );
}
