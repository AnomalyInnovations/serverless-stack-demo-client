import React, { useRef, useState } from 'react';
import { Button, Container, TextField } from '@material-ui/core';
import { API } from 'aws-amplify';

import LoaderButton from '../../components/LoaderButton';

import { s3Upload } from '../../libs/awsLib';

import config from '../../config';

import { useNewNoteStyle } from './NewNote.style';

export default function NewNote(props) {
  const file = useRef(null);
  const classes = useNewNoteStyle();

  const [fileName, setFileName] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
    setFileName(file.current.name);
  }

  async function handleSubmit(event) {
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
      const attachment = file.current ? await s3Upload(file.current) : null;

      await createNote({ content, attachment });
      props.history.push('/');
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function createNote(note) {
    return API.post('notes', '/notes', {
      body: note
    });
  }

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit} className={classes.newNoteForm}>
        <TextField
          label="Note"
          variant="outlined"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          multiline
          fullWidth
        />
        <h5>Attachment</h5>
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
        <LoaderButton
          type="submit"
          variant="contained"
          color="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
          fullWidth
        >
          Create
        </LoaderButton>
      </form>
    </Container>
  );
}
