import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

const SavedBooks = () => {
  const GET_USER = gql`
    query Query {
      me {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          authors
          description
          title
          link
          image
        }
      }
    }
  `;

  const REMOVE_BOOK = gql`
    mutation RemoveBookMutation($removeBookBookId: ID!) {
      removeBook(bookId: $removeBookBookId) {
        bookCount
      }
    }
  `;

  const [userData, setUserData] = useState("hello");

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  const [removeBook] = useMutation(REMOVE_BOOK, {
    context: {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    },
    onError: (error) => {
      return <h1>There's an error.</h1>;
    },
  });

  const { loading, error, data } = useQuery(GET_USER, {
    context: {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    },
  });

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (error) {
    throw new Error("something went wrong!");
  }

  if (data) {
    const newData = data.me;
    console.log("this is the data", newData);

    // create function that accepts the book's mongo _id value as param and deletes the book from the database
    const handleDeleteBook = async (bookId) => {
      try {
        await removeBook({
          variables: {
            removeBookBookId: bookId,
          },
        });

        // upon success, remove book's id from localStorage
        removeBookId(bookId);
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <>
        <Jumbotron fluid className="text-light bg-dark">
          <Container>
            <h1>Viewing saved books!</h1>
          </Container>
        </Jumbotron>
        <Container>
          <h2>
            {console.log("this is the user data", userData)}
            {newData.savedBooks.length
              ? `Viewing ${newData.savedBooks.length} saved ${
                  newData.savedBooks.length === 1 ? "book" : "books"
                }:`
              : "You have no saved books!"}
          </h2>
          <CardColumns>
            {newData.savedBooks.map((book) => {
              return (
                <Card key={book.bookId} border="dark">
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}
          </CardColumns>
        </Container>
      </>
    );
  }
};

export default SavedBooks;
