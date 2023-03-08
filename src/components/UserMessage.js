import React from 'react'
import { Container,Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { closeUserMessage } from '../actions/userActions'

function UserMessage(props) {
  const modalShow = props.modalShow;
  const message = props.message
  const name = props.employeeName
  const dispatch = useDispatch()
  return (
    <Container>
         <Modal
        size="lg"
        show={modalShow}
        onHide={() => dispatch(closeUserMessage())}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
           {name ? `Hi ${name}` : 'Thanks'}
          </Modal.Title>
        </Modal.Header>
        {name ? <Modal.Body><i class="fas fa-quote-left fa-md me-2"></i>&nbsp;<i>{message&&message.data&&message.data.quote_text}</i>&nbsp;<i class="fas fa-quote-right fa-md me-2"></i>
        <br/> <br/><figcaption class="blockquote-footer" style={{textAlign:"right",color:"black"}}>{message&&message.data&&message.data.author}</figcaption></Modal.Body> :  <Modal.Body><i>{message}</i></Modal.Body> }
      </Modal>
    </Container>
  )
}

export default UserMessage