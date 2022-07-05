import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import s from './Modal.module.css';

const Modal = ({ onBackdropClick, children }) => {
  return createPortal(
    <div
      className={s.overlay}
      onClick={event => closeModalByBackdrop(event, onBackdropClick)}
    >
      <div className={s.modal}>{children}</div>
    </div>,
    document.querySelector('#modal-root')
  );
};

function closeModalByBackdrop(event, method) {
  if (event.target === event.currentTarget) method();
}

Modal.propTypes = {
  children: PropTypes.node,
  onBackdropClick: PropTypes.func.isRequired,
};

export default Modal;
