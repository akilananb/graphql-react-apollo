import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { getBookQuery, removeBookMutation } from '../queries/queries';
import { removeBookCache } from '../queries/updateCache';
import Loader from './Loader';


const displayBookDetails = (book, removeBook, called) => {
  if (called) {
    return <h2>Selected book has been deleted from the list.</h2>;
  }
  return (
    <div>
      <h2>{book.name}</h2>
      <p>{book.genre}</p>
      <p>{book.author.name}</p>
      <p>All books by this author:</p>
      <ul className="other-books">
        {book.author.books.map(item => <li key={item.id}>{item.name}</li>)}
      </ul>
      <button
        className="delete-book"
        type="submit"
        onClick={() => {
          removeBook({
            variables: {
              id: book.id,
            },
          });
        }}
      >
        Delete
      </button>
    </div>
  );
};

const BookDetails = selectedBook => (
  <div id="book-details">
    <Query query={getBookQuery} variables={{ id: selectedBook.bookId }}>
      {({ loading, data: { book } }) => (
        <Mutation mutation={removeBookMutation} key={selectedBook.bookId} update={removeBookCache}>
          {(removeBook, { loading: mLoading, called }) => (
            loading || mLoading ? <Loader />
              : displayBookDetails(book, removeBook, called)
          )}
        </Mutation>
      )}
    </Query>
  </div>
);

export default BookDetails;
