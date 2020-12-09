import React from 'react';
import { Container,Row,Col ,Form,Button} from 'react-bootstrap';
import Input from  '../../Component/UI/index';
import Layout from '../../Component/Layout';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const  SignUp = (props) => {

    const auth = useSelector(state => state.auth)

    if(auth.authenticate){
        return <Redirect to={`/`}/>
    }


    return (
        <>
            <Layout>
                <Container>
                    <Row className="mx-auto">
                        <Col xs={5}>
                            <Form>

                                  <Col>
                                        <Input 
                                                label="First Name"
                                                placeholder="First Name"
                                                value=""
                                                type="text"
                                                onChange={()=>{}}

                                        />
                                  </Col>
                                  <Col>
                                        <Input 
                                                label="Last Name"
                                                placeholder="Last Name"
                                                value=""
                                                type="text"
                                                onChange={()=>{}}

                                        />
                                  </Col>   

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

export default SignUp