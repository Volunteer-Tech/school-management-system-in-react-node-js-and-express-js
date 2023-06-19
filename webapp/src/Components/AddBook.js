import { isInteger } from "lodash";
import React, { useState, useEffect } from "react";

function AddBook(props) {
  const [action, setAction] = useState("ADD");
  const [bname, setBname] = useState("");
  const [author, setAuthor] = useState("");
  const [edition, setEdition] = useState("");

  const handleAuthor = (e) => {
    setAuthor(e.target.value);
  };

  const handleBookname = (e) => {
    setBname(e.target.value);
  };

  const handleEdition = (e) => {
    setEdition(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const slug = window.location.href.slice(30);
      var editionNo = parseFloat(edition);
      var feedback_div = document.getElementById("feedback");
      feedback_div.innerHTML = "";
      if (bname === "" || author === "" || editionNo === "") {
        var error =
          "<p class='alert alert-danger'>Please enter the missing values</p>";
      } else {
        if (isInteger(editionNo)) {
          var error = "";
          const data = { bname: bname, author: author, edition: editionNo };
          if (slug === "add") {
            await fetch("/api/library/add", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
          } else {
            await fetch(`/api/library/${slug}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
          }
          window.location.href = "http://localhost:3000/library";
        } else {
          var error =
            "<p class='alert alert-danger' >Enter integer for edition</p>";
        }
      }

      feedback_div.innerHTML = error;
    } catch (err) {
      console.log(err);
    }
  };

  async function getBook(bookid) {
    const doc = await fetch(`/api/library/book/${bookid}`);
    const { bname, author, edition } = await doc.json();
    setBname(bname);
    setAuthor(author);
    setEdition(edition);
  }

  useEffect(() => {
    const slug = window.location.href.slice(30).toUpperCase();
    setAction(slug);
    if (slug !== "ADD") {
      getBook(slug.slice(7));
    }
  }, []);
  console.log(action);
  console.log(bname, author, edition);
  return (
    <div style={{ textAlign: "center" }}>
      <br></br>
      <h2>LIBRARY REPOSITORY</h2>
      <br></br>
      <div className="center-div" style={{ border: "1px solid" }}>
        {action === "ADD" && <h3>ADD A BOOK</h3>}
        {action !== "ADD" && <h3>UPDATE A BOOK</h3>}
        <br></br>
        <div id="feedback"></div>
        <br></br>
        <div className="row align-items-end">
          <div className="col-3">
            <label>Book Name: </label>
          </div>
          <div className="col-7">
            <input
              className="form-control"
              onChange={handleBookname}
              value={bname}
              style={{ border: "1px solid" }}
            />
          </div>
        </div>
        <br></br>
        <div className="row align-items-end">
          <div className="col-3">
            <label>Book Author: </label>
          </div>
          <div className="col-7">
            <input
              className="form-control"
              onChange={handleAuthor}
              value={author}
              style={{ border: "1px solid" }}
            />
          </div>
        </div>
        <br></br>
        <div className="row align-items-end">
          <div className="col-3">
            <label>Book Edition: </label>
          </div>
          <div className="col-7">
            <input
              className="form-control"
              onChange={handleEdition}
              value={edition}
              style={{ border: "1px solid" }}
            />
          </div>
        </div>

        <br></br>
        {action === "ADD" && (
          <button class="create-btn" onClick={handleSubmit}>
            CREATE
          </button>
        )}
        {action !== "ADD" && (
          <button class="create-btn" onClick={handleSubmit}>
            UPDATE
          </button>
        )}
      </div>
    </div>
  );
}

export default AddBook;
