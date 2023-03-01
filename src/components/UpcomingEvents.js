import React  from "react";

import { Card, Container, Row, Col } from "react-bootstrap";

import UpcomingBirthdays from "./UpcomingBirthdays";
import UpcomingHolidays from "./UpcomingHolidays";
import UpcomingWorkAnniversary from "./UpcomingWorkAnniversary";

function UpcomingEvents() {

  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col lg={12} md={12}>
            <Card>
              <Container>
                <Row>
                  <Card.Header as="h5">Upcoming Events</Card.Header>
                </Row>
                <Card.Body>
                  <Container
                    className="mt-2"
                    style={{ display: "flex", float: "left" }}
                  >
                    <>
                      <UpcomingBirthdays />
                      <UpcomingWorkAnniversary />
                      <UpcomingHolidays />
                    </>
                  </Container>
                </Card.Body>
              </Container>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UpcomingEvents;
