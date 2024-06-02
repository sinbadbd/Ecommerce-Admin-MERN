import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Layout from '../../Component/Layout';
import Input from '../../Component/UI/Input/index';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions';
import { Redirect } from 'react-router-dom';

const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const userLogin = (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError('Invalid email address');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setError(''); // Clear any previous errors

        const user = { email, password };
        
        dispatch(login(user));
    };

    if (auth.authenticate) {
        return <Redirect to={`/`} />;
    }

    return (
        <>
            <Layout>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs={5}>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={userLogin}>
                                <Input
                                    label="Email"
                                    placeholder="Email"
                                    value={email}
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    label="Password"
                                    placeholder="Password"
                                    value={password}
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        </>
    );
};

export default SignIn;
