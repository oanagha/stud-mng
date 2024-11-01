import React, { useState, useEffect, useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Add from '../components/Add';
import Edit from '../components/Edit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getStudentApi, deleteStudentApi } from '../services/allApi';
import { addResponseContext, editResponseContext } from '../Contextapi/Contextapi';

function Dashboard() {

    const [stud, setStud] = useState([])
    const [searchKey, setSearchKey] = useState("")
    console.log(searchKey);
     const nav=useNavigate()
    const { addResponse, setAddResponse } = useContext(addResponseContext)
    const { editResponse, setEditResponse } = useContext(editResponseContext)

    useEffect(() => {
        getData()
    }, [addResponse, editResponse,searchKey])

    const getData = async () => {
        const header = {
            "Content-Type": "application/json",
            "Authorization": `Token ${sessionStorage.getItem('token')}`
        }
        const res = await getStudentApi(header,searchKey)
        console.log(res);
        if (res.status == 200) {
            setStud(res.data)
        }

    }

    const handledelete = async (id) => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
        }
        const res = await deleteStudentApi(id, header)
        if (res.status == 200) {
            toast.error("Student Removed From List")
            getData()
        } else {
            toast.warning("Something Went Wrong")
            console.log(res);
        }
    }
   const logout=()=>{
    sessionStorage.clear()
    nav('/auth')
   }
    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        <i className="fa-solid fa-school fs-4" style={{ color: "#153266", }} />
                        {' '}
                        Student-Mng
                    </Navbar.Brand>
                    <button className='btn btn-primary' onClick={logout}>Logout</button>
                </Container>
            </Navbar>
            <div className="p-5">
                <div className='d-flex justify-content-between'>
                    <Add />
                    <div>
                        <input type="text" placeholder='Serach Student' className='form-control' onChange={(e)=>setSearchKey(e.target.value)} />
                    </div>
                </div>
                {
                    stud.length > 0 ?

                        <table className="table table-bordered border-dark mt-4">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>BATCH</th>
                                    <th>PHONE</th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    stud?.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.batch}</td>
                                            <td>{item.phone}</td>
                                            <td>
                                                <Edit student={item} />
                                                <button className='btn' onClick={() => handledelete(item._id)}>
                                                    <i className="fa-solid fa-trash-can fs-4" style={{ color: "#9a424b", }} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                        :
                        <h3>No Students Added Yet !!</h3>
                }
            </div>
        </>
    )
}

export default Dashboard