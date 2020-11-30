import React from 'react'
import { Container,Row,Col ,Form,Label,Control,Button} from 'react-bootstrap'
import Layout from '../../Component/Layout'
import Input from  '../../Component/UI/index';

const  SignIn = (props) => {
    return (
        <>
            <Layout>
                <Container>
                    <Row className="mx-auto">
                        <Col xs={5}>
                            <Form>
                            <Col>
                                        <Input 
                                                label="Email"
                                                placeholder="Email"
                                                value=""
                                                type="email"
                                                onChange={()=>{}}

                                        />
                                  </Col> 
                                  <Col>
                                        <Input 
                                                label="password"
                                                placeholder="password"
                                                value=""
                                                type="password"
                                                onChange={()=>{}}

                                        />
                                  </Col> 
        
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

export default SignIn