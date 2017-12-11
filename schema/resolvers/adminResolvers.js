const wayf = require('../../wayf-client'),
      loaders = require('../dataloaders');

module.exports = {
  Query: {
    listPublishers: (root,data,context) => wayf.listPublishers(context,data),
    listMembers: (root,data,context) => wayf.listMembers(context,data),
    listPendingRegistrations: (root,data,context) => wayf.listPendingRegistrations(context,data),
    listAdminUsers: (root,data,context) => wayf.listAdminUsers(context,data),
    getUser: (root,data,context) => wayf.getUserById(context,data),
    getPublisher: (root,data,context) => wayf.getPublisherById(context,data),
    getPendingRegistration: (root,data,context) => wayf.getPendingRegistrationById(context,data),
  },
  Mutation: {
    adminLogin: (root,data,context) => wayf.adminLogin(context,data),
    createPublisher: (root,data,context) => wayf.createPublisher(context,data),
    deletePublisher: (root,data,context) => wayf.deletePublisher(context,data),
    registerPublisher: (root,data,context) => {
      return wayf.registerPublisher(context,data)
    },
    rejectRegistration: (root,data,context) => wayf.rejectRegistration(context,data),
    approveRegistration: (root,data,context) => wayf.approveRegistration(context,data),
    createAdminUser: (root,data,context) => wayf.createAdminUser(context,data),
    deleteAdminUser: (root,data,context) => wayf.deleteAdminUser(context,data),
    resetAdminUserPassword: (root,data,context) => wayf.resetAdminUserPassword(context,data)
  },
  UserType: {
    id: (root) => root.id,
    email: (root) => root.email,
    phone: (root) => root.phoneNumber,
    firstName: (root) => root.firstName,
    lastName: (root) => root.lastName,
  },
  AdminPublisherType: {
    id: (root) => root.id,
    name: (root) => root.name,
    code: (root) => root.code,
    date: (root) => root.createdDate,
    url: (root) => root.url,
    api: (root,data,context) => {
      return {
        token: root.token?root.token.value:null,
        widgetUrl: root.widgetLocation?root.widgetLocation:null
      }
    },
    contact: async (root,data,context) => {
      let result = null;
      if (root.contact) {
        result = {
          id: root.contact.id,
          contact: await wayf.getUserById(context,root.contact)
        }
      }
      return result;
    }
  },
  PublicPublisherType: {
    id: (root) => root.id,
    name: (root) => root.publisherName,
    date: (root) => root.applicationDate,
    url: (root) => root.url,
    contact: async (root,data,context) => {
      let contact = await loaders.user.load(root.contact.id);
      return {
        id: root.contact.id,
        contact: contact
      }
    }
  },
  MemberPublisherType: {
    id: (root) => root.id,
    name: (root) => root.name,
    date: (root) => root.createdDate,
    code: (root) => root.code,
    url: (root) => root.url
  },
  PublisherContactType: {
    id: (root) => root.id,
    firstName: (root,data,context) => root.contact.firstName,
    lastName: (root,data,context) => root.contact.lastName,
    email: (root,data,context) => root.contact.email,
    phone: (root,data,context) => root.contact.phoneNumber
  }
};
