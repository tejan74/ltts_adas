// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useState } from 'react';
import { Col, Row } from 'antd/lib/grid';
import Layout from 'antd/lib/layout';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { Document, Page, pdfjs } from 'react-pdf';
import './userstyle.scss';
// import FooterDrawer from 'components/login-page/intel-footer-drawer';
import { getAcceptanceAsync } from '../../actions/acceptance-saga-action';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import aggreementpdf from '../../assets/LTTS_freelance_agreement.pdf';
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
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [renderNavButtons, setRenderNavButtons] = useState<Boolean>(false);
    const onDocumentLoadSuccess = ({numPages}): void => {
        setNumPages(numPages);
        setRenderNavButtons(true);
      }
    const changePage = (offset: number): void => {
        setPageNumber((prevPageNumber) => prevPageNumber + offset);
    };
    const previousPage = (): void => {
        return changePage(-1);
    };
    const nextPage = (): void => {
        return changePage(+1);
    };


    return (
        <Layout>
            <Content>
                <Row justify='center' align='middle'>
                    <Col>
                        <div>
                            <Document
                                file={aggreementpdf}
                                onLoadSuccess={onDocumentLoadSuccess}
                            >
                                <Page pageNumber={pageNumber} />
                            </Document>
                            <p justify='center' align='middle'>
                                Page {pageNumber} of {numPages}
                            </p>
                            {renderNavButtons && (
                                <div className='button' justify='center' align='middle'>
                                    <Button type='default' disabled={pageNumber <= 1} onClick={previousPage}>
                                        Previous Page
                                    </Button>
                                    {'  '}
                                    <Button disabled={pageNumber === numPages} onClick={nextPage} type='default'>
                                        Next Page
                                    </Button>
                                   {pageNumber === numPages && (
                                    <Button type='primary'  onClick={(event) => acceptance(event)}>
                                        Acceptance
                                    </Button>
                                      )}
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Content>
            {/* <FooterDrawer /> */}
        </Layout>
    );
}

export default AgreementConfirmationPage;
