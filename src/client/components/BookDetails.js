import React from 'react';
import { Query } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

const displayBookDetails = (book) => {
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
        <button class="delete-book">
          Delete
        </button>
      </div>
    );
  } else {
    return <div><h2>No book selected.</h2></div>;
  }
};

const BookDetails = (selectedBook) => {
  console.log(selectedBook.bookId);
    if (selectedBook) {
      return (
      <div id="book-details">
        <Query query={getBookQuery} variables={{ id: selectedBook.bookId }} >
          {({ loading, error, data }) => {
            if (loading) return <div class='lds-container'><div class="lds-ripple"><div></div><div></div></div></div>;
            if (error) return <div class='lds-container'>`Error! ${error.message}`</div>;
            return displayBookDetails(data.book);
          }}
        </Query>
      </div>
      )
    }
};

export default BookDetails;
