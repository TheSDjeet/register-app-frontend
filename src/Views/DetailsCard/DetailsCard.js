import React from "react";
import axios from "axios";
import * as http from "../../utilities/http-service";
import { Row, Col, Container, Form } from "react-bootstrap";
import { MdEdit, MdDelete, MdSave } from "react-icons/md";
import styles from "../css/List.module.css";
class DetailsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isDeleted: false,
      isEditMode: false,
      name: this.props.userdata.userName,
      age: this.props.userdata.age,
      gender: this.props.userdata.gender,
      email: this.props.userdata.email,
    };
  }

  nameChangeHandler(event) {
    this.setState({
      name: event.target.value,
    });
  }

  ageChangeHandler(event) {
    this.setState({
      age: event.target.value,
    });
  }

  genderChangeHandler(event) {
    this.setState({
      gender: event.target.value,
    });
  }

  emailChangeHandler(event) {
    this.setState({
      email: this.props.userdata.email,
    });
  }

  updateData = async (id, userName, age, gender, email) => {
    console.log("updation fired", id, userName, age, gender, email);
    const updatedData = await axios.post(http.GRAPHQL_API, {
      query: `mutation{
        userUpdate(id:${id}, userName:"${userName}", age:${age}, gender:"${gender}", email:"${email}"){
          success
        }
      }`,
    });

    console.log(updatedData.data.data);
  };

  deleteData = async (id) => {
    console.log("delete fired", id);
    const deletedData = await axios.post(http.GRAPHQL_API, {
      query: `mutation{
            deleteUser(id:${id}){
              success
            }
          }`,
    });
    this.setState({
      isDeleted: true,
    });
    console.log(deletedData.data.data);
  };

  render() {
    return (
      <>
        {!this.state.isDeleted ? (
          <>
            <Row className="mb-2">
              <Col className={styles.listData} md={9}>
                <span className={styles.listName}>Name:</span>
                &nbsp;{" "}
                {this.state.isEditMode ? (
                  <Col lg={6}>
                    <Form.Control
                      type="email"
                      placeholder="Enter name"
                      value={this.state.name}
                      size="sm"
                      onChange={(event) => {
                        this.nameChangeHandler(event);
                      }}
                    />
                  </Col>
                ) : (
                  this.state.name
                )}
              </Col>
            </Row>
            <Row>
              <Col className={styles.listData}>
                <span className={styles.listName}>Age:</span>
                &nbsp;
                {this.state.isEditMode ? (
                  <Col lg={10}>
                    <Form.Control
                      type="email"
                      placeholder="Enter age"
                      size="sm"
                      value={this.state.age}
                      onChange={(event) => this.ageChangeHandler(event)}
                    />
                  </Col>
                ) : (
                  this.state.age
                )}
              </Col>
              <Col className={styles.listData}>
                <span className={styles.listName}>Gender:</span>
                &nbsp;{" "}
                {this.state.isEditMode ? (
                  <Col lg={10}>
                    <Form.Control
                      type="email"
                      value={this.state.gender}
                      placeholder="Enter gender"
                      size="sm"
                      onChange={(event) => this.genderChangeHandler(event)}
                    />
                  </Col>
                ) : (
                  this.state.gender
                )}
              </Col>
              <Col className={styles.listData}>
                <span className={styles.listName}>Email:</span>
                &nbsp;{" "}
                {this.state.isEditMode ? (
                  <Col lg={12}>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      size="sm"
                      value={this.state.email}
                      onChange={(event) => this.emailChangeHandler(event)}
                    />
                  </Col>
                ) : (
                  this.state.email
                )}
              </Col>
              <Col className="d-flex justify-content-end">
                {this.state.isEditMode ? (
                  <div
                    className={styles.buttonEdit}
                    onClick={() => {
                      this.setState({ isEditMode: false });
                      this.updateData(
                        this.props.userdata.id,
                        this.state.name,
                        this.state.age,
                        this.state.gender,
                        this.state.email
                      );
                    }}
                  >
                    <MdSave />
                  </div>
                ) : (
                  <div
                    className={styles.buttonEdit}
                    onClick={() => {
                      this.setState({ isEditMode: true });
                    }}
                  >
                    <MdEdit />
                  </div>
                )}
                <div
                  className={styles.buttonEdit}
                  onClick={() => {
                    this.deleteData(this.props.userdata.id);
                  }}
                >
                  <MdDelete />
                </div>
              </Col>
            </Row>
            <hr />
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default DetailsCard;
