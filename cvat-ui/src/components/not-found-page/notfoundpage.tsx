

import React from 'react'
import { Row, Col } from 'antd/lib/grid';
const PageNotFound = () => {
    return (
        <Row justify='center'  align="middle" className='cvat-project-page'>
            <Col md={10} lg={18} xl={16} xxl={14}>
        <div id="wrapper">
              <h3>404 - Invalid User! You don't have permission to view this Page</h3>
        </div >
        </Col>
        </Row>
    )
}

export default PageNotFound