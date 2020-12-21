import React, {  useState } from "react";
import { Col, Container, Row, Form , Button} from "react-bootstrap";
import Layout from "../../Component/Layout";
import Input from "../../Component/UI/Input/index";
import Modal from "../../Component/UI/Modal/index";


import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../actions"; 


const Category = (props) => {
    const category = useSelector((state) => state.category);

    const [show, setShow] = useState(false);

    const [categoryName, setcategoryName] = useState();
    const [categoryParentId, setcategoryParentId] = useState();
    const [categoryImage, setcategoryImage] = useState();
    const dispatch = useDispatch();


    const handleClose = () => {
        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', categoryParentId);
        form.append('categoryImage', categoryImage); 

        dispatch(addCategory(form));

        setcategoryName('');
        setcategoryParentId('');

        setShow(false);
    }
    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li className="nav-item" key={category.name}>
                    {category.name}
                    {category.childreen.length > 0 ? (<ul className="">{renderCategories(category.childreen)}</ul>)  : null}
                 </li>
            );
        }
        return myCategories;
    };


    const createCategoryList = (categories, option = []) => {
        for (let category of categories) {
            option.push({ value: category._id, name: category.name })

             if(category.childreen.length > 0) {
                createCategoryList(category.childreen, option)
            }
        }
        return option;
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

            <Modal show={show} handleClose={handleClose} title={'Add Category'}>
                <Form>
                    <Input
                        label="Category Name"
                        placeholder="Name"
                        value={categoryName}
                        type="email"
                        onChange={(e) => setcategoryName(e.target.value)}
                    />
                    <select className="form-control mb-3" value={categoryParentId} onChange={(e) => setcategoryParentId(e.target.value)}>
                        <option>Select category</option> 
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

            </Modal>

        </Layout>
    );
};

export default Category;
