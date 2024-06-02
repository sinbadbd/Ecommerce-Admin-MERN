import React, { useEffect, useState } from "react";
import Layout from "../../Component/Layout";
import { Col, Container, Row, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";

import Modal from "../../Component/UI/Modal/index";
import { generatePublicURL } from "../../UrlConfig";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [productPictures, setProductPictures] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [reviews, setReviews] = useState("");
    const [productDetailsModel, setProductDetailsModel] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const [show, setShow] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    // Validation state
    const [productNameError, setProductNameError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [quantityError, setQuantityError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [categoryError, setCategoryError] = useState("");

    const handleShow = () => setShow(true);

    const category = useSelector((state) => state.category);
    const product = useSelector((state) => state.product);

    const dispatch = useDispatch();

    useEffect(() => {
        //dispatch(getProducts()); // Fetch products when component mounts
    }, [dispatch]);

    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    

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


    const validateForm = () => {
        let isValid = true;
        if (!productName) {
            setProductNameError("Product name is required");
            isValid = false;
        } else {
            setProductNameError("");
        }

        if (!price) {
            setPriceError("Price is required");
            isValid = false;
        } else if (price <= 0) {
            setPriceError("Price must be greater than zero");
            isValid = false;
        } else {
            setPriceError("");
        }

        if (!quantity) {
            setQuantityError("Quantity is required");
            isValid = false;
        } else if (quantity <= 0) {
            setQuantityError("Quantity must be greater than zero");
            isValid = false;
        } else {
            setQuantityError("");
        }

        if (!description) {
            setDescriptionError("Description is required");
            isValid = false;
        } else {
            setDescriptionError("");
        }

        if (!categoryId) {
            setCategoryError("Category is required");
            isValid = false;
        } else {
            setCategoryError("");
        }

        return isValid;
    };

    const submitProductForm = (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
        }
        setLoading(true);
        setSnackbarOpen(false);
        const form = new FormData();
        form.append("name", productName);
        form.append("price", price);
        form.append("quantity", quantity);
        form.append("description", description);
        form.append("category", categoryId);

        for (let pic of productPictures) {
            form.append("productPicture", pic);
        }

        dispatch(addProduct(form)).then(() => {
            setShow(false);
            setLoading(false);
            resetForm();
            setSnackbarMessage("Product added successfully!");
            setSnackbarOpen(true);
        });
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const resetForm = () => {
        setProductName("");
        setPrice("");
        setQuantity("");
        setDescription("");
        setProductPictures([]);
        setCategoryId("");
    };

    const renderProductsModal = () => {
        return (
            <Form onSubmit={submitProductForm}>
                <Stack spacing={2}>
                    <TextField
                        id="outlined-basic"
                        label="Product Name"
                        variant="outlined"
                        size="small"
                        value={productName}
                        type="text"
                        onChange={(e) => setProductName(e.target.value)}
                        error={!!productNameError}
                        helperText={productNameError}
                    />

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" size="normal">
                            Category
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryId}
                            label="Category"
                            onChange={(e) => setCategoryId(e.target.value)}
                            error={!!categoryError}
                        >
                            {createCategoryList(category.categories).map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {categoryError && <p style={{ color: 'red', margin: '5px 0 0 15px' }}>{categoryError}</p>}
                    </FormControl>

                    <TextField
                        id="outlined-basic"
                        label="Price"
                        variant="outlined"
                        size="small"
                        value={price}
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                        error={!!priceError}
                        helperText={priceError}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Quantity"
                        variant="outlined"
                        size="small"
                        value={quantity}
                        type="number"
                        onChange={(e) => setQuantity(e.target.value)}
                        error={!!quantityError}
                        helperText={quantityError}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        size="small"
                        value={description}
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        error={!!descriptionError}
                        helperText={descriptionError}
                    />

                    <div className="custom-file form-control">
                        <TextField
                            type="file"
                            className="custom-file-input"
                            name="productPicture"
                            onChange={handleProductPicture}
                        />
                        <label className="custom-file-label">Choose file</label>
                    </div>

                    {productPictures.length > 0 && productPictures.map((pic, index) => (
                        <div key={index}>{pic.name}</div>
                    ))}

                    <Button
                        variant="contained"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} color="success" /> : "Save"}
                    </Button>
                </Stack>
            </Form>
        );
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleProductPicture = (e) => {
        setProductPictures([...productPictures, e.target.files[0]]);
        console.log(productPictures);
    };

    const handleCloseProductDetailsModal = () => {
        setProductDetailsModel(false);
    };

    const showProductDetailsModal = (product) => {
        setProductDetails(product);
        setProductDetailsModel(true);
        console.log(product);
    };

    return (
        <Layout sidebar>
            <Container>
                <Row className="pt-4">
                    <Col md={10}>
                        <h4 className="text-base font-bold">Add Products</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <Snackbar
                                anchorOrigin={{ vertical, horizontal }}
                                open={snackbarOpen}
                                onClose={handleSnackbarClose}
                                message={snackbarMessage}
                                key={vertical + horizontal}
                            />
                            {renderProductsModal()}
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default AddProduct;
