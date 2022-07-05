import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt, big, onImageClick }) => {
  return (
    <li className={s.item}>
      <img
        className={s.image}
        src={src}
        alt={alt}
        data-bigsrc={big}
        onClick={onImageClick}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  big: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
