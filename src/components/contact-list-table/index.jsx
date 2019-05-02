import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Form, Row, Col } from 'react-bootstrap';

/* In real world this (roles and statuses) should be retched from server as metadata and stored in redux state.
  In this test app I just put it here to save some time */
import { roles, statuses } from '../../services/contacts';

import './index.css';

class ContactListTable extends Component {
  constructor(props) {
    super(props);
    const { contactList } = this.props;
    this.state = {
      contactList,
      query: '',
      searchActive: false,
    };

    this.queryInput = React.createRef();
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      contactList: nextProps.contactList,
    };
  }

  handleQueryChange = e => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleSearch = () => {
    const query = this.queryInput.current.value;
    if (!query) {
      this.handleResetList();
      return;
    }
    this.setState({
      query: this.queryInput.current.value,
      searchActive: true,
    });
  };

  handleResetList = () => {
    this.setState({
      searchActive: false,
    });
  };

  getSearchResults = (contactList, query) => {
    const queryParams = query.split(' ');
    // As default we will search in "AND" condition
    // John Smith == John AND Smith
    // "OR" modifier can be only in the middle
    const searchMethod =
      queryParams.length > 1 && queryParams[1].toLowerCase() === 'or'
        ? 'OR'
        : 'AND';
    const searchParams = _.filter(queryParams, param => {
      return param.toLowerCase() !== 'or' && param.toLowerCase() !== 'and';
    });
    const results = _.filter(contactList, item => {
      const found = searchParams.map(param => {
        return _.some(item, v => {
          return _.includes(`${v}`.toLowerCase(), param.toLowerCase());
        });
      });
      const paramsFoundCont = _.filter(found, f => f).length;
      return searchMethod === 'AND'
        ? paramsFoundCont === searchParams.length
        : paramsFoundCont > 0;
    });
    return results;
  };

  getRole = roleId => {
    return roles[roleId];
  };

  getStatus = statusId => {
    return statuses[statusId];
  };

  renderRow(person, onStatusUpdate) {
    return (
      <tr key={`persons-table-tr-${person.id}`}>
        <td>{person.fullname}</td>
        <td>{this.getRole(person.role)}</td>
        <td>{person.connectedOn}</td>
        <td>
          <Form.Control
            as="select"
            value={person.status}
            onChange={e => {
              // eslint-disable-next-line
              console.log('Changed', e.currentTarget.value);
              onStatusUpdate({
                ...person,
                status: e.currentTarget.value,
              });
            }}
          >
            {Object.keys(statuses).map(key => {
              return (
                <option key={`option-${key}`} value={key}>
                  {this.getStatus(key)}
                </option>
              );
            })}
          </Form.Control>
        </td>
      </tr>
    );
  }

  render() {
    const { contactList, searchActive, query } = this.state;
    const { onStatusUpdate } = this.props;
    const contactListFiltered = searchActive
      ? this.getSearchResults(contactList, query)
      : contactList;
    return (
      <div>
        <Row className="mt-20">
          <Col xs="12">
            <Form.Text className="text-muted">
              As default &quot;AND&quot; method used. Example: &quot;John
              Smith&quot;, &quot;John OR Michael&quot;, &quot;John AND
              2019-02-01&quot;, &quot;Hire&quot;, &quot;2019-04-13&quot;,
              &quot;Sales&quot;, &quot;John AND Sales&quot;.
            </Form.Text>
          </Col>
        </Row>
        <Row className="mt-20 mb-20">
          <Col xs="8">
            <Form.Control
              type="text"
              placeholder="Search..."
              onKeyUp={this.handleQueryChange}
              ref={this.queryInput}
            />
          </Col>
          <Col xs="2">
            <Button variant="primary" type="submit" onClick={this.handleSearch}>
              Search
            </Button>
          </Col>
          <Col xs="2">
            <Button
              variant="danger"
              className="pull-right"
              onClick={this.handleResetList}
            >
              Reset
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Role</th>
              <th>Connected On</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {contactListFiltered.map(person =>
              this.renderRow(person, onStatusUpdate),
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

ContactListTable.propTypes = {
  contactList: PropTypes.array,
  onStatusUpdate: PropTypes.func,
};

export default ContactListTable;
