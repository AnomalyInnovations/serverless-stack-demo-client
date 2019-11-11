import React, { useRef, useState, useEffect } from 'react';
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import { API, Storage } from 'aws-amplify';

import LoaderButton from '../../components/LoaderButton';

import { s3Upload } from '../../libs/awsLib';

import config from '../../config';

import { useNotesStyle } from './Notes.style';

export default function Notes(props) {
  const classes = useNotesStyle();
  const file = useRef(null);
  const [note, setNote] = useState(null);
  const [fileName, setFileName] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadNote() {
      return API.get('notes', `/notes/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const note = await loadNote();
        const { content, attachment } = note;

        if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment);
        }

        setContent(content);
        setNote(note);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return content.length > 0;
  }

  function formatFilename(str) {
    return str.replace(/^\w+-/, '');
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
    setFileName(file.current.name);
  }

  function saveNote(note) {
    return API.put('notes', `/notes/${props.match.params.id}`, {
      body: note
    });
  }

  async function handleSubmit(event) {
    let attachment;

    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
      }

      await saveNote({
        content,
        attachment: attachment || note.attachment
      });
      props.history.push('/');
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function deleteNote() {
    return API.del('notes', `/notes/${props.match.params.id}`);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      'Are you sure you want to delete this note?'
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteNote();
      props.history.push('/');
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }

  return (
    note && (
      <Container maxWidth="md">
        <form className={classes.notesForm} onSubmit={handleSubmit}>
          <TextField
            label="Note"
            variant="outlined"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            multiline
            fullWidth
          />
          <Typography variant="h5" gutterBottom>
            Attachment
          </Typography>
          {note.attachment && (
            <Typography
              variant="h6"
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              href={note.attachmentURL}
            >
              {formatFilename(note.attachment)}
              <br />
            </Typography>
          )}

          <input
            id="file"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <label htmlFor="file">
            <Button variant="outlined" component="span">
              Upload
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {fileName ? fileName : 'Select a file'}
          </label>

          <Grid spacing={2} container>
            <Grid xs={12} sm={6} item>
              <LoaderButton
                variant="outlined"
                onClick={handleDelete}
                isLoading={isDeleting}
                fullWidth
              >
                Delete
              </LoaderButton>
            </Grid>

            <Grid xs={12} sm={6} item>
              <LoaderButton
                color="primary"
                type="submit"
                variant="contained"
                isLoading={isLoading}
                disabled={!validateForm()}
                fullWidth
              >
                Save
              </LoaderButton>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
  );
}
