import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box
} from '@material-ui/core';
import { NoteAdd as NoteAddIcon } from '@material-ui/icons';
import { API } from 'aws-amplify';

import { useHomeStyle } from './Home.style';

export default function Home(props) {
  const classes = useHomeStyle();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  function loadNotes() {
    return API.get('notes', '/notes');
  }

  function renderNotesList(notes) {
    return (
      <>
        <ListItem button component={Link} to="/notes/new">
          <ListItemIcon>
            <NoteAddIcon />
          </ListItemIcon>
          <ListItemText primary="Create a new note" />
        </ListItem>
        {Boolean(notes.length) && <Divider />}
        {notes.map((note, i) => (
          <Fragment key={note.noteId}>
            <ListItem component={Link} to={`/notes/${note.noteId}`} button>
              <ListItemText
                primary={note.content.trim().split('\n')[0]}
                secondary={
                  'Created: ' + new Date(note.createdAt).toLocaleString()
                }
              />
            </ListItem>
            {Boolean(notes.length !== i + 1) && <Divider />}
          </Fragment>
        ))}
      </>
    );
  }

  function renderLander() {
    return (
      <Box className={classes.lander}>
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </Box>
    );
  }

  function renderNotes() {
    return (
      <Box>
        <h1>Your Notes</h1>
        <List>{!isLoading && renderNotesList(notes)}</List>
      </Box>
    );
  }

  return props.isAuthenticated ? renderNotes() : renderLander();
}
