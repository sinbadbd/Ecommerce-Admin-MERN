import React, { useEffect, useState } from "react";
import Layout from "../../Component/Layout";
import { Col, Container, Row, Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";

import Input from "../../Component/UI/Input/index";
import Modal from "../../Component/UI/Modal/index";
import {generatePublicURL} from "../../UrlConfig"

export default function AddProduct() {
    return (
        <Layout sidebar>
            <Container>
                <Row className="pt-4">
                    <Col md={10}>
                        <h4 className="text-3xl font-bold underline">Add Products</h4>
                    </Col>
                    <Col>
                        <Button variant="primary">
                            Add Product
                        </Button>{" "}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                             {/* {renderProducts()} */}
                        </div>
                    </Col>
                </Row>
            </Container>
{/* 
            { renderProductsModal()}
            { renderProductDetailsModal() } */}
        </Layout>
    );
}
