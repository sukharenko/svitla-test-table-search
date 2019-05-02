import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import * as contactsActions from './store/contacts/actions';
import * as contactsSelector from './store/contacts/reducer';

import ContactListTable from './components/contact-list-table';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(contactsActions.fetchContacts());
  }

  handleStatusUpdate = person => {
    const { dispatch } = this.props;
    dispatch(contactsActions.updateContactStatus(person));
  };

  render() {
    const { contactListLoaded, contactList } = this.props;
    return (
      <Container>
        {contactListLoaded && (
          /* I want to keep Table component away from redux logic.
          That's the reason to use "callback handler" here */
          <ContactListTable
            contactList={contactList}
            onStatusUpdate={this.handleStatusUpdate}
          />
        )}
      </Container>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  contactListLoaded: PropTypes.bool,
  contactList: PropTypes.any,
};

function mapStateToProps(state) {
  return {
    contactListLoaded: contactsSelector.isContactsLoaded(state),
    contactList: contactsSelector.getContacts(state),
  };
}

export default hot(connect(mapStateToProps)(App));
