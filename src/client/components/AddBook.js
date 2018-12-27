import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';
import {
  getAuthorsQuery,
  addBookMutation,
} from '../queries/queries';
import { addBookCache } from '../queries/updateCache';

const displayAuthors = (loading, data) => (
  loading ? <option disabled>Loading authors...</option>
    : data.authors.map(author => (
      <option value={author.id} key={author.id}>
        {author.name}
      </option>
    ))
);

const AddBook = () => {
  const [book, setBook] = useState({
    name: '',
    genre: '',
    authorId: '',
  });

  const updateState = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Query query={getAuthorsQuery}>
      {({ loading, data }) => (
        <Mutation mutation={addBookMutation} update={addBookCache}>
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
              <form id="add-book" onSubmit={e => submitForm(e)}>
                <div className="field">
                  <label htmlFor="name">
                    Book name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={e => updateState(e)}
                  />
                </div>

                <div className="field">
                  <label htmlFor="genre">
                    Genre:
                  </label>
                  <input
                    type="text"
                    name="genre"
                    onChange={e => updateState(e)}
                  />
                </div>

                <div className="field">
                  <label htmlFor="authorId">
                    Author:
                  </label>
                  <select name="authorId" onChange={e => updateState(e)}>
                    <option>Select author</option>
                    {displayAuthors(loading, data)}
                  </select>
                </div>
                <button type="button">+</button>
              </form>
            );
          }}
        </Mutation>
      )}
    </Query>
  );
};

export default AddBook;
