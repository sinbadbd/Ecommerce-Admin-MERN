import React, { useState } from 'react'
import { Container,Row,Col ,Form,Button } from 'react-bootstrap'
import Layout from '../../Component/Layout'
import Input from  '../../Component/UI/index';

import { useDispatch,useSelector } from 'react-redux';

import { login } from '../../actions';
import { Redirect } from 'react-router-dom';

const  SignIn = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)

    const userLogin = (e) => {
        e.preventDefault();
        const user = {
            email, password
        }
        dispatch(login(user));
    }

    if(auth.authenticate){
        return <Redirect to={`/`}/>
    }

    return (
        <>
            <Layout>
                <Container>
                    <Row className="mx-auto">
                        <Col xs={5}>
                            <Form onSubmit={userLogin}>
                            <Col>
                                        <Input 
                                                label="Email"
                                                placeholder="Email"
                                                value={email}
                                                type="email"
                                                onChange={(e)=> setEmail(e.target.value)}

                                        />
                                  </Col> 
                                  <Col>
                                        <Input 
                                                label="Password"
                                                placeholder="password"
                                                value={password}
                                                type="password"
                                                onChange={(e)=>setPassword(e.target.value)}

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