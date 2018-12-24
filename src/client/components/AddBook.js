import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from '../queries/queries';

const displayAuthors = (loading, data) => {
  if (loading) {
    return <option disabled>Loading authors...</option>;
  }
  return data.authors.map((author) => {
    return (
      <option value={author.id} key={author.id}>
        {author.name}
      </option>
    );
  });
};

const AddBook = () => {
  const [book, setBook] = useState({
    name: '',
    genre: '',
    authorId: ''
  });

  const updateState = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const updateCache = (cache, { data: { addBook } }) => {
    const { books } = cache.readQuery({ query: getBooksQuery });
    cache.writeQuery({
      query: getBooksQuery,
      data: {
        books: books.concat(addBook),
      },
    });
  };

  return (
    <Query query={getAuthorsQuery}>
      {({ loading, error, data }) => {
        return (
          <Mutation mutation={addBookMutation} update={updateCache}>
            {(addBook) => {
              const submitForm = (e) => {
                e.preventDefault();
                addBook({
                  variables: {
                    ...book,
                  },  
                });
              };

              return (
                <form id="add-book" onSubmit={(e) => submitForm(e)}>
                  <div className="field">
                    <label>Book name:</label>
                    <input
                      type="text"
                      name="name"
                      onChange={(e) => updateState(e)}
                    />
                  </div>

                  <div className="field">
                    <label>Genre:</label>
                    <input
                      type="text"
                      name="genre"
                      onChange={(e) => updateState(e)}
                    />
                  </div>

                  <div className="field">
                    <label>Author:</label>
                    <select name="authorId" onChange={(e) => updateState(e)}>
                      <option>Select author</option>
                      {displayAuthors(loading, data)}
                    </select>
                  </div>
                  <button>+</button>
                </form>
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default AddBook;
