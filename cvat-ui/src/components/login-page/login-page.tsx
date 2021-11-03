// Copyright (C) 2020-2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import { Row, Col } from 'antd/lib/grid';
import { Layout, Card } from 'antd';
import FooterDrawer from 'components/login-page/intel-footer-drawer';
import image from '../../assets/car2.jpg';
import profilemage from '../../assets/avatar_2x.png';
import LoginForm, { LoginData } from './login-form';

interface LoginPageComponentProps {
    fetching: boolean;
    renderResetPassword: boolean;
    onLogin: (username: string, password: string) => void;
    onGooglelogin: (googleresponse: any) => void;
}

function LoginPageComponent(props: LoginPageComponentProps & RouteComponentProps): JSX.Element {

    const sizes = {
        xs: { span: 14 },
        sm: { span: 14 },
        md: { span: 12 },
        lg: { span: 12 },
        xl: { span: 12 },
    };

    const { Content } = Layout;

    const { fetching, onLogin, renderResetPassword,onGooglelogin } = props;

    return (
        <Layout>
            <Content>
                <Row>
                    <Col style={{ display: 'flex' }} {...sizes}>
                        <img style={{ width: '100%', border: '1px solid  #959293' }} alt='white-shirt' src={image} />
                    </Col>
                    <Col {...sizes}>
                        <Card
                            style={{
                                width: '100%',
                                border: '1px solid #959293',
                                maxHeight: '445px',
                                height: '427px',
                                background: '#f0f2f5',
                            }}
                        >
                            <img
                                src={profilemage}
                                alt='Avatar'
                                className='avatar'
                                style={{
                                    width: '76px',
                                    height: '76px',
                                    margin: '0 auto 10px',
                                    display: 'block',
                                    borderRadius: '50%',
                                }}
                            />
                            <Title level={5} style={{ textAlign: 'center', padding: '23px' }}>
                                LOGIN
                            </Title>
                            <div>
                                <LoginForm
                                    fetching={fetching}
                                    onSubmit={(loginData: LoginData): void => {
                                        onLogin(loginData.username, loginData.password);
                                    }}
                                    successGoogleLogin={(response:any): void => {
                                        onGooglelogin(response);
                                    }}
                                />
                            </div>
                            {renderResetPassword && (
                                <Row justify='center'>
                                    <Col>
                                        <Text strong style={{ textAlign: 'center' }}>
                                            <Link to='/auth/password/reset'>Forgot password?</Link>
                                        </Text>
                                    </Col>
                                </Row>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Content>
            <FooterDrawer />
        </Layout>
    );
}

export default withRouter(LoginPageComponent);
