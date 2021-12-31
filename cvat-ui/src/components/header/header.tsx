// Copyright (C) 2020-2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import './styles.scss';
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
// import { Row, Col } from 'antd/lib/grid';
import Icon, {
    SettingOutlined,
    // InfoCircleOutlined,
    EditOutlined,
    LoadingOutlined,
    LogoutOutlined,
    // GithubOutlined,
    QuestionCircleOutlined,
    CaretDownOutlined,
    ControlOutlined,
} from '@ant-design/icons';
import Layout from 'antd/lib/layout';
import Button from 'antd/lib/button';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import Modal from 'antd/lib/modal';
import Text from 'antd/lib/typography/Text';

import IdleTimer from 'react-idle-timer';
import getCore from 'cvat-core-wrapper';
// import consts from 'consts';

// New code added by Raju N
// import { CVATLogo, AccountIcon } from 'icons';
import { AccountIcon } from 'icons';
// New code added by Raju N
import ChangePasswordDialog from 'components/change-password-modal/change-password-modal';
import { switchSettingsDialog as switchSettingsDialogAction } from 'actions/settings-actions';
// import { logoutAsync, authActions } from 'actions/auth-actions';
// import { authActions } from 'actions/auth-actions';
import { authSagaActions } from 'sagas/auth-saga';
import { CombinedState } from 'reducers/interfaces';
import { logoutAsync } from 'actions/auth-saga-actions';
import SettingsModal from './settings-modal/settings-modal';

const core = getCore();

interface Tool {
    name: string;
    description: string;
    server: {
        host: string;
        version: string;
    };
    core: {
        version: string;
    };
    canvas: {
        version: string;
    };
    ui: {
        version: string;
    };
}

interface StateToProps {
    user: any;
    tool: Tool;
    switchSettingsShortcut: string;
    settingsDialogShown: boolean;
    changePasswordDialogShown: boolean;
    changePasswordFetching: boolean;
    logoutFetching: boolean;
    renderChangePasswordItem: boolean;
    isAnalyticsPluginActive: boolean;
    isModelsPluginActive: boolean;
    isGitPluginActive: boolean;
}

interface DispatchToProps {
    onLogout: () => void;
    switchSettingsDialog: (show: boolean) => void;
    switchChangePasswordDialog: (show: boolean) => void;
}

function mapStateToProps(state: CombinedState): StateToProps {
    const {
        auth: {
            user,
            fetching: logoutFetching,
            fetching: changePasswordFetching,
            showChangePasswordDialog: changePasswordDialogShown,
            allowChangePassword: renderChangePasswordItem,
        },
        plugins: { list },
        about: { server, packageVersion },
        shortcuts: { normalizedKeyMap },
        settings: { showDialog: settingsDialogShown },
    } = state;

    return {
        user,
        tool: {
            name: server.name as string,
            description: server.description as string,
            server: {
                host: core.config.backendAPI.slice(0, -7),
                version: server.version as string,
            },
            canvas: {
                version: packageVersion.canvas,
            },
            core: {
                version: packageVersion.core,
            },
            ui: {
                version: packageVersion.ui,
            },
        },
        switchSettingsShortcut: normalizedKeyMap.SWITCH_SETTINGS,
        settingsDialogShown,
        changePasswordDialogShown,
        changePasswordFetching,
        logoutFetching,
        renderChangePasswordItem,
        isAnalyticsPluginActive: list.ANALYTICS,
        isModelsPluginActive: list.MODELS,
        isGitPluginActive: list.GIT_INTEGRATION,
    };
}

function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        onLogout: (): void => dispatch(logoutAsync()),
        switchSettingsDialog: (show: boolean): void => dispatch(switchSettingsDialogAction(show)),
        switchChangePasswordDialog: (show: boolean): void => dispatch(authSagaActions.switchChangePasswordDialog(show)),
    };
}

type Props = StateToProps & DispatchToProps;

