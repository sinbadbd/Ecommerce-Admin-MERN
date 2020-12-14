import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../../Component/Layout'
import { NavLink } from 'react-router-dom';

const Home = (props) => {
    return (
        <>
            <Layout>
                <Container fluid>
                    <Row>
                        <Col lg={2} className="bg-light h-vh100">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <NavLink to={`/`}>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={`/category`}>Category</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={`/products`}>Prouduct</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={`/orders`}>Orders</NavLink>
                                </li>
                            </ul>
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
