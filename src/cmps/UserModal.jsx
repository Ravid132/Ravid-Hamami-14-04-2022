import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { eventBusService } from '../services/eventBusService';

export default function UserModal() {
  const [msg, setMsg] = useState('');
  const [isModalShown, setIsModalShown] = useState(false);

  // let removeEvent = eventBusService.on('show-user-msg', (msg) => {
  //   console.log('eventbus on');
  //   setMsg(msg);
  //   // setTimeout(() => {
  //   //   setMsg('');
  //   // }, 50000);
  // });

  useEffect(() => {
    let removeEvent = eventBusService.on('show-user-msg', (msg) => {
      console.log('eventbus on');
      setIsModalShown(true);
      setMsg(msg.txt);
      setTimeout(() => {
        setIsModalShown(false);
        setMsg('');
      }, 3000);
    });
    return () => {
      removeEvent();
    };
  }, []);

  // const isModalShown = () => {
  //   if (msg === '') return false;
  //   return true;
  // };

  const handleModal = (open = false) => {
    setIsModalShown(open);
  };

  if (!isModalShown) return <span style={{ display: 'none' }}></span>;
  return (
    <Modal
      show={isModalShown}
      onHide={() => handleModal(false)}
      className='modal'
    >
      <Modal.Header>Error!</Modal.Header>
      <Modal.Body>
        {/* The input can only accept English letters */}
        {msg}
      </Modal.Body>
      <Modal.Footer>
        <Button className='modal-btn' onClick={() => handleModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
