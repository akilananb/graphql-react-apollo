import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { getBookQuery, removeBookMutation, getBooksQuery } from '../queries/queries';

const updateCache = (cache, { data: { removeBook } }) => {
  const { books } = cache.readQuery({ query: getBooksQuery });
  cache.writeQuery({
    query: getBooksQuery,
    data: {
      books: books.filter(books => books.id !== removeBook.id),
    },
  });
};

const displayBookDetails = (book, removeBook) => {
  if (book) {
    return (
      <div>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books by this author:</p>
        <ul className="other-books">
          {book.author.books.map((item) => {
            return <li key={item.id}>{item.name}</li>;
          })}
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
  }
  return (
    <div>
      <h2>No book selected.</h2>
    </div>
  );
};

const BookDetails = (selectedBook) => {
  if (selectedBook) {
    return (
      <div id="book-details">
        <Query query={getBookQuery} variables={{ id: selectedBook.bookId }}>
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <div className="lds-container">
                  <div className="lds-ripple">
                    <div />
                    <div />
                  </div>
                </div>
              );
            }
            if (error) {
              return (
                <div className="lds-container">`Error! ${error.message}`</div>
              );
            }
            return (
              <Mutation mutation={removeBookMutation} key={selectedBook.bookId} update={updateCache}>
                {(removeBook, { called }) => {
                  if (called) {
                    return <div><h2>Selected book has been deleted from the list.</h2></div>;
                  }
                  return displayBookDetails(data.book, removeBook);
                }}
              </Mutation>
            );
          }}
        </Query>
      </div>
    );
  }
};

export default BookDetails;
