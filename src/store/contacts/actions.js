// import _ from 'lodash';
import * as types from './actionTypes';
import contactsService from '../../services/contacts';

export function fetchContacts() {
  return async dispatch => {
    try {
      const contactList = await contactsService.getContacts();
      dispatch({
        type: types.CONTACTS_FETCHED,
        payload: contactList,
      });
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  };
}

export function updateContactStatus(person) {
  return async dispatch => {
    try {
      const personUpdated = await contactsService.updateContactStatus(person);
      dispatch({
        type: types.CONTACT_STATUS_UPDATED,
        payload: personUpdated,
      });
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  };
}
