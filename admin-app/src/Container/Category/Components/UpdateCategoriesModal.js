import React from 'react';
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import Input from "../../../Component/UI/Input/index";
import Modal from "../../../Component/UI/Modal/index";

const renderUpdateCategoryModal = (props) => {

    const {
        show,
        handleClose,
        modalTitle,
        size,
        expandedArrays,
        checkArrays,
        handleCategoryInput,
        categoryList
    } = props;

    return (


        <Modal
            show={show}
            handleClose={handleClose}
            title={modalTitle}
            size={size}>
            <Form>

                <Row>
                    <Col>
                        <h5>Expand Category</h5>
                    </Col>
                </Row>

                <Row>
                    {
                        expandedArrays.length > 0 &&
                        expandedArrays.map((item, index) =>

                            <Row key={index}>
                                <Col>
                                    <Input
                                        placeholder="Name"
                                        value={item.name}
                                        onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                    />
                                </Col>
                                <Col>
                                    <select className="form-control mb-3"
                                        value={item.parentId}
                                        onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                        <option>Select category</option>
                                        {
                                            categoryList.map(option =>
                                                <option key={option.value} value={option.value}>{option.name}</option>)
                                        }
                                    </select>
                                </Col>
                                <Col>
                                    <select className="form-control">
                                        <option>Select category</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page">Page</option>
                                    </select>
                                </Col>
                            </Row>
                        )
                    }
                </Row>


                <Row>
                    <Col>
                        <h5>Checked</h5>
                    </Col>
                </Row>

                <Row>
                    {
                        checkArrays.length > 0 &&
                        checkArrays.map((item, index) =>

                            <Row key={index}>
                                <Col>
                                    <Input
                                        placeholder="Name"
                                        value={item.name}
                                        onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                    />
                                </Col>
                                <Col>
                                    <select className="form-control mb-3"
                                        value={item.parentId}
                                        onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                        <option>Select category</option>
                                        {
                                            categoryList.map(option =>
                                                <option key={option.value} value={option.value}>{option.name}</option>)
                                        }
                                    </select>
                                </Col>
                                <Col>

                                    <select className="form-control">
                                        <option>Select category</option>
                                        <option value="store">Store</option>
                                        <option value="product">Product</option>
                                        <option value="page">Page</option>
                                    </select>
                                </Col>
                            </Row>
                        )
                    }
                </Row>


            </Form>

        </Modal>
    )
}

export default renderUpdateCategoryModal;