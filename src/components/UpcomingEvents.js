import React, { useState } from "react";

import { Card, Container, Row, Col } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";

import UpcomingBirthdays from "./UpcomingBirthdays";
import UpcomingHolidays from "./UpcomingHolidays";
import UpcomingWorkAnniversary from "./UpcomingWorkAnniversary";

function UpcomingEvents() {
  const [birthday, setBirthday] = useState({ loading: "", error: "" });
  const [workAnniversary, setWorkAnniversary] = useState({
    loading: "",
    error: "",
  });
  const [holiday, setHoliday] = useState({ loading: "", error: "" });
  return (
    <>
      <Container className="mt-1">
        <Row>
          <Col lg={12} md={12}>
            <Card>
              <Container>
                <Row>
                  <Card.Header as="h5">Upcoming Events</Card.Header>
                </Row>
                <Card.Body>
                  {holiday.loading === true &&
                  birthday.loading === true &&
                  workAnniversary.loading === true ? (
                    <Loader />
                  ) : (
                    <>
                      {(holiday.error !== undefined ||
                        birthday.error !== undefined ||
                        workAnniversary.error !== undefined) && (
                        <Message variant="danger">
                          Something Wrong Admin To The Rescue
                        </Message>
                      )}
                    </>
                  )}
                  <Container
                    style={{ display: "flex", float: "left" }}
                  >
                    <>
                      <UpcomingBirthdays
                        holiday={holiday}
                        birthday={birthday}
                        setBirthday={setBirthday}
                        workAnniversary={workAnniversary}
                      />
                      <UpcomingWorkAnniversary
                        workAnniversary={workAnniversary}
                        setWorkAnniversary={setWorkAnniversary}
                        birthday={birthday}
                        holiday={holiday}
                      />
                      <UpcomingHolidays
                        birthday={birthday}
                        holiday={holiday}
                        setHoliday={setHoliday}
                        workAnniversary={workAnniversary}
                      />
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
