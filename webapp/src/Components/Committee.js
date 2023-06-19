import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import committeeLogo from "../images/commitee-lg.png";
import switchOrder from "../images/switch-order-logo.png";
import bulb from "../images/bulb.png";

function Committee() {
  const [tag, setTag] = useState("cname");
  const [order, setOrder] = useState("1");
  const [type, setType] = useState(1);
  const [noOfCommittees, setCommitteeNo] = useState(0);
  const [noOfVictories, setVictoryNo] = useState(0);
  const [noOfEvents, setEventNo] = useState(0);
  const [noOfStudents, setStudentNo] = useState(0);
  const [committees, setCommittees] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  async function getCount() {
    try {
      const doc = await fetch("/api/committee/count");
      const {
        noOfCommittees,
        noOfVictories,
        noOfEvents,
        noOfStudents,
      } = await doc.json();
      setCommitteeNo(noOfCommittees);
      setVictoryNo(noOfVictories);
      setEventNo(noOfEvents);
      setStudentNo(noOfStudents);
    } catch (err) {
      console.log(err);
    }
  }

  async function getDepartments() {
    try {
      const doc = await fetch(`/api/committee?tag=${tag}&order=${order}`);
      const result = await doc.json();
      setCommittees(result);
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
        `/api/committee/search?tag=${tag}&filter=${searchVal}`
      );
      const result = await doc.json();
      setCommittees(result);
    } else {
      const doc = await fetch(`/api/committee?tag=cname`);
      const result = await doc.json();
      setCommittees(result);
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
  }, [tag, order, noOfCommittees, noOfEvents, noOfVictories, noOfStudents]);
  console.log(committees);
  return (
    <div>
      <Row>
        <Col className="leftside" md={2}>
          <p>
            <span className="pageimageholder" style={{ border: "1px solid" }}>
              <img style={{ marginTop: "40px" }} src={committeeLogo} alt="" />
            </span>
          </p>
          <p className="page-title">Committees</p>
          <p>
            No. of committees: <b>{noOfCommittees}</b> <br></br>
            No. of students: <b>{noOfStudents}</b>
            <br></br>
            No. of victories: <b>{noOfVictories}</b> <br></br>
            No. of events: <b>{noOfEvents}</b>
          </p>
        </Col>
        {/* <Col md={1}></Col> */}
        <Col className="rightside" md={8}>
          <Row>
            <Col
              md={1}
              onClick={() => {
                setTag("cname");
              }}
            >
              Name
            </Col>
            <Col
              className="mr-5"
              md={1}
              onClick={() => {
                setTag("fname");
              }}
            >
              Chairperson
            </Col>
            <Col
              className="mr-auto"
              md={1}
              onClick={() => {
                setTag("accolades");
              }}
            >
              Accolades
            </Col>

            <input
              className="search"
              type="text"
              placeholder="Search"
              style={{ border: "1px solid" }}
              value={searchVal}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <buttton onClick={handleOrder}>
              <img src={switchOrder} alt=""></img>{" "}
            </buttton>
          </Row>
          <hr></hr>
          {/* MAIN */}
          <Row className="homerow justify-content-md-center">
            {committees.length > 0 &&
              committees.map((el, id) => (
                <Col
                  md={5}
                  key={id}
                  className="pagegrid"
                  style={{ border: "1px solid" }}
                >
                  <Row>
                    <Col md={1}>
                      <span>
                        <img style={{ marginTop: "30px" }} src={bulb} alt="" />
                      </span>
                    </Col>
                    <Col>
                      <br></br>
                      <p className="grid-title ">{el.cname}</p>
                      {el.isTech ===1 && <p className="text-muted">Type: Technical</p> }
                      {el.isTech !==1 && <p className="text-muted">Type: Non-Technical</p> }
                      <p className="text-muted float-right mr-4">
                        {" "}
                        - {el.fname}
                      </p>
                    </Col>
                  </Row>
                  <p style={{ position: "absolute", bottom: "0" }}>
                    Accolades: {el.accolades}
                  </p>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Committee;
