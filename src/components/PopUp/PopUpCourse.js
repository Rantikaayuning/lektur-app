import React from 'react';
import { Modal } from 'react-bootstrap';

export const PopUpCourse = (props) => {
  const { title, lessonContent } = props;
    return (
      <>  
          <Modal.Header className='pop-up-course-header' closeButton>
            <Modal.Title id="modal-course">
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {lessonContent}
          </Modal.Body>
      </>
    );
  }