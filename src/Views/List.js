import React from "react";
import axios from "axios";
import * as http from "../utilities/http-service";
import { Row, Col, Container, Form } from "react-bootstrap";
import styles from "./css/List.module.css";
import { MdEdit, MdDelete, MdSave } from "react-icons/md";
import DeleteModal from "./DeleteModal";
import DetailsCard from "./DetailsCard/DetailsCard";

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isEditMode: false,
      deleteId: null,
      openModal: false,
    };
  }
  fetchData = async () => {
    console.log("Fetch Data........");
    const queryResult = await axios.post(http.GRAPHQL_API, {
      query: `
          query{
            userdemo{
             id,userName,age,gender,email
           }
           }`,
    });
    const result = queryResult.data.data;
    //console.log(result);
    this.setState({
      data: result,
    });
  };
  refreshData() {
    this.fetchData();
  }

  deleteData = async () => {
    const deletedData = await axios.post(http.GRAPHQL_API, {
      query: `mutation{
        deleteUser(id:${this.state.deleteId}){
          message
        }
      }`,
    });
    console.log(deletedData);
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    console.log(this.state.data.userdemo);
    return (
      <Container className="my-5 d-flex justify-content-center">
        {/* <DeleteModal /> */}
        <Col className={styles.listContainer}>
          <Row>
            <Col className="mt-3">
              <center className={styles.listHead}>
                <u>Employee List</u>
              </center>
            </Col>
          </Row>
          <Row>
            {/* data entry here */}

            <Col className="px-5 my-4">
              <Row>
                <Col className="">
                  {this.state.data.userdemo?.length ? (
                    this.state.data.userdemo.map((userdata, index) => (
                      <div key={index}>
                        <DetailsCard
                          refresh={() => {
                            this.refreshData();
                          }}
                          userdata={userdata}
                        ></DetailsCard>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Container>
    );
  }
}

export default List;
