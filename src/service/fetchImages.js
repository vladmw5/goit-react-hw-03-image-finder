import axios from 'axios';

const MY_KEY = '28031110-e15497f5225bacebbd356f3c2';

const queryString = (keyword, page, perPage) =>
  `https://pixabay.com/api/?q=${keyword}&page=${page}&key=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

export async function fetchImages(keyword, page = 1, perPage = 12) {
  try {
    const response = await axios.get(queryString(keyword, page, perPage));
    return response.data.hits;
  } catch (error) {
    return error;
  }
}
