import React, { useEffect, useState } from "react";
import { Col, Container, Row, Modal, Button, Form } from "react-bootstrap";
import Layout from "../../Component/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, addCategory } from "../../actions";
// import { Input } from "../Component/UI/Input/index";
import Input from "../../Component/UI/index";

const Category = (props) => {
    const category = useSelector((state) => state.category);

    const [show, setShow] = useState(false);

    const [categoryName, setcategoryName] = useState();
    const [categoryParentId, setcategoryParentId] = useState();
    const [categoryImage, setcategoryImage] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, []);

    const handleClose = () => {
        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', categoryParentId);
        form.append('categoryImage', categoryImage);

        dispatch(addCategory(form));

        setShow(false);
    }
    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li className="nav-item" key={category.slug}>
                    {category.name}
                </li>
            );
        }
        return myCategories;
    };

 
    const createCategoryList = (categories, option = []) => {
        for(let category of categories){
            option.push({value:category._id,name:category.name})

            // children: Now it now working from API
            // if(category.children.label >0) {
            //     createCategoryList(category.children,option)
            // }
        }
        return option
    }

    const handleCategoryImageChange = (e) => {
        setcategoryImage(e.target.files[0]);
    }

    return (
        <Layout sidebar>
            <Container>
                <Row className="pt-4">
                    <Col md={10}>
                        <h4>Category</h4>
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={handleShow}>
                            Add
            </Button>{" "}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ul className="nav flex-column">
                            {renderCategories(category.categories)}
                            {/* {JSON.stringify(createCategoryList(category.categories))} */}
                        </ul>
                    </Col>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Input
                            label="Category Name"
                            placeholder="Name"
                            value={categoryName}
                            type="email"
                            onChange={(e) => setcategoryName(e.target.value)}
                        />
                        <select className="form-control mb-3" value={categoryParentId} onChange={(e) =>setcategoryParentId(e.target.value)}>

                            { 
                                createCategoryList(category.categories).map(option =>
                                    <option key={option.value} value={option.value}>{option.name}</option>)
                            }
                        </select>

                        <div className="custom-file form-control">
                            <input type="file" className="custom-file-input" name="categoryImage" onChange={handleCategoryImageChange}></input>
                            <label className="custom-file-label"  >Choose file</label>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onSubmit={addCategory}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    );
};

export default Category;
