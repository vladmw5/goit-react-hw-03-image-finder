import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';

import s from './ImageGallery.module.css';
import { fetchImages } from 'service/fetchImages';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button/Button';

class ImageGallery extends Component {
  state = { images: [], isLoading: false, currentPage: 1 };

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

  nextPage = () => {
    this.setState(prevState => {
      return { currentPage: prevState.currentPage + 1 };
    });
  };

  firstPage = () => {
    this.setState(() => {
      return {
        currentPage: 1,
      };
    });
  };

  onLoadMoreClick = () => {
    this.enableLoader();
    this.nextPage();
    console.log(this.state.currentPage);
    fetchImages(this.props.keyword, this.state.currentPage)
      .then(this.addMoreData)
      .catch(console.error)
      .finally(this.disableLoader);
  };

  componentDidUpdate(prevProps, prevState) {
    //Ця умова є вірна якщо 1) юзер двічи засабмітив теж самий інпут 2) якщо юзер натиснув loadMore
    if (prevProps.keyword === this.props.keyword) {
      return;
    }
    this.enableLoader();
    this.firstPage();
    console.log(this.state.currentPage);
    fetchImages(this.props.keyword, this.state.currentPage)
      .then(this.updateStateWithData)
      .catch(console.error)
      .finally(this.disableLoader);
  }

  render() {
    return this.state.isLoading ? (
      <ThreeDots height="100" width="100" color="grey" ariaLabel="loading" />
    ) : this.state.images.length > 0 ? (
      <Fragment>
        <ul className={s.gallery}>
          {this.state.images?.length > 0 &&
            this.state.images.map(image => (
              <ImageGalleryItem
                key={image.id}
                src={image.webformatURL}
                alt={`${this.props.keyword}`}
              />
            ))}
        </ul>
        <Button loadMore={this.onLoadMoreClick} />
      </Fragment>
    ) : (
      <h1>No images found by your Query</h1>
    );
  }
}

export default ImageGallery;
