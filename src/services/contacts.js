import moment from 'moment';

const firstNames = [
  'Mark',
  'Jacob',
  'Daniel',
  'Michael',
  'Abraham',
  'Lincoln',
  'John',
  'Dave',
  'Steven',
];

const lastNames = [
  'Otto',
  'Thornton',
  'Smith',
  'Johnson',
  'Williams',
  'Jones',
  'Brown',
  'Davis',
  'Miller',
  'Wilson',
];

export const roles = {
  engineer: 'Engineer',
  sales: 'Sales',
  customersupport: 'Customer Support',
  manager: 'Manager',
};

export const statuses = {
  screen: 'Screen',
  scheduled: 'Scheduled',
  explored: 'Explored',
  hire: 'Hire',
};

let contactList = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateRandomContactList() {
  const list = [];
  const rolesKeys = Object.keys(roles);
  const statusesKeys = Object.keys(statuses);
  for (let id = 1; id <= 10; id += 1) {
    list.push({
      id,
      fullname:
        firstNames[getRandomInt(firstNames.length - 1)] +
        ' ' +
        lastNames[getRandomInt(lastNames.length - 1)],
      role: rolesKeys[getRandomInt(rolesKeys.length - 1)],
      // eslint-disable-next-line
      connectedOn: moment(Date(+(new Date()) - Math.floor(Math.random() * 10000000000))).format('YYYY-MM-DD'),
      status: statusesKeys[getRandomInt(statusesKeys.length - 1)],
    });
  }
  return list;
}

class ContactsService {
  getContacts = async () => {
    if (contactList.length < 10) {
      contactList = generateRandomContactList();
    }
    return contactList;
  };

  updateContactStatus = async person => {
    // We simulate PUT request to backend and get updated single contact back
    return person;
  };
}

export default new ContactsService();
