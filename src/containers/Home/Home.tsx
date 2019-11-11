import React, { useState, useEffect, Fragment, FC } from 'react';
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

import { INotes } from '../Note/Notes';

import { IAppProps } from '../../Routes';

import { useHomeStyle } from './Home.style';

const Home: FC<IAppProps> = props => {
  const classes = useHomeStyle();
  const [notes, setNotes] = useState<INotes[]>([]);
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

  const loadNotes = () => API.get('notes', '/notes', null);

  const renderNotesList = (notes: INotes[]) => {
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
  };

  const renderLander = () => {
    return (
      <Box className={classes.lander}>
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </Box>
    );
  };

  const renderNotes = () => {
    return (
      <Box>
        <h1>Your Notes</h1>
        <List>{!isLoading && renderNotesList(notes)}</List>
      </Box>
    );
  };

  return props.isAuthenticated ? renderNotes() : renderLander();
};

export default Home;
