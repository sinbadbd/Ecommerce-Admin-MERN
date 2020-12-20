import React, { useEffect, useState } from "react";
import Layout from '../../Component/Layout'
import { Col, Container, Row, Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../Component/UI/index";
import {  addProduct } from "../../actions";

const Products = (props) => {

    const [prouctName, setProuctName] = useState('');
    const [price,setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [productPictures, setProductPictures] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [reviews, setReviews] = useState('');


    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const category = useSelector((state) => state.category);
    const product  = useSelector((state) => state.product);
    

    const dispatch = useDispatch();

    useEffect(() => {

    }, [])


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



    const handleClose = () => {
        const form = new FormData();
        form.append('name', prouctName);
        form.append('price', price);
        form.append('quantity', quantity);
        form.append('description', description);
        form.append('category', categoryId);

        for (let pic of productPictures) {
            form.append("productPicture", pic);
          }

        dispatch(addProduct(form))
        // dispatch(addCategory(form));

        setShow(false);
    }

    const handleProductPicture = (e) => {
        setProductPictures([
            ...productPictures, 
            e.target.files[0]]
        );
        // setProductPictures([
        //     ...productPictures,
        //     e.target.files[0]
        // ]);
        // console.log('handleCategoryImageChange')
        console.log(productPictures);
    }
   
    return (
        <Layout sidebar>
            <Container>
                <Row className="pt-4">
                    <Col md={10}>
                        <h4>Products</h4>
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
                            label="Product Name"
                            placeholder="Product Name"
                            value={prouctName}
                            type="text"
                            onChange={(e) => setProuctName(e.target.value)}
                        />
                        <select className="form-control mb-3" value={categoryId} onChange={(e) =>setCategoryId(e.target.value)}>

                            { 
                            createCategoryList(category.categories).map(option =>
                                <option key={option.value} value={option.value}>{option.name}</option>)
                            }
                        </select>
                        <Input
                            label="Price"
                            placeholder="price"
                            value={price}
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <Input
                            label="Quantity"
                            placeholder="Quantity"
                            value={quantity}
                            type="number"
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <Input
                            label="Description"
                            placeholder="Description"
                            value={description}
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="custom-file form-control">
                            <input type="file" className="custom-file-input" name="productPicture" onChange={handleProductPicture}></input>
                            <label className="custom-file-label"  >Choose file</label>
                        </div>

                        {
                            productPictures.length > 0 ? 
                            productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
                        }

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button> */}
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}

export default Products
