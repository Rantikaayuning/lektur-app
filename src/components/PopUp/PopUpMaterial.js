import React from 'react';
import { Modal } from 'react-bootstrap';

export const PopUpMaterial = (props) => {
    const { materialContent, title } = props;
    return (
      <> 
          <Modal.Header className='pop-up-material-header' closeButton>
            <Modal.Title id="modal-course">
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal-course'>
              {materialContent}
          </Modal.Body>
      </>
    );
  }