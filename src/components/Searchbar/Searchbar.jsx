import s from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { Component } from 'react';

class Searchbar extends Component {
  state = {};

  static propTypes = {
    onInput: PropTypes.func.isRequired,
    keyword: PropTypes.string.isRequired,
  };

  handleSubmit = event => {
    event.preventDefault();
    const keyword = event.target.keyword.value.trim();
    if (keyword === '') {
      toast.error(
        "It seems you've made an empty query. That's a forbidden user behavior, thus, please, make a normal query, so I can find some images for you."
      );
      return;
    }
    if (this.props.keyword === keyword) {
      toast.error(
        "It seems you've made the same query. That's a forbidden user behavior, thus, please, make a normal query, so I can find some images for you."
      );
    }
    this.props.onInput(keyword);
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.searchform} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <ImSearch />
            <span className={s.label}>Search</span>
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="keyword"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
