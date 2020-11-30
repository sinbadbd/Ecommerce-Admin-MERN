import React from 'react'
import { Container,Row,Col ,Form,Label,Control,Button} from 'react-bootstrap'
import Layout from '../../Component/Layout'
const  SignUp = (props) => {
    return (
        <>
            <Layout>
                <Container>
                    <Row className="mx-auto">
                        <Col xs={5}>
                            <Form>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" />
                                    </Form.Group>
        
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        </>
    )
}

export default SignUp