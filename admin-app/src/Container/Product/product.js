import React, { useEffect, useState } from "react";
import Layout from "../../Component/Layout";
import { Col, Container, Row, Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";

import Input from "../../Component/UI/Input/index";
import Modal from "../../Component/UI/Modal/index";
import {generatePublicURL} from "../../UrlConfig"

const Products = (props) => {
    const [prouctName, setProuctName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [productPictures, setProductPictures] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [reviews, setReviews] = useState("");
    const [productDetailsModel, setProductDetailsModel] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const category = useSelector((state) => state.category);
    const product = useSelector((state) => state.product);

    const dispatch = useDispatch();

    useEffect(() => { }, []);



    const createCategoryList = (categories, option = []) => {
        for (let category of categories) {
            option.push({ value: category._id, name: category.name });

            // children: Now it now working from API
            if(category.childreen.length >0) {

                createCategoryList(category.childreen, option)

                // (<ul className="">{renderCategories(category.childreen)
            }
        }
        return option;
    };

    const handleClose = () => {
        const form = new FormData();
        form.append("name", prouctName);
        form.append("price", price);
        form.append("quantity", quantity);
        form.append("description", description);
        form.append("category", categoryId);

        for (let pic of productPictures) {
            form.append("productPicture", pic);
        }

        dispatch(addProduct(form));
        // dispatch(addCategory(form));

        setShow(false);
    };

    const handleProductPicture = (e) => {
        setProductPictures([...productPictures, e.target.files[0]]);
        console.log(productPictures);
    };



    const renderProducts =() => {
        return (
            <Table responsive="sm mt-4">
            <thead>
                <tr>
                    <th>#id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Category</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>

                {
                    product.products.length > 0 ? 
                    product.products.map(product => 
                        <tr key={product._id}>
                            <td>1</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.category}</td>
                            <td>
                                <Button onClick={()=>showProductDetailsModal(product)} className="btn-primary btn-sm">View</Button>
                                <Button className="btn-primary btn-sm">Edit</Button>
                                <Button className="btn-danger btn-sm">Delete</Button>
                            </td>
                        </tr>
                    )
                    : 0

                }
       
            </tbody>
        </Table>
        )
    }

    const handleCloseProduductDetailsModal = () => {
        setProductDetailsModel(false)
    }

    const showProductDetailsModal = (product) => {
        setProductDetails(product)
        setProductDetailsModel(true)
        console.log(product)
    }
    const renderProductDetailsModal = () => {
        if(!productDetails){
            return null
        }
        return (
            <Modal size="lg"
                show={productDetailsModel} 
                handleClose={handleCloseProduductDetailsModal} 
                title="Product Details">

                <Row className="border border-top-0 border-left-0 border-right-0 py-2">
                    <Col className="col-3">
                        <label className="font-weight-bold mb-0">Name:</label>
                    </Col>
                    <Col className="col-9">
                        <p className="mb-0">{productDetails.name}</p>
                    </Col>
                </Row>
                <Row className="border border-top-0 border-left-0 border-right-0 py-2">
                    <Col className="col-3">
                        <label className="font-weight-bold mb-0">Category name:</label>
                    </Col>
                    <Col className="col-9">
                        <p className="mb-0">{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row className="border border-top-0 border-left-0 border-right-0 py-2">
                    <Col className="col-3">
                        <label className="font-weight-bold mb-0">Price:</label>
                    </Col>
                    <Col className="col-9">
                        <p className="mb-0">{productDetails.price}</p>
                    </Col>
                </Row>
                <Row className="border border-top-0 border-left-0 border-right-0 py-2">
                    <Col className="col-3">
                        <label className="font-weight-bold mb-0">Quantity:</label>
                    </Col>
                    <Col className="col-9">
                        <p className="mb-0">{productDetails.quantity}</p>
                    </Col>
                </Row>
                <Row className="border border-top-0 border-left-0 border-right-0 py-2">
                    <Col className="col-3">
                        <label className="font-weight-bold mb-0">Description:</label>
                    </Col>
                    <Col className="col-9">
                        <p className="mb-0">{productDetails.description}</p>
                    </Col>
                </Row>

                <Row className=" py-2">

                    <Col className="col-3">
                        <label className="font-weight-bold">Product Image</label>
                    </Col>
                    <Col className="col-9">
                        <Row>
                            {
                                productDetails.productPicture.length > 0 ? 
                                    productDetails.productPicture.map(productPicture => 
                                            <Col className="col-2">
                                                <img className="img-fluid" src={generatePublicURL(productPicture.img)}></img>
                                            </Col>
                                    
                                    )
                                : ('No image uploaded!')
                                
                            }
                        </Row>
                    </Col>


               
                </Row>

            </Modal>
        )
    }


    const renderProductsModal = () => {
        return (
            <Modal show={show} handleClose={handleClose} title={'Add Product'}>
                <Form>
                    <Input
                        label="Product Name"
                        placeholder="Product Name"
                        value={prouctName}
                        type="text"
                        onChange={(e) => setProuctName(e.target.value)}
                    />
                    <select
                        className="form-control mb-3"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        {createCategoryList(category.categories).map((option) => (
                            <option key={option.value} value={option.value} className="children">
                                {option.name}
                            </option>
                        ))}
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
                        <input
                            type="file"
                            className="custom-file-input"
                            name="productPicture"
                            onChange={handleProductPicture}
                        ></input>
                        <label className="custom-file-label">Choose file</label>
                    </div>

                    {productPictures.length > 0
                        ? productPictures.map((pic, index) => (
                            <div key={index}>{pic.name}</div>
                        ))
                        : null}

                      
                </Form>

            </Modal>
        )
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
                        <div>
                             {renderProducts()}
                        </div>
                    </Col>
                </Row>
            </Container>

            { renderProductsModal()}
            { renderProductDetailsModal() }
        </Layout>
    );
};

export default Products;
