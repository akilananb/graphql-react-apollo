import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

import BookDetails from './BookDetails';

const BookList = () => {
  const [selectedBook, setBook] = useState(undefined);

  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      setBook(id);
    }
  };

  return (
    <div>
      <Query query={getBooksQuery}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
            <ul id="book-list" role="menu">
              {data.books.map(book => (
                <li tabIndex={0} onKeyPress={e => handleKeyPress(e, book.id)} key={book.id} onClick={() => setBook(book.id)} role="menuitem">
                  {book.name}
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
      { selectedBook && <BookDetails bookId={selectedBook} /> }
    </div>
  );
};

export default BookList;
