import React, { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import base_url from '../services/base_url';
import { updateStudentApi } from '../services/allApi';
import { editResponseContext } from '../Contextapi/Contextapi';
import { toast } from 'react-toastify';

function Edit({ student }) {
    const [show, setShow] = useState(false);
    const handleClose = () => 
        {    
            setShow(false);
        }
    const handleShow = () => setShow(true);

    const [detail, setDetail] = useState({ ...student })
    const [preview, setPreview] = useState("")
    const {editResponse, setEditResponse} = useContext(editResponseContext)


    useEffect(() => {
        if (detail.image.type) {
            setPreview(URL.createObjectURL(detail.image))
        }
        else {
            setPreview("")
        }
    }, [detail.image])



    const handleEdit = async () => {
        console.log(detail);
        const { name, batch, phone, image } = detail
        if (!name || !batch || !phone || !image) {
            toast.warning("Enter invalid Inputs")
        } else {
            if (image.type) {
                const fd = new FormData()
                fd.append("name", name)
                fd.append("batch", batch)
                fd.append("phone", phone)
                fd.append("image", image)
                const header = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Token ${sessionStorage.getItem('token')}`
                }
                const res = await updateStudentApi(student._id, fd, header)
                if (res.status == 200) {
                    toast.success("Updated Successfully")
                    setEditResponse(res)
                    handleClose()
                    setDetail({...res.data})
                    setPreview("")
                } else {
                    toast.error("Updation Failed!!")
                    console.log(res);
                    
                }
            }else{
                const header = {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${sessionStorage.getItem('token')}`
                }
                const res = await updateStudentApi(student._id, detail, header)
                if (res.status == 200) {
                    toast.success("Updated Successfully")
                    setEditResponse(res)
                    handleClose()
                    setDetail({...res.data})
                    setPreview("")
                } else {
                    toast.error("Updation Failed!!")
                    console.log(res);
                    
                }
            }
        }
    }

    return (
        <>
            <button className='btn' onClick={handleShow}>
                <i className="fa-solid fa-file-pen fs-3" style={{ color: "#47bd9a", }} /></button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className='modal-xl'>
                <Modal.Header closeButton>
                    <Modal.Title>Update Student Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <label>
                                <input type="file" style={{ visibility: 'hidden' }} onChange={(e) => setDetail({ ...detail, image: e.target.files[0] })} />
                                <img src={preview ? preview : `${base_url}/uploads/${student?.image}`} alt="can't load"
                                    className='img-fluid ' />
                            </label>
                        </Col>
                        <Col sm={6} className='d-flex flex-column justify-content-center '>
                            <input type="text" defaultValue={student?.name} onChange={(e) => setDetail({ ...detail, name: e.target.value })} placeholder='Enter Name' name='name' className='form-control mb-3' />
                            <input type="text" defaultValue={student?.batch} onChange={(e) => setDetail({ ...detail, batch: e.target.value })} placeholder='Enter Batch' name='batch' className='form-control mb-3' />
                            <input type="number" defaultValue={student?.phone} onChange={(e) => setDetail({ ...detail, phone: e.target.value })} placeholder='Enter Phone Number' name='phone' className='form-control mb-3' />
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={handleEdit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Edit