import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContacts } from 'redux/contacts/operations';
import PropTypes from 'prop-types';

import { Form } from '../../styles/Form.styled';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { MainButton } from 'styles/MainButton.styled';

export default function ContactForm({ contacts }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const isIncludes = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    isIncludes
      ? alert(`${name} is already in contacts`)
      : dispatch(addContacts({ name, number }));
    reset();
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Box>
        <TextField
          fullWidth
          id="outlined-controlled"
          label="Name"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          inputProps={{
            pattern:
              "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
            title:
              "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
            required: true,
          }}
        />
      </Box>

      <Box>
        <TextField
          fullWidth
          id="outlined-controlled"
          label="Phone"
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          inputProps={{
            pattern:
              '\\+?\\d{0,3}[-\\s]?\\(?\\d{1,3}\\)?[-\\s]?\\d{1,4}[-\\s]?\\d{1,4}[-\\s]?\\d{1,9}',
            title:
              'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
            required: true,
          }}
          autoComplete="on"
        />
      </Box>

      <MainButton variant="contained" type="submit">
        Add contact
      </MainButton>
    </Form>
  );
}

ContactForm.propTypes = {
  contacts: PropTypes.array.isRequired,
};
