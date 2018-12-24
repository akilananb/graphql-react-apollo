import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { getBookQuery, removeBookMutation } from '../queries/queries';
import { removeBookCache } from '../queries/updateCache';
import Loader from './Loader';


const displayBookDetails = (queryData, removeBook, mutationData) => {
  const { data: { book }, loading } = queryData;
  const { called, loading: mLoading } = mutationData;
  if (loading || mLoading) {
    return <Loader />;
  }
  if (!book) {
    return <h2>No book selected.</h2>;
  }
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
      {queryData => (
        <Mutation mutation={removeBookMutation} key={selectedBook.bookId} update={removeBookCache}>
          {(removeBook, mutationData) => (
            displayBookDetails(queryData, removeBook, mutationData)
          )}
        </Mutation>
      )}
    </Query>
  </div>
);

export default BookDetails;
