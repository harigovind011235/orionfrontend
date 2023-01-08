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
        <Modal.Body>{message}</Modal.Body>
      </Modal>
    </Container>
  )
}

export default UserMessage