import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import Layout from '../../Component/Layout'

const  Home = (props) => {
    return (
        <>
            <Layout>
                <Jumbotron>
                    <h1>Admin Panel</h1>
                </Jumbotron>
            </Layout>
        </>
    )
}

export default Home
