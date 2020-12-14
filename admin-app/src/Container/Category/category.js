import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../../Component/Layout'
import { useDispatch } from 'react-redux';
import { getAllCategory } from '../../actions';


const  Category = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, [])


    return (
        <Layout sidebar>
            <Container>
                <Row className="pt-4">
                    <Col md={10}>
                        <h4>Category</h4>
                    </Col>
                    <Col>
                    <button type="button" className="btn btn-primary">Primary</button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Category