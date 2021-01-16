
import React from 'react';
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import Input from "../../../Component/UI/Input/index";
import Modal from "../../../Component/UI/Modal/index";


const renderDeleteCategory = () => {

    const  {
        show,
        handleClose,
        deleteCategoryItem,
        expandedArrays,
        checkArrays
    } = props;

    return (

        <Modal
            show={show}
            handleClose={handleClose} //() => setDeleteCategoryModal(false)
            title={'Delete Category'}
            buttons={[
                {
                    label: 'No',
                    color: 'primary',
                    onClick: () => {
                        alert('no')
                    }
                },
                {
                    label: 'yes',
                    color: 'danger',
                    onClick: deleteCategoryItem
                }
            ]}
        >

            <h5>Extented category</h5>
            { expandedArrays.map((item, index) => <span key={index}> {item.name} </span>)}

            <h5>Checked category</h5>
            { checkArrays.map((item, index) => <span key={index}>{item.name} </span>)}

        </Modal>

    )
}

export default renderDeleteCategory;