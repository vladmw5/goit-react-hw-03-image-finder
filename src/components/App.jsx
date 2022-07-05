import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import s from './App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = { keyword: '', currentPage: 1 };

  updateStateWithKeyword = k => {
    this.setState({ keyword: k });
  };

  onLoadMoreClick = () => {
    this.setState(prevState => {
      return { currentPage: prevState.currentPage + 1 };
    });
  };

  onSubmit = () => {
    this.setState({ currentPage: 1 });
  };

  render() {
    return (
      <div className={s.app}>
        <Searchbar
          keyword={this.state.keyword}
          onInput={this.updateStateWithKeyword}
          onSubmit={this.onSubmit}
        />
        <ImageGallery
          keyword={this.state.keyword}
          onLoadMoreClick={this.onLoadMoreClick}
          currentPage={this.state.currentPage}
        />
        <ToastContainer></ToastContainer>
      </div>
    );
  }
}

export default App;
