import React from 'react';
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import Input from "../../../Component/UI/Input/index";
import Modal from "../../../Component/UI/Modal/index";

const renderAddCategory = (props) => {

    const { 
        show,
        handleClose,
        modalTitle,
        size,
        categoryName,
        setcategoryName,
        setcategoryParentId,
        categoryParentId,
        categoryList,
        handleCategoryImageChange
    } = props;

    return (
        <Modal 
            show={show} 
            handleClose={handleClose} 
            title={modalTitle}
            size={size}
            >
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
                        categoryList.map(option =>
                            <option key={option.value} value={option.value}>{option.name}</option>)
                    }
                </select>

                <div className="custom-file form-control">
                    <input 
                        type="file" 
                        className="custom-file-input" 
                        name="categoryImage" 
                        onChange={handleCategoryImageChange}>
                    </input>
                    <label className="custom-file-label"  >Choose file</label>
                </div>
            </Form>

        </Modal>
    )
}

export default renderAddCategory;