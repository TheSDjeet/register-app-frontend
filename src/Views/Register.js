import React from "react";
//import ReactDOM from "react-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "./css/Register.module.css";
import * as http from "../utilities/http-service";
import axios from "axios";
import { Link } from "react-router-dom";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      email: "",
      age: "",
      gender: "",
      dataArr: [],
    };
  }

  upLoadHandler(e) {
    e.preventDefault();
  }

  handleSubmit(e) {
    e.preventDefault();
    const userName = this.state.userName;
    const email = this.state.email;
    const age = this.state.age;
    const gender = this.state.gender;

    const uploadData = async () => {
      const uploadedData = await axios.post(http.GRAPHQL_API, {
        query: `mutation{
          createUser(userName:"${userName}", email:"${email}", gender:"${gender}", age:${age} ){
            userName
         }
         }`,
      });
      console.log(uploadedData);
    };

    const data = { userName, email, age, gender };
    console.log(data);
    uploadData();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className={styles.formLabel}>User Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="eg. Jonas"
            onChange={(e) => {
              this.setState({ userName: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className={styles.formLabel}>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              this.setState({ email: e.target.value });
            }}
          />
          {/* <Form.Text className={styles.formLabel}>
            We'll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className={styles.formLabel}>Age</Form.Label>
          <Form.Control
            type="age"
            placeholder="eg. 24"
            onChange={(e) => {
              this.setState({ age: e.target.value });
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className={styles.formLabel}>Gender</Form.Label>
          <Form.Control
            type="gender"
            placeholder="male"
            onChange={(e) => {
              this.setState({ gender: e.target.value });
            }}
          />
        </Form.Group>
        <Col>
          <Row>
            <Col>
              {" "}
              <Button
                variant="light"
                type="submit"
                style={{ background: "#105652", color: "#ffffff" }}
                onClick={this.handleSubmit.bind(this)}
              >
                Submit
              </Button>
            </Col>
            <Col className="d-flex justify-content-end">
              <Link to="/list">
                <Button
                  variant="light"
                  className="ml-5"
                  type="submit"
                  style={{ background: "#105652", color: "#ffffff" }}
                >
                  View
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Form>
    );
  }
}

export default Register;
