import _ from 'lodash';
import Immutable from 'seamless-immutable';
import * as types from './actionTypes';

const initialState = Immutable({
  contactListLoaded: false,
  contactList: [],
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.CONTACTS_FETCHED:
      return {
        ...state,
        contactList: action.payload,
        contactListLoaded: true,
      };
    case types.CONTACT_STATUS_UPDATED:
      /* eslint no-case-declarations: 0 */
      const contactList = state.contactList.slice();
      const contactIndex = _.findIndex(contactList, {
        id: action.payload.id,
      });
      contactList[contactIndex] = action.payload;
      return {
        ...state,
        contactList,
      };
    default:
      return state;
  }
}

export function isContactsLoaded(state) {
  return state.contacts.contactListLoaded;
}

export function getContacts(state) {
  return state && state.contacts.contactListLoaded
    ? state.contacts.contactList
    : [];
}
