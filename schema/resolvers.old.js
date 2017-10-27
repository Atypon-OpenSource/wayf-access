const wayf = require('../wayf-client');



module.exports = {
  Query: {
    listPublishers: (root,data,context) => {
      return wayf.listPublishers(context,data);
    },
    listPendingRegistrations: (root,data,context) => {
      return wayf.listPendingRegistrations(context,data);
    },
    listIdp: (...args) => {
      // the 3rd argument of the resolver, args[2], is the "context"
      // the context is created with graphqlExpress
      // the device ID is passed from the request cookie into the context
      return wayf.listIdp(args[2]);
    },
    listActivity: (root,data,context) => {
      console.log("Data: ", data)
      return wayf.listActivity(context,data);
    }
  },
  Mutation: {
    adminLogin: (root,data,context) => {
      console.log("Admin Login Data:", data);
      return wayf.adminLogin(context,data);
    }
  },
  AdminPublisher: {
    id: (root) => root.id,
    name: (root) => root.name,
    code: (root) => root.code,
    date: (root) => root.createdDate,
    api: (root,data,context) => {
      return {
        token: root.token?root.token.value:null,
        widgetUrl: root.token?root.token.widdgetUrl:null
      }
    },
    contact: (root,data,context) => {
      return {
        id: (root) => root.contact?root.contact.id:null
      };
    }
  },
  PublicPublisher: {
    id: (root) => root.id,
    name: (root) => root.publisherName,
    date: (root) => root.applicationDate,
    contact: (root,data,context) => {
      return {
        id: (root) => root.contact?root.contact.id:null
      };
    }
  },
  PublisherContact: {
    name: (root,data,context) => {
      return "name";
    },
    email: (root,data,context) => {
      return "email"
    },
    phone: (root,data,context) => {
      return "phone"
    }
  },
  Idp: {
    lastActiveDate: (root) => root.lastActiveDate,
    frequency: (root) => root.frequency,
    logoUrl: (root) => root.idp?root.idp.logo:null,
    id: (root) => root.idp?root.idp.id:null,
    type: (root) => root.idp?root.idp.type:null,
    name: (root) => root.idp?root.idp.name:null
  },
  Activity: {
    id: (root) => root.id,
    publisherId: (root) => root.publisher.id,
    publisherName: async (root,data,context) => {
      let idp = await wayf.getPublisherById(context,root.publisher.id);
      return idp.name;
    },
    date:  (root) => root.createdDate,
    action: (root) => root.type,
    data: (root) => {
      return {
        id: root.identityProvider?root.identityProvider.id:null,
        type: root.identityProvider?root.identityProvider.type:null
      }
    }
  },
  ActivityData: {
    name: async (root,data,context) => {
      let name;
      if (root.id)
       name = await wayf.getIdpById(context,root.id);
      return name;
    }
  }
};
