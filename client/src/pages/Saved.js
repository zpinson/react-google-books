import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Book from "../components/Book";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

class Saved extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    this.getSavedBooks();
  }

  getSavedBooks = () => {
    API.getSavedBooks()
      .then((res) =>{
        this.setState({
          books: res.data,
        })
        console.log(this.state.books);
      })
      .catch((err) => console.log(err));
  };

  handleBookDelete = (id) => {
    API.deleteBook(id).then((res) => this.getSavedBooks());
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>(React) Google Books Search</strong>
              </h1>
              <h2 className="text-center">
                Search for and Save Books of Interest.
              </h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Saved Books" icon="download">
              {/* 
                Render the books in the array in this.state using the Book component.
                Each book should have a delete button associate with it.
                If the array is empty, then disply "No Saved Books" on the web page. */}
              {/* YOUR CODE IS HERE */}

              <List>
                {this.state.books.map((book) => (
                  <Book
                    key={book.googleId}
                    title={book.title}
                    subtitle={book.subtitle}
                    link={book.link}
                    authors={book.authors[0]}
                    image={book.image}
                    description={book.description}
                    // handleBookSave={() => this.handleBookSave(book.id)}
                    Button={() => (
                      <button
                        onClick={() => this.handleBookDelete(book._id)}
                        className="btn btn-light"
                      >
                        Delete
                      </button>
                    )}
                  />
                ))}
              </List>
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Saved;
