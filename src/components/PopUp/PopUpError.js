import React from 'react';
import { Modal } from 'react-bootstrap';

export const PopUpError = (props) => {
    const { errorMessage } = props;
    return (
      <>  
          <Modal.Header className='pop-up-material-header' closeButton>
            <Modal.Title id="modal-course"></Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-course'>
              {errorMessage}
          </Modal.Body>
      </>
    );
  }