function HeaderContainer(props: Props): JSX.Element {
    const {
        user,
        tool,
        logoutFetching,
        changePasswordFetching,
        settingsDialogShown,
        switchSettingsShortcut,
        onLogout,
        switchSettingsDialog,
        switchChangePasswordDialog,
        renderChangePasswordItem,
        isAnalyticsPluginActive,
        isModelsPluginActive,
    } = props;
    const [IsVisible, setIsVisible] = useState(false);
    const [idleTimer, setidleTimer] = useState(0);
    const [logoutTimer, setlogoutTimer] = useState(0);
    const idleTimerRef = useRef(idleTimer);
    // const {
    //     CHANGELOG_URL, LICENSE_URL, GITTER_URL, FORUM_URL, GITHUB_URL,
    // } = consts;
    const active = true;
    const history = useHistory();
    const sessionTimeoutPeriod = 1;
    let timeout: any;
    // code added by Raju
    const onLogoutPopConfirm = (): void => {
        Modal.confirm({
            title: 'Do you want to logout?',
            content: 'All related data (images, annotations) will be lost. Continue?',
            className: 'cvat-modal-confirm-delete-task',
            onOk: () => {
                onLogout();
            },
            okButtonProps: {
                type: 'primary',
                danger: true,
            },
            okText: 'Yes',
            cancelText: 'No',
        });
    };
    // code added by Raju
    const showSessionModal = (): void => {
        setIsVisible(true);
    };
    const handleStayLoggedIn = (): void => {
        if (logoutTimer) {
            clearTimeout(logoutTimer);
            setlogoutTimer(0);
        }
        setidleTimer(0);
        setIsVisible(false);
    };
    const onIdle = (): void => {
        showSessionModal();
        timeout = setTimeout(() => {
            onLogout();
            setIsVisible(false);
        }, 1000 * 20 * 1); // 20 seconds
        setlogoutTimer(timeout);
    };
    // code ended above added by Raju
    // function showAboutModal(): void {
    //     Modal.info({
    //         title: `${tool.name}`,
    //         content: (
    //             <div>
    //                 <p>{`${tool.description}`}</p>
    //                 <p>
    //                     <Text strong>Server version:</Text>
    //                     <Text type='secondary'>{` ${tool.server.version}`}</Text>
    //                 </p>
    //                 <p>
    //                     <Text strong>Core version:</Text>
    //                     <Text type='secondary'>{` ${tool.core.version}`}</Text>
    //                 </p>
    //                 <p>
    //                     <Text strong>Canvas version:</Text>
    //                     <Text type='secondary'>{` ${tool.canvas.version}`}</Text>
    //                 </p>
    //                 <p>
    //                     <Text strong>UI version:</Text>
    //                     <Text type='secondary'>{` ${tool.ui.version}`}</Text>
    //                 </p>
    //                 {/* <Row justify='space-around'>
    //                     <Col>
    //                         <a href={CHANGELOG_URL} target='_blank' rel='noopener noreferrer'>
    //                             What&apos;s new?
    //                         </a>
    //                     </Col>
    //                     <Col>
    //                         <a href={LICENSE_URL} target='_blank' rel='noopener noreferrer'>
    //                             License
    //                         </a>
    //                     </Col>
    //                     <Col>
    //                         <a href={GITTER_URL} target='_blank' rel='noopener noreferrer'>
    //                             Need help?
    //                         </a>
    //                     </Col>
    //                     <Col>
    //                         <a href={FORUM_URL} target='_blank' rel='noopener noreferrer'>
    //                             Forum on Intel Developer Zone
    //                         </a>
    //                     </Col>
    //                 </Row> */}
    //             </div>
    //         ),
    //         width: 800,
    //         okButtonProps: {
    //             style: {
    //                 width: '100px',
    //             },
    //         },
    //     });
    // }

    const menu = (
        <Menu className='cvat-header-menu' mode='vertical'>
            {user.isSuperuser && (
                <Menu.Item
                    key='admin_page'
                    onClick={(): void => {
                        // false positive
                        // eslint-disable-next-line
                        window.open(`${tool.server.host}/admin`, '_blank');
                    }}
                >
                    <ControlOutlined />
                    Admin page
                </Menu.Item>
            )}
            {user.isSuperuser && (
                <Menu.Item
                    key='settings'
                    title={`Press ${switchSettingsShortcut} to switch`}
                    onClick={() => switchSettingsDialog(true)}
                >
                    <SettingOutlined />
                    Settings
                </Menu.Item>
            )}
            {/* <Menu.Item key='about' onClick={showAboutModal}>
                <InfoCircleOutlined />
                About
            </Menu.Item> */}

            {renderChangePasswordItem && (
                <Menu.Item
                    key='change_password'
                    className='cvat-header-menu-change-password'
                    onClick={(): void => switchChangePasswordDialog(true)}
                    disabled={changePasswordFetching}
                >
                    {changePasswordFetching ? <LoadingOutlined /> : <EditOutlined />}
                    Change password
                </Menu.Item>
            )}

            <Menu.Item key='logout' onClick={onLogoutPopConfirm} disabled={logoutFetching}>
                {logoutFetching ? <LoadingOutlined /> : <LogoutOutlined />}
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout.Header className='cvat-header'>
            <Modal
                title='Session Timeout!'
                visible={IsVisible}
                onOk={onLogout}
                onCancel={handleStayLoggedIn}
                okText='Logout'
                cancelText='Stay'
            >
                <p>
                    Your session is about to expire in 5 seconds due to inactivity. You will be redirected to the login
                    page.
                </p>
            </Modal>
            <IdleTimer
                crossTab={active}
                ref={idleTimerRef}
                timeout={1000 * 60 * sessionTimeoutPeriod}
                onIdle={onIdle}
                // stopOnIdle={active}
            />
            <div className='cvat-left-header'>
                {/* New code added below by Raju N */}
                <Button
                    className='cvat-header-button'
                    type='link'
                    value='projects'
                    href='/projects'
                    onClick={(event: React.MouseEvent): void => {
                        event.preventDefault();
                        history.push('/projects');
                    }}
                >
                    ADAS-LTTS
                </Button>
                {/* New code added above by Raju N */}
                {/* <Icon className='cvat-logo-icon' component={CVATLogo} /> */}
                {user.isSuperuser && (
                    <Button
                        className='cvat-header-button'
                        type='link'
                        value='projects'
                        href='/projects'
                        onClick={(event: React.MouseEvent): void => {
                            event.preventDefault();
                            history.push('/projects');
                        }}
                    >
                        Projects
                    </Button>
                )}
                {user.isSuperuser ? (
                    <Button
                        className='cvat-header-button'
                        type='link'
                        value='tasks'
                        href='/tasks?page=1'
                        onClick={(event: React.MouseEvent): void => {
                            event.preventDefault();
                            history.push('/tasks?page=1');
                        }}
                    >
                        Tasks
                    </Button>
                ) : (
                    <Button
                        className='cvat-header-button'
                        type='link'
                        value='tasks'
                        href='/tasks?page=1'
                        onClick={(event: React.MouseEvent): void => {
                            event.preventDefault();
                            history.push('/tasks?page=1');
                        }}
                    >
                        My Tasks
                    </Button>
                )}
                <Button
                    className='cvat-header-button'
                    type='link'
                    value='cloudstorages'
                    href='/cloudstorages?page=1'
                    onClick={(event: React.MouseEvent): void => {
                        event.preventDefault();
                        history.push('/cloudstorages?page=1');
                    }}
                >
                    Cloud Storages
                </Button>
                {user.isSuperuser && (
                    <Button
                        className='cvat-header-button'
                        type='link'
                        value='userlist'
                        href='/userlist'
                        onClick={(event: React.MouseEvent): void => {
                            event.preventDefault();
                            history.push('/userlist');
                        }}
                    >
                        User List
                    </Button>
                )}
                {isModelsPluginActive && (
                    <Button
                        className='cvat-header-button'
                        type='link'
                        value='models'
                        href='/models'
                        onClick={(event: React.MouseEvent): void => {
                            event.preventDefault();
                            history.push('/models');
                        }}
                    >
                        Models
                    </Button>
                )}
                {isAnalyticsPluginActive && (
                    <Button
                        className='cvat-header-button'
                        type='link'
                        href={`${tool.server.host}/analytics/app/kibana`}
                        onClick={(event: React.MouseEvent): void => {
                            event.preventDefault();
                            // false positive
                            // eslint-disable-next-line
                            window.open(`${tool.server.host}/analytics/app/kibana`, '_blank');
                        }}
                    >
                        Analytics
                    </Button>
                )}
            </div>
            <div className='cvat-right-header'>
                {/* <Button
                    className='cvat-header-button'
                    type='link'
                    href={GITHUB_URL}
                    onClick={(event: React.MouseEvent): void => {
                        event.preventDefault();
                        window.open(GITHUB_URL, '_blank');
                    }}
                >
                    <GithubOutlined />
                    <Text className='cvat-text-color'>GitHub</Text>
                </Button> */}
                <Button
                    className='cvat-header-button'
                    type='link'
                    // href='https://openvinotoolkit.github.io/cvat/docs'
                    onClick={(event: React.MouseEvent): void => {
                        event.preventDefault();
                        // false positive
                        // eslint-disable-next-line
                        // window.open('https://openvinotoolkit.github.io/cvat/docs');
                    }}
                >
                    <QuestionCircleOutlined />
                    Help
                </Button>
                <Dropdown overlay={menu} className='cvat-header-menu-dropdown' trigger={['click']}>
                    <span>
                        <Icon className='cvat-header-account-icon' component={AccountIcon} />
                        <Text strong>
                            {user.username.length > 14 ? `${user.username.slice(0, 10)} ...` : user.username}
                        </Text>
                        <CaretDownOutlined className='cvat-header-menu-icon' />
                    </span>
                </Dropdown>
            </div>
            {user.isSuperuser && (
                <SettingsModal visible={settingsDialogShown} onClose={() => switchSettingsDialog(false)} />
            )}
            {renderChangePasswordItem && <ChangePasswordDialog onClose={() => switchChangePasswordDialog(false)} />}
        </Layout.Header>
    );
}

function propsAreTheSame(prevProps: Props, nextProps: Props): boolean {
    let equal = true;
    for (const prop in nextProps) {
        if (prop in prevProps && (prevProps as any)[prop] !== (nextProps as any)[prop]) {
            if (prop !== 'tool') {
                equal = false;
            }
        }
    }

    return equal;
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(HeaderContainer, propsAreTheSame));
