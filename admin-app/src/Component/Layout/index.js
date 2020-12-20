import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Header from '../Header'

import { NavLink } from 'react-router-dom'

const Layout = (props) => {
    return (
        <>
            <Header />
            {
                props.sidebar ?
                    <Container fluid>
                        <Row>
                            <Col lg={2} className="bg-light h-vh100">
                                <ul className="nav flex-column">
                                    <li className="nav-item ">
                                        <NavLink className="active" to={`/`}>Home</NavLink>
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
                              {props.children}
                            </Col>
                        </Row>
                    </Container>
                    :
                    props.children
            }

        </>
    )
}

export default Layout
