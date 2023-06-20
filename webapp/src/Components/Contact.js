import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import home from "../images/home.png";
import phone from "../images/phone.png";
import fax from "../images/fax.png";
import email from "../images/emil.png";
import website from "../images/website.png";

class Contact extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col md={1}></Col>
          <Col>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <Row>
              <Col md={3}>
                {" "}
                <img className="mr-2" src={home} alt="" />
                <b className="mt-2"> Address: </b>{" "}
              </Col>
              <Col>
          North Gondar Zone, Amhara Region, Ethiopia
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col md={3}>
                {" "}
                <img className="mr-2" src={phone} alt="" />
                <b className="mt-2"> Phone: </b>{" "}
              </Col>
              <Col>+251 703 80 7472/+251 929 24 7472</Col>
            </Row>
            <br></br>
            <Row>
              <Col md={3}>
                {" "}
                <img className="mr-2" src={fax} alt="" />
                <b className="mt-2"> Fax: </b>{" "}
              </Col>
              <Col>251324592</Col>
            </Row>
            <br></br>
            <Row>
              <Col md={3}>
                {" "}
                <img className="mr-2" src={email} alt="" />
                <b className="mt-2"> Email: </b>{" "}
              </Col>
              <Col>hello@volunteer-tech.com / support@volunteer-tech.com</Col>
            </Row>
            <br></br>
            <Row>
              <Col md={3}>
                {" "}
                <img className="mr-2" src={website} alt="" />
                <b className="mt-2"> Website: </b>{" "}
              </Col>
              <Col>www.volunteer-tech.com</Col>
            </Row>
          </Col>
          <Col md={5}>
            <div className="mt-5">
              <h2>CONTACT US</h2>
              <br></br>
              <br></br>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15080.05015075494!2d72.8371074!3d19.1071059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x75f29a4205098f99!2sDwarkadas%20Jivanlal%20Sanghvi%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1604506625307!5m2!1sen!2sin"
                width="602"
                height="459"
                frameborder="0"
                style={{ border: "0" }}
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
              ></iframe>
            </div>
          </Col>
          <Col md={1}></Col>
        </Row>
      </div>
    );
  }
}

export default Contact;
