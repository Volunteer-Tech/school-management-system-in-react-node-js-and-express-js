import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import projectLogo from "../images/project-lg.png";
import switchOrder from "../images/switch-order-logo.png";
import book from "../images/case.png";

function Project() {
  const [tag, setTag] = useState('pname');
  const [order, setOrder] = useState('1');
  const [noOfProjects, setProjectNo] = useState(0);
  const [noOfStudents, setStudentNo] = useState(0);
  const [noOfFaculties, setFacultyNo] = useState(0);
  const [projects, setProjects] = useState([]);
  const [searchVal, setSearchVal] = useState('');

  async function getCount() {
    try {
      const doc = await fetch('/api/project/count');
      const { noOfProjects, noOfStudents, noOfFaculties } = await doc.json();
      setProjectNo(noOfProjects);
      setStudentNo(noOfStudents);
      setFacultyNo(noOfFaculties);
    }
    catch (err) {
      console.log(err)
    }
  }

  async function getProjects() {
    try {
      const doc = await fetch(`/api/project?tag=${tag}&order=${order}`);
      const result = await doc.json();
      setProjects(result);
    }
    catch(err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchVal !== '') {
      const doc = await fetch(`/api/project/search?tag=${tag}&filter=${searchVal}`)
      const result = await doc.json();
      setProjects(result);
    }
    else {
      const doc = await fetch(`/api/project?tag=pname`)
      const result = await doc.json();
      setProjects(result);
    }
  };
  const handleKeyDown = async (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') handleSubmit(e);
  };

  const handleOrder = (e) => {
    e.preventDefault();
    if(order === '1')
      setOrder('-1');
    else 
      setOrder('1');
  }

  useEffect(() => {
    getCount();
    getProjects();
  }, [ tag, order, noOfProjects, noOfStudents, noOfFaculties]);
  console.log(searchVal);

    return (
      <div>
        <Row>
          <Col className="leftside" md={2}>
            <p>
              <span className="pageimageholder" style={{ border: "1px solid" }}>
                <img style={{ marginTop: "40px" }} src={projectLogo} alt="" />
              </span>
            </p>
            <p className="page-title">PROJECTS</p>
            <p>
              No. of projects: <b>{noOfProjects}</b> <br></br>
              No. of professor: <b>{noOfFaculties}</b> <br></br>
              No. of students: <b>{noOfStudents}</b>
            </p>
          </Col>
          {/* <Col md={1}></Col> */}
          <Col className="rightside" md={8} >
            <Row>
              <Col md={1} onClick={() => {setTag('pname')}}>
                Projects
              </Col>
              <Col md={1} onClick={() => {setTag('fname')}}>
                Professor
              </Col>
              <Col className="mr-auto" md={1} onClick={() => {setTag('p_desc')}}>
                Description
              </Col>

              <input className="search" type="text" placeholder="Search" style={{ border: "1px solid" }} value={searchVal} onChange={handleChange} onKeyDown={handleKeyDown} />
              <buttton onClick={handleOrder}>
                <img src={switchOrder} alt=""></img>{" "}
              </buttton>
            </Row>
            <hr></hr>
            {/* MAIN */}
            <Row className="homerow justify-content-md-center">
            { projects.length > 0 && projects.map((el, id) => (
              <Col key={id} md={5} className="pagegrid" style={{ border: "1px solid" }}> 
                <Row>
                  <Col className="mr-3" md={1}>
                    <span>
                      <img style={{ marginTop: "30px" }} src={book} alt="" />
                    </span>
                  </Col>
                  <Col>
                    <br></br>
                    <p className="grid-title ">{el.pname}</p>

                    <p className="text-muted">
                      {el.p_desc}
                    </p>
                  </Col>
                </Row>
                <p style={{ position: "absolute", bottom: "0" }}>
                  Professor: {el.fname}
                </p>
              </Col>
            ))}
            </Row>
          </Col>
        </Row>
      </div>
    );
}

export default Project;
