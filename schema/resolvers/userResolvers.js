const wayf = require('../../wayf-client'),
      loaders = require('../dataloaders');


module.exports = {
  Query: {
    getDevice: (roor,data,context) => {
      return wayf.getDevice(context);
    },
    listIdp: (root,data,context) => {
      // the 3rd argument of the resolver, args[2], is the "context"
      // the context is created with graphqlExpress
      // the device ID is passed from the request cookie into the context
      return wayf.listIdp(context);
    },
    listActivity: (root,data,context) => {
      console.log("Data: ", data)
      return wayf.listActivity(context,data);
    }
  },
  Mutation: {
    deleteDevice: (root,data,context) => wayf.deleteDevice(context,data),
    forgetIdp: (root, data, context) => wayf.forgetIdp(context,data)
  },
  DeviceType: {
    id: (root) => root.id,
    device: (root) => root.ua.device,
    os: (root) => root.ua.os,
    browser: (root) => root.ua.browser,
    userAgent: (root) => root.info.userAgent,
    latestActivity: async (root,data,context) => {
      let activity = await wayf.listActivity(context,{limit:1, type:'ADD_IDP'});
      return {
        date: activity[0]?activity[0].createdDate:null,
        id: activity[0]?activity[0].publisher.id:null
      }
    }
  },
  PublisherActivityType: {
    publisherId: (root) => root.id,
    activityDate: (root) => root.date,
    publisherName: async (root,data,context) => {
      if (root.id) {
        let publisher = await wayf.getPublisherById(context,root)
        return publisher.name;
      }
      else
        return null;
    }
  },
  IdpType: {
    lastActiveDate: (root) => root.lastActiveDate,
    frequency: (root) => root.frequency,
    logoUrl: (root) => root.idp?root.idp.logo:null,
    id: (root) => root.idp?root.idp.id:null,
    type: (root) => root.idp?root.idp.type:null,
    name: (root) => root.idp?root.idp.name:null
  },
  ActivityType: {
    id: (root) => root.id,
    publisherId: (root) => root.publisher?root.publisher.id:"<User>",
    publisherName: async (root,data,context) => {
      if (root.publisher) {
        //let pubs = await wayf.getPublisherById(context,root.publisher);
        // disable data loader till the loader API is enhanced to return results in the right order
        let pubs = await loaders.publisher.load(root.publisher.id);
        return pubs.name;
      }
      else {
        return "<User>";
      }
    },
    date:  (root) => root.createdDate,
    action: (root) => root.type,
    data: (root) => {
      return {
        id: root.identityProvider?root.identityProvider.id:null,
        type: root.identityProvider?root.identityProvider.type:null
      };
    }
  },
  ActivityDataType: {
    // id: (root) => root.identityProvider?root.identityProvider.id:null,
    //type: (root) => root.identityProvider?root.identityProvider.type:null,
    name: async (root,data,context) => {
      console.log("Root: ", root)
      let name;
      if (root.id) {
       let idps = await loaders.idp.load(root.id);
       name = idps.name
      }
      //name = await wayf.getIdpById(context,root.id);
      return name;
    }
  }
};
