import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBook,
  fetchBook,
  selectIsLoadingViaApi,
} from '../../redux/slices/booksSlice';
import booksData from '../../data/books.json';
import { FaSpinner } from 'react-icons/fa';
import './BookForm.css';
import createBookWithId from '../../utils/createBookWithId';
import { setErrorMessage } from '../../redux/slices/errorSlice';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const isLoadingViaApi = useSelector(selectIsLoadingViaApi);
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];

    dispatch(addBook(createBookWithId(randomBook, 'random')));
    setTitle('');
    setAuthor('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      const book = createBookWithId(
        {
          title,
          author,
        },
        'manual'
      );

      console.log(addBook(book));
      dispatch(addBook(book));
      setTitle('');
      setAuthor('');
    } else {
      dispatch(setErrorMessage('Title and author are required'));
    }
  };

  const handleAddRandomBookViaApi = () => {
    dispatch(fetchBook('http://localhost:4000/random-book-delayed'));
  };

  return (
    <div className="app-block book-form">
      <h2>Add a new book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={() => handleAddRandomBook()}>
          Add random
        </button>

        <button
          type="button"
          onClick={() => handleAddRandomBookViaApi()}
          disabled={isLoadingViaApi}
        >
          {isLoadingViaApi ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            'Add random via API'
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
