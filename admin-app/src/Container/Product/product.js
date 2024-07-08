import React, { useEffect, useState } from "react";
import Layout from "../../Component/Layout";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";
import { DataGrid } from '@mui/x-data-grid';
import Modal from "../../Component/UI/Modal/index";

const Products = () => {
    const [productDetailsModel, setProductDetailsModel] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const category = useSelector((state) => state.category);
    const product = useSelector((state) => state.product);

    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(getProducts()); // Fetch products when component mounts
    }, [dispatch]);

    const handleCloseProductDetailsModal = () => {
        setProductDetailsModel(false);
    };

    const showProductDetailsModal = (product) => {
        setProductDetails(product);
        setProductDetailsModel(true);
        console.log(product);
    };

    const renderProductDetailsModal = () => {
        if (!productDetails) {
            return null;
        }
        return (
            <Modal
                size="lg"
                show={productDetailsModel}
                handleClose={handleCloseProductDetailsModal}
                title="Product Details"
                onSubmit={handleCloseProductDetailsModal}
            >
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
                        <p className="mb-0">
                            {productDetails.category}
                        </p>
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
                <Row className="py-2">
                    <Col className="col-3">
                        <label className="font-weight-bold">Product Image</label>
                    </Col>
                    <Col className="col-9">
                        <Row>
                            {productDetails.productPicture && productDetails.productPicture.length > 0 ? (
                                productDetails.productPicture.map((pic, index) => (
                                    <Col key={index} className="col-2">
                                        <img className="img-fluid" src={pic} alt="product" />
                                    </Col>
                                ))
                            ) : (
                                'No image uploaded!'
                            )}
                        </Row>
                    </Col>
                </Row>
            </Modal>
        );
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 150, editable: true },
        { field: 'price', headerName: 'Price', width: 150, editable: true },
        { field: 'quantity', headerName: 'Quantity', width: 110, editable: true },
        { field: 'category', headerName: 'Category', width: 150, editable: true },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                < div className="flex gap-2">
                    <Button onClick={() => showProductDetailsModal(params.row)} className="btn-success btn-outline btn-sm">View</Button>
                    <Button className="btn-primary btn-sm">Edit</Button>
                    <Button className="btn-danger btn-sm">Delete</Button>
                </div>
            )
        }
    ];

    const rows = product.products?.map((prod, index) => ({
        id: prod._id,
        name: prod.name,
        price: prod.price,
        quantity: prod.quantity,
        category: prod.category?.name,
    })) || [];

    return (
        <Layout sidebar>
            <Container>
                <Row className="pt-4">
                    <Col md={10}>
                        <h4 className="text-3xl font-bold underline">Products</h4>
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={handleShow}>
                            Add
                        </Button>{" "}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{ height: 800, width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={50}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                                disableSelectionOnClick
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
            {renderProductDetailsModal()}
        </Layout>
    );
};

export default Products;
