import React, { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import Layout from "../../Component/Layout";
import Input from "../../Component/UI/Input/index";
import Modal from "../../Component/UI/Modal/index";

import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdChevronRight,
    MdExpandMore,
    MdIndeterminateCheckBox
} from "react-icons/md";

import { IconName } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../actions";


const Category = (props) => {
    const category = useSelector((state) => state.category);

    const [show, setShow] = useState(false);

    const [categoryName, setcategoryName] = useState();
    const [categoryParentId, setcategoryParentId] = useState();
    const [categoryImage, setcategoryImage] = useState();
    const [checked, setchecked] = useState([]);
    const [expanded, setexpanded] = useState([]);
    const [checkArrays, setcheckArrays] = useState([]);
    const [expandedArrays, setexpandedArrays] = useState([]);
    // const [updateCategory, setupdateCategory] = useState(false);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
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
                {
                    label: category.name,
                    value: category._id,
                    children: category.childreen.length > 0 && renderCategories(category.childreen)
                }
            );
        }
        return myCategories;
    };


    const createCategoryList = (categories, option = []) => {
        for (let category of categories) {
            option.push({ value: category._id, name: category.name, parentId: category._id })

            if (category.childreen.length > 0) {
                createCategoryList(category.childreen, option)
            }
        }
        return option;
    }

    const handleCategoryImageChange = (e) => {
        setcategoryImage(e.target.files[0]);
    }


    const updateCategory = () => {
        setUpdateCategoryModal(true);

        const categories = createCategoryList(category.categories)
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryParentId, index) => {
            const category = categories.find((category, _index) => categoryParentId === category.value);
            category && checkedArray.push(category);
        });

        expanded.length > 0 && expanded.forEach((categoryParentId, index) => {
            const category = categories.find((category, _index) => categoryParentId === category.value);
            category && expandedArray.push(category);
        })
        setcheckArrays(checkedArray)
        setexpandedArrays(expandedArray)
        console.log({ checked, expanded, categories, expandedArray, checkedArray })
    }

    const handleCategoryInput = (key,value, index, type)=>{
        if (type == "checked") {
            const updatedCheckedArray = checkArrays.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
                setcheckArrays(updatedCheckedArray);
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArrays.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
                setexpandedArrays(updatedExpandedArray);
        }
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
                            {/* {renderCategories(category.categories)} */}
                        </ul>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setchecked(checked)}
                            onExpand={expanded => setexpanded(expanded)}
                            icons={{
                                check: <MdCheckBox />,
                                uncheck: <MdCheckBoxOutlineBlank />,
                                halfCheck: <MdChevronRight />,
                                expandClose: <MdExpandMore />,
                                expandOpen: <MdIndeterminateCheckBox />
                            }}
                        />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col md={2}>
                        <Button className="btn btn-danger ">Delete</Button>
                    </Col>
                    <Col md={2}>
                        <Button onClick={() => updateCategory()} className="btn btn-primary ">Update</Button>
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
                    <select className="form-control mb-3" 
                    value={categoryParentId} 
                    onChange={(e) => setcategoryParentId(e.target.value)}>
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


            <Modal show={updateCategoryModal}
                handleClose={() => setUpdateCategoryModal(false)}
                title={'Update Category'} size="lg">
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
                                                createCategoryList(category.categories).map(option =>
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
                                                createCategoryList(category.categories).map(option =>
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

        </Layout>
    );
};

export default Category;
