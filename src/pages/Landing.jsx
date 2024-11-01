import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function Landing() {
  return (
    <>
      <div className='container-fluid bg-white text-primary d-flex justify-content-center align-items-center' style={{ height: '90vh', backgroundColor: 'lightyellow' }}>
        <Row className='p-4  align-items-center'>

          <Col sm={12} md={6} className='d-flex justify-content-center flex-column'>
            <h3 id='h1' className='text-dark text-center mb-4 '>Student Management</h3>
            <p id='p1' style={{ textAlign: 'justify' }} className='text-dark'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse suscipit modi blanditiis nobis ad perferendis autem dolor, voluptatum molestiae, omnis sint reprehenderit itaque earum excepturi eligendi.
              Ullam minus minima aut . Esse suscipit modi blanditiis nobis ad perferendis autem dolor, voluptatum molestiae!
            </p>
            <div className='d-grid'>
              <Link className='btn btn-dark' to={'/auth'}>Let's Start</Link>
            </div>
          </Col>
          <Col sm={12} md={6} className='mb-4'>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/student-wearing-mask-sitting-on-study-table-in-classroom-illustration-download-svg-png-gif-file-formats--learning-class-people-illustrations-3916564.png?f=webp"
              alt="can't load" className='img-fluid rounded' />
          </Col>
        </Row>
      </div>
    </>
  )
}
export default Landing
