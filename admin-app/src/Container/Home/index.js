import React from 'react'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap'
import Layout from '../../Component/Layout'

const  Home = (props) => {
    return (
        <>
            <Layout>
                <Container fluid>
                    <Row>
                        <Col lg={2} className="bg-light h-vh100">
                                <h1>side</h1>
                        </Col> 
                        <Col lg={10}>
                            <p>Container</p>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        </>
    )
}

export default Home
