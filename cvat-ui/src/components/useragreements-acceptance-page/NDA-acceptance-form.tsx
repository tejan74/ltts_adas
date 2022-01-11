// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

// import React, { useRef } from 'react';
// import { Link } from 'react-router-dom';
import React from 'react';
import { Col, Row } from 'antd/lib/grid';
import Layout from 'antd/lib/layout';
import { Button } from 'antd';
// import './styles.scss';
import { useDispatch } from 'react-redux';
import FooterDrawer from 'components/login-page/intel-footer-drawer';
import { getAcceptanceAsync } from '../../actions/acceptance-saga-action';

const { Content } = Layout;
/**
 * Component for displaying Terms and condition acceptance message and then redirecting to the login page
 */

function AgreementConfirmationPage(): JSX.Element {
    const dispatch = useDispatch();
    const acceptance = (event: any) => {
        event.preventDefault();
        dispatch(getAcceptanceAsync());
    };
    // const linkRef = useRef();
    return (
        <Layout>
            <Content>
                <Row justify='center' align='middle' id='email-confirmation-page-container'>
                    <Col>
                        <h1>Terms and condition</h1>
                        <p>INTRODUCTION</p>
                        We L&T Technology Services Limited (hereinafter referred to as “LTTS”, “we”, “our”, “us”) are
                        committed to safeguarding the privacy of our website visitors; in this policy,
                        we explain how we will treat your personal information.

                        This website usage privacy policy was last updated on 1.1.2022.

                        By using our website and agreeing to this policy,
                        you enable us to process your personal data
                        which is collected through this website in
                        accordance with the terms & conditions of this policy.
                        {/* <Link to='/auth/login' ref={linkRef}>Or click this link</Link> */}

                    </Col>
                    <Button type='primary' onClick={(event) => acceptance(event)}>Acceptance</Button>
                </Row>
            </Content>
            <FooterDrawer />
        </Layout>
    );
}

export default AgreementConfirmationPage;
