import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import s from './Modal.module.css';

const Modal = ({ onBackdropClick, children }) => {
  return createPortal(
    <div className={s.overlay} onClick={onBackdropClick}>
      <div className={s.modal}>{children}</div>
    </div>,
    document.querySelector('#modal-root')
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  onBackdropClick: PropTypes.func.isRequired,
};

export default Modal;
