import PropTypes from 'prop-types';

import s from './Button.module.css';

const Button = ({ loadMore }) => {
  return (
    <button className={s.button} type="button" onClick={loadMore}>
      Load More
    </button>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default Button;
