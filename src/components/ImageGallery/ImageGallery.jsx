import { Component } from 'react';
import PropTypes from 'prop-types';

import s from './ImageGallery.module.css';
import { fetchImages } from 'service/fetchImages';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';

class ImageGallery extends Component {
  state = {
    images: [],
    isLoading: false,
    modalShown: false,
    currentImage: null,
  };

  static propTypes = {
    keyword: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
  };

  enableLoader = () => {
    this.setState({ isLoading: true });
  };

  disableLoader = () => {
    this.setState({ isLoading: false });
  };

  updateStateWithData = data => {
    if (this.props.currentPage === 1) {
      this.setState({
        images: [...data],
      });
    } else {
      this.setState(prevState => {
        return { images: [...prevState.images, ...data] };
      });
    }
  };

  toggleModal = () => {
    this.setState(prevState => {
      return {
        modalShown: !prevState.modalShown,
      };
    });
  };

  setCurrentImage = img => {
    this.setState({ currentImage: img });
  };

  handleImageClick = event => {
    this.setCurrentImage(event.target.dataset.bigsrc);
    this.toggleModal();
  };

  onEscPressed = event => {
    if (event.code !== 'Escape') return;
    this.toggleModal();
    this.setCurrentImage(null);
  };

  onBackdropClicked = event => {
    if (event.target === event.currentTarget) {
      this.toggleModal();
      this.setCurrentImage(null);
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onEscPressed);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.keyword === this.props.keyword &&
      prevProps.currentPage === this.props.currentPage
    ) {
      return;
    }
    this.enableLoader();
    fetchImages(this.props.keyword, this.props.currentPage)
      .then(this.updateStateWithData)
      .catch(console.error)
      .finally(this.disableLoader);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscPressed);
  }

  render() {
    return this.props.keyword !== '' ? (
      <div className={s.center}>
        <ul className={s.gallery}>
          {this.state.images?.length > 0 &&
            this.state.images.map(image => (
              <ImageGalleryItem
                key={image.id}
                src={image.webformatURL}
                big={image.largeImageURL}
                alt={`${this.props.keyword}`}
                onImageClick={this.handleImageClick}
              />
            ))}
        </ul>
        {this.state.images.length === 0 && !this.state.isLoading && (
          <h1>Nothing Found</h1>
        )}
        {this.state.isLoading && <Loader />}
        {this.state.images.length > 0 && (
          <Button loadMore={this.props.onLoadMoreClick} />
        )}
        {this.state.modalShown && (
          <Modal onBackdropClick={this.onBackdropClicked}>
            <img src={this.state.currentImage} alt={this.props.keyword} />
          </Modal>
        )}
      </div>
    ) : (
      <h1 className={s.center}>Please, make your query</h1>
    );
  }
}

export default ImageGallery;
