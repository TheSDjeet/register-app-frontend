import React from "react";
import Register from "./Register";
import { Container } from "react-bootstrap";
import styles from "./css/FrontView.module.css";

class FrontView extends React.Component {
  render() {
    return (
      <>
        <Container className="mt-5">
          <div className={styles.containReg}>
            <Register />
          </div>
        </Container>
      </>
    );
  }
}

export default FrontView;
