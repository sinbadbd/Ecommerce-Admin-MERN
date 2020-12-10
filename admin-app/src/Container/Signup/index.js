import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Input from '../../Component/UI/index';
import Layout from '../../Component/Layout';
import { Redirect } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { signup } from '../../actions/user.action';


const SignUp = (props) => {

    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user);

    const dispatch = useDispatch()

    const userSignup = (e) => {
        e.preventDefault();
        const user = {
            firstName, lastName, email, password
        }
        dispatch(signup(user))
    }


    if (auth.authenticate) {
        return <Redirect to={`/`} />
    }

    // if (user.loading) {
    //     return <p>Loading...!</p>;
    // }

    return (
        <>
            <Layout>
                <Container>
                    <Row className="mx-auto">
                        {user.message}
                        <Col xs={5}>
                            <Form onSubmit={userSignup}>

                                <Col>
                                    <Input
                                        label="First Name"
                                        placeholder="First Name"
                                        value={firstName}
                                        type="text"
                                        onChange={(e) => setfirstName(e.target.value)}
                                    />
                                </Col>
                                <Col>
                                    <Input
                                        label="Last Name"
                                        placeholder="Last Name"
                                        value={lastName}
                                        type="text"
                                        onChange={(e) => setlastName(e.target.value)}

                                    />
                                </Col>

                                <Col>
                                    <Input
                                        label="Email"
                                        placeholder="Email"
                                        value={email}
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}

                                    />
                                </Col>
                                <Col>
                                    <Input
                                        label="password"
                                        placeholder="password"
                                        value={password}
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}

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