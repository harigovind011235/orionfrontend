import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { listBlogs } from "../actions/dailyReadActions";
import Loader from "./Loader";
import Message from "./Message";

function Blog() {
  const dispatch = useDispatch();
  const blogList = useSelector((state) => state.blogList);
  const { error, loading, bloglist } = blogList;
  useEffect(() => {
    dispatch(listBlogs());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col lg={12} md={12}>
          <Card>
            <Container>
              <Row>
                <Card.Header as="h5">Tech Reads</Card.Header>
              </Row>
              <Card.Body>
                <Container className="mt-2">
                  {loading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant="danger">Backend Server Down Contact The Admin</Message>
                  ) : Array.isArray(bloglist)  ?
                    bloglist.map((blogitem) => (
                      <Row className="mt-4 p-2" key={blogitem.id}>
                        <Col>
                          <Card.Title>{blogitem.title}</Card.Title>
                          <Card.Text>{blogitem.short_description}</Card.Text>
                          <Button variant="primary" href={blogitem.link}>
                            Read More
                          </Button>
                        </Col>
                      </Row>
                    )) : <Message variant="danger">Backend Server Down Contact The Admin</Message>
                  }
                </Container>
              </Card.Body>
            </Container>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Blog;
