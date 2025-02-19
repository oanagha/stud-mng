import React, { useState, useEffect,useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addStudentApi } from '../services/allApi';
import { addResponseContext } from '../Contextapi/Contextapi';
function Add() { 
    

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
        
    const handleShow = () => {
            setStudent({
                name: "", batch: "", phone: "", image: ""
            })
            setpreview("")
        setShow(true);
    }

    const [student, setStudent] = useState({
        name: "", batch: "", phone: "", image: ""
    })
    const [preview, setpreview] = useState("")
     
  const{addResponse,setAddResponse}=useContext(addResponseContext)

    useEffect(() => {
        if (student.image) {
            setpreview(URL.createObjectURL(student.image))
        } else {
            setpreview("")
        }
    }, [student.image])

  const handleAddStudent=async()=>{
            console.log(student);
            const {name,batch,phone,image}=student
            if(!name ||!batch ||!phone ||!image){
                toast.warning("Enter valid inputs")
            }else{
                const fd=new FormData()
                fd.append("name",name)
                fd.append("batch",batch)
                fd.append("phone",phone)
                fd.append("image",image)
                const header={
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Token ${sessionStorage.getItem('token')}`
                }
                    const res=await addStudentApi(fd,header)
                    console.log(res);
                    if(res.status==200){
                        toast.success("Addedd Succesfully")
                        handleClose()
                        setAddResponse(res)
                    }
                    else{
                        toast.error("Adding Failed")
                        
                    }

            }
            
  }
    return (
        <>
            <button className='btn btn-danger ' onClick={handleShow}>Add Students<i className="fa-solid fa-user-plus fs-6 ms-1" /></button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className='modal-xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Student Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <label>
                                <input type="file" onChange={(e) => setStudent({ ...student, image: e.target.files[0] })} style={{ visibility: 'hidden' }} />
                                <img src={ preview?preview:"https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"} alt="can't load"
                                    className='img-fluid ' />
                            </label>
                        </Col>
                        <Col sm={6} className='d-flex flex-column justify-content-center '>
                            <input type="text" placeholder='Enter Name' name='name' onChange={(e) => setStudent({ ...student, name: e.target.value })} className='form-control mb-3' />
                            <input type="text" placeholder='Enter Batch' name='dt' onChange={(e) => setStudent({ ...student, batch: e.target.value })} className='form-control mb-3' />
                            <input type="number" placeholder='Enter Phone Number' name='phone' onChange={(e) => setStudent({ ...student, phone: e.target.value })} className='form-control mb-3' />
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddStudent} >Add</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Add