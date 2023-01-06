import React from "react";
import { Container, Row,Col } from "react-bootstrap";
import { MDBFooter } from "mdb-react-ui-kit";

function Footer() {
  return (
    <footer>
      <Container className="mt-4">
        <Row>
          <Col lg={12} md={12}>
        <MDBFooter bgColor="light" className="text-center text-lg-left">
          <div
            className="text-center p-3"
          >
            &copy; {new Date().getFullYear()} Copyright:{" "}
            <a className="text-dark" href="https://mdbootstrap.com/">
              orion.labglo.com
            </a>
          </div>
        </MDBFooter>
        </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
