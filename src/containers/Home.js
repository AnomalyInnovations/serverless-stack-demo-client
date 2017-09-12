import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { invokeApig } from "../libs/awsLib";
import "./Home.css";
import config from "../config.js";
import GraphiQL from "graphiql";
import fetch from "isomorphic-fetch";
import "graphiql/graphiql.css";

const title = process.env.REACT_APP_TCM_TITLE || "Scratch - A simple note taking app";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: []
    };
  }

  async componentDidMount() {
    document.title = title;
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const results = await this.notes();
      this.setState({ notes: results });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  notes() {
    return invokeApig({ path: "/notes" });
  }

  handleNoteClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  renderNotesList(notes) {
    return [{}].concat(notes).map(
      (note, i) =>
        i !== 0
          ? <ListGroupItem
              key={note.noteId}
              href={`/notes/${note.noteId}`}
              onClick={this.handleNoteClick}
              header={note.content.trim().split("\n")[0]}
            >
              {"Created: " + new Date(note.createdAt).toLocaleString()}
            </ListGroupItem>
          : <ListGroupItem
              key="new"
              href="/notes/new"
              onClick={this.handleNoteClick}
            >
              <h4>
                <b>{"\uFF0B"}</b> Create a new note
              </h4>
            </ListGroupItem>
    );
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>{title}</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  renderNotes() {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.notes)}
        </ListGroup>
      </div>
    );
  }

  graphQLFetcher(graphQLParams) {
    return fetch(config.graphqlURL, {
      method: "post",
      headers: { "Content-Type": "application/json", "X-Api-Key": process.env.REACT_APP_TCM_API_KEY || 'aKey' },
      body: JSON.stringify(graphQLParams),
    }).then(function (response) {
      return response.json();
    });
  }

  renderGraphiQL() {
    var q = `# mutation for int. test '#001 - A mobile user opens the app'
mutation test {
  createAnonymousAccount(client:"tcm:mobileapp:roam") {
    accountRn
  }
}`;
    var r = `// example mutation result
{
  "data": {
    "createAnonymousAccount": {
      "accountRn": "tcmrn:account:2b027653-8295-4839-b9d7-5152cfa729ca"
    }
  }
}`;

    return <GraphiQL
      fetcher={this.graphQLFetcher}
      response={r}
      defaultQuery={q}
      />;
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderGraphiQL() : this.renderLander()}
      </div>
    );
  }
}
