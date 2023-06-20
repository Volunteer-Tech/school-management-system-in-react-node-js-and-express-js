import React from "react";
import dj from "../images/dj.png";

function About() {
  return (
    <div style={{ textAlign: "center" }}>
      <br></br>
      <h2>About us</h2>
      <br></br>
      <div style={{ width: "1300px" }} className="center-div">
        <div className="row">
          <div className="col-6">
            <p className="  ">
          Volunteer Tech® is a professional training and coaching non-profit
         institution founded by a young software engineer and researcher, Aklilu Mandefro 
         in May 2016 with the goal of helping humanity forward and making the world 
        a better place. We are here to inspire and empower the younger generation 
      to be future-proof through our free-of-charge motivational skills training in 
        four areas: personal development, leadership, coding, and research, 
        in a way that makes a difference in their lives and the world. 
        Despite being originally based in two cities, Gondar and Bahir Dar, 
        in Ethiopia, our mission is to reach out to a wider community across Africa.
              <br></br>
              <br></br>
              We focus on creating future leaders, not bosses, by inspiring and 
              empowering youth, especially those from low-income families and 
              disadvantaged or marginalized communities, to face their biggest
              fears and achieve their highest dreams. We inspire the 
              next generation to build a better future not only for 
              themselves but also for the rest of the world.
              <br></br>
              <br></br>
            To date, 3,075 youth have taken the motivational training at Volunteer Tech®, 
            and the result has been encouraging—most of the trainees got hired as 
            software engineers and researchers, started their own businesses, and 
              launched a charity programme to give back to their community.
                There are also 50 trainees who are in their third month of training. 
                Apart from the motivational skills training in four areas,
                as previously mentioned, we also bring hope to many youths
                through our "Hear My Story" programme. Through this programme,
                we invite speakers to share their true life stories to convey meaning,
                  inspire listeners, and transmit wisdom to help struggling individuals 
                  grow, learn, and develop in their personal and professional lives.
            </p>
          </div>
          <div className="align-self-end col-6">
            <img src={dj} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
