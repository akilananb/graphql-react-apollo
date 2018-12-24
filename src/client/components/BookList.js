import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

import BookDetails from './BookDetails';

const BookList = () => {
  const [selectedBook, setBook] = useState(undefined);

  return (
    <div>
      <Query query={getBooksQuery}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
            <ul id="book-list">
              {data.books.map(book => (
                <li key={book.id} onClick={(e) => setBook(book.id)}>
                  {book.name}
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
      <BookDetails bookId={selectedBook} />
    </div>
  );
};

export default BookList;
