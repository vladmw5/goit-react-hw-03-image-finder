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

  currentPage = 1;

  static propTypes = {
    keyword: PropTypes.string.isRequired,
  };

  enableLoader = () => {
    this.setState({ isLoading: true });
  };

  disableLoader = () => {
    this.setState({ isLoading: false });
  };

  updateStateWithData = data => {
    this.setState({
      images: [...data],
    });
  };

  addMoreData = data => {
    this.setState(prevState => {
      return { images: [...prevState.images, ...data] };
    });
  };

  onLoadMoreClick = () => {
    this.enableLoader();
    console.log(this.state.currentPage);
    fetchImages(this.props.keyword, ++this.currentPage)
      .then(this.addMoreData)
      .catch(console.error)
      .finally(this.disableLoader);
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
    this.setCurrentImage(event.target.src);
    this.toggleModal();
  };

  onEscPressed = event => {
    if (event.code !== 'Escape') return;
    this.toggleModal();
    this.setCurrentImage(null);
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onEscPressed);
  }

  componentDidUpdate(prevProps, prevState) {
    //Ця умова є вірна якщо 1) юзер двічи засабмітив теж самий інпут 2) якщо юзер натиснув loadMore
    if (prevProps.keyword === this.props.keyword) {
      return;
    }
    this.enableLoader();
    this.currentPage = 1;
    console.log(this.state.currentPage);
    fetchImages(this.props.keyword, this.state.currentPage)
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
          <Button loadMore={this.onLoadMoreClick} />
        )}
        {this.state.modalShown && (
          <Modal onBackdropClick={this.toggleModal}>
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
