import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import s from './App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = { keyword: '' };

  updateStateWithKeyword = k => {
    this.setState({ keyword: k });
  };
  render() {
    return (
      <div className={s.app}>
        <Searchbar
          keyword={this.state.keyword}
          onInput={this.updateStateWithKeyword}
        />
        <ImageGallery keyword={this.state.keyword} />
        <ToastContainer></ToastContainer>
      </div>
    );
  }
}

export default App;
