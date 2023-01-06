
import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { listNews } from '../actions/dailyReadActions'
import { Card, Button,Container,Row,Col } from 'react-bootstrap'

import Loader from './Loader'
import Message from './Message'

function News() {

  const dispatch = useDispatch()
  const newsList = useSelector((state) => state.newsList)
  const {loading,error,newslist} = newsList

  useEffect(() => {
    dispatch(listNews())
  },[dispatch])

  return (
    <Container className='mt-4'>
      <Row>
        <Col lg={12} md={12}>
    <Card>
      <Container>
        <Row>
      <Card.Header as="h5">Tech Reads</Card.Header>
      </Row>
      <Card.Body>
        <Container className='mt-2'>

        { loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> :
        Array.isArray(newslist) ?
        newslist.map((newsItem) => (
          <Row className='mt-4 p-2' key={newsItem.id}>
          <Col>
        <Card.Title>{newsItem.title}</Card.Title>
      <Card.Text>
      {newsItem.short_description}
      </Card.Text>
      <Button variant="primary" href={newsItem.target_link}>Read More</Button>
      </Col>
        </Row>
        )) : <Message variant="danger">Something's Broke</Message>
        }
          </Container>
      </Card.Body>
      </Container>
    </Card>
    </Col>
    </Row>
    </Container>
  )
}

export default News