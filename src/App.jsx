import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';

import * as contactsActions from './store/contacts/actions';
import * as contactsSelector from './store/contacts/reducer';

import ContactListTable from './components/contact-list-table';

import './App.css';

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

  changeLanguage = lng => {
    const { i18n } = this.props;
    i18n.changeLanguage(lng);
  };

  render() {
    const { t, contactListLoaded, contactList } = this.props;
    return (
      <Container>
        <h2>
          {t('Welcome to React.js')}
          {t('Ukraine')}
        </h2>
        <div className="lang-button">
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => this.changeLanguage('en')}
          >
            <span role="img" aria-label="English">
              🇺🇸
            </span>
            English
          </button>
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => this.changeLanguage('ru')}
          >
            <span role="img" aria-label="Russian">
              🇷🇺
            </span>
            Русский
          </button>
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => this.changeLanguage('uk')}
          >
            <span role="img" aria-label="English">
              🇺🇦
            </span>
            Українська
          </button>
        </div>
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
  t: PropTypes.func,
  i18n: PropTypes.any,
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

export default hot(withTranslation()(connect(mapStateToProps)(App)));
