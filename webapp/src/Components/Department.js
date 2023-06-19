import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import departmentLogo from "../images/department-lg.png";
import switchOrder from "../images/switch-order-logo.png";
import vector from "../images/Vector.png";

function Department() {
  const [tag, setTag] = useState("dname");
  const [order, setOrder] = useState("1");
  const [noOfDepartments, setDepartmentNo] = useState(0);
  const [noOfFaculties, setFacultyNo] = useState(0);
  const [noOfStudents, setStudentNo] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  async function getCount() {
    try {
      const doc = await fetch("/api/department/count");
      const { noOfDepartments, noOfFaculties, noOfStudents } = await doc.json();
      setDepartmentNo(noOfDepartments);
      setFacultyNo(noOfFaculties);
      setStudentNo(noOfStudents);
    } catch (err) {
      console.log(err);
    }
  }

  async function getDepartments() {
    try {
      const doc = await fetch(`/api/department?tag=${tag}&order=${order}`);
      const departments = await doc.json();
      setDepartments(departments);
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchVal !== "") {
      const doc = await fetch(
        `/api/department/search?tag=${tag}&filter=${searchVal}`
      );
      const result = await doc.json();
      setDepartments(result);
    } else {
      const doc = await fetch(`/api/department?tag=dname`);
      const result = await doc.json();
      setDepartments(result);
    }
  };
  const handleKeyDown = async (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") handleSubmit(e);
  };

  const handleOrder = (e) => {
    e.preventDefault();
    if (order === "1") setOrder("-1");
    else setOrder("1");
  };

  useEffect(() => {
    getCount();
    getDepartments();
  }, [tag, order, noOfDepartments, noOfFaculties, noOfStudents]);
  return (
    <>
      <div>
        <Row>
          <Col className="leftside" md={2}>
            <p>
              <span
                className="pageimageholder"
                style={{ marginTop: "40px", border: "1px solid" }}
              >
                <img
                  style={{ marginTop: "40px" }}
                  src={departmentLogo}
                  alt=""
                />
              </span>
            </p>
            <p className="page-title">DEPARTMENTS</p>
            <p>
              No. of departments: <b>{noOfDepartments}</b> <br></br>
              No. of teachers: <b>{noOfFaculties}</b> <br></br>
              No. of students: <b>{noOfStudents}</b>
            </p>
          </Col>
          {/* <Col md={1}></Col> */}
          <Col className="rightside" md={8}>
            <Row>
              <Col
                md={1}
                onClick={() => {
                  setTag("dname");
                }}
              >
                Name
              </Col>
              <Col
                md={1}
                onClick={() => {
                  setTag("fname");
                }}
              >
                H.O.D
              </Col>
              <Col
                className="mr-auto"
                md={1}
                onClick={() => {
                  setTag("strength");
                }}
              >
                Strength
              </Col>

              <input
                className="search"
                type="text"
                placeholder="Search"
                value={searchVal}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                style={{ border: "1px solid black" }}
              />
              <buttton onClick={handleOrder}>
                <img src={switchOrder} alt=""></img>{" "}
              </buttton>
            </Row>
            <hr></hr>
            {/* MAIN */}
            <Row className="homerow justify-content-md-center">
              {departments.length > 0 &&
                departments.map((el, id) => (
                  <Col
                    md={5}
                    key={id}
                    className="pagegrid"
                    style={{ border: "1px solid black" }}
                  >
                    <Row>
                      <Col md={1}>
                        <span>
                          <img
                            style={{ marginTop: "30px" }}
                            src={vector}
                            alt=""
                          />
                        </span>
                      </Col>
                      <Col>
                        <br></br>
                        <Link
                          to={`/department/${el.dname
                            .replace(" ", "-")
                            .split("-")
                            .map(
                              (word) =>
                                word.charAt(0).toLowerCase() + word.slice(1)
                            )
                            .join("-")}`}
                        >
                          <p className="grid-title ">{el.dname}</p>
                        </Link>
                        <p className="text-muted float-right mr-4">
                          {" "}
                          - {el.fname}
                        </p>
                      </Col>
                    </Row>
                    <p style={{ position: "absolute", bottom: "0" }}>
                      Strength: {el.strength}
                    </p>
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Department;
