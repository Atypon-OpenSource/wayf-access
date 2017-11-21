const client = require('./dispatcher'),
      qs = require('qs'),
      randomstring = require("randomstring"),
      parser = require('ua-parser-js');



/// User API //////
module.exports.getDevice = async (context) => {
  let apiDevice = await client.get(context,'/mydevice');
  let ua = parser(apiDevice.info.userAgent);
  apiDevice.ua = ua;
  return apiDevice;

};

module.exports.deleteConsent = async (context) => await client.delete(context,`/device/`);
module.exports.deleteDevice = async (context) => await client.delete(context,`/device/${id}`);
module.exports.listIdp = async (context) => await client.get(context,'/mydevice/history');
module.exports.listActivity = async (context,data) => await client.get(context,'/mydevice/activity?'+qs.stringify(data));
module.exports.getPublisherById = async (context,id) => await client.get(context,`/publisher/${id}`);
module.exports.forgetIdp = async (context,data) => {
  let deleted = await client.delete(context,`/mydevice/history/idp/${data.id}`);
  console.log("Deleted: ", deleted)
  return deleted;
}

module.exports.getIdpById = async (context,id) => {
  if (!id) {
    return null;
  }
  let idp = await client.get(context,`/identityProvider/${id}`);
  return idp.name;
}
///  End of User API ///////



/// Adin API ////////////////
module.exports.adminLogin = async (context,credentials) => {
  let token = await client.post(context,'/user/credentials', credentials);
  context.session.token = token.value;
}

module.exports.listAdminUsers = async (context) => await client.get(context,'/users?view=ADMIN');
module.exports.createAdminUser = async (context,data) => {
  let body = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phoneNumber: data.phone,
    credentials: {
      emailAddress: data.email,
      password: data.password
    }
  };
  return await client.post(context,'/user',body);
}
module.exports.getUserById = async (context,data) => await client.get(context,`/user/${data.id}`);
module.exports.deleteAdminUser = async (context,data) => await client.delete(context,`/user/${data.id}`);
module.exports.resetAdminUserPassword = async (context,data) => {
  let body = {
    password: data.password
  };
  return await client.put(context,`/user/${data.id}/credentials`,body);
}
module.exports.createPublisher = async (context,data) => {
  let body = {
    name: data.name,
    code: data.code || randomstring.generate(9),
    contact : {
      firstName: data.firstName,
      lastName : data.lastName,
      email : data.email,
      phoneNumber: data.phone
    }
  };
  if (data.registrationId) {
    body.registration = {
      id: data.registrationId
    }
  }
  return  await client.post(context,'/publisher', body);
}
// Delete publisher not implemented
module.exports.getPublisherById = async (context,data) => await client.get(context,`/publisher/${data.id}`);
module.exports.deletePublisher = async (context,data) => await client.delete(context,`/publisher/${data.id}`);
module.exports.listPublishers = async (context,filter) => await client.get(context,'/publishers?view=ADMIN&'+qs.stringify(filter));
module.exports.listMembers = async (context,filter) => await client.get(context,'/publishers?view=USER&'+qs.stringify(filter));
module.exports.registerPublisher = async (context,data) => {
    let body = {
      publisherName: data.name,
      contact : {
        firstName: data.firstName,
        lastName : data.lastName,
        email : data.email,
        phoneNumber: data.phone
      }
    };
    return  await client.post(context,'/publisherRegistration', body);
  }

module.exports.rejectRegistration = async (context,data) => {
    let body = {
      id: data.id,
      status: 'DENIED'
    };
    return await client.patch(context,`/publisherRegistration/${data.id}`, body);
}


module.exports.getPendingRegistrationById = async (context,data) => await client.get(context,`/publisherRegistration/${data.id}`);
module.exports.listPendingRegistrations = async (context,filter) => await listRegistrations(context,filter,"PENDING");
module.exports.listApprovedRegistrations = async (context,filter) => await listRegistrations(context,filter,"APPROVED");
module.exports.listRegectedRegistrations = async (context,filter) => await listRegistrations(context,filter,"DENIED");

const listRegistrations = async (context,filter,type) => await client.get(context,'/publisherRegistrations?statuses=' + type + '&' + qs.stringify(filter));
/// End of Admin API

///// Loaders
module.exports.loadPublishers = async (data) => await client.get(null,`/publishers?ids=${data}`);
module.exports.loadIdps = async (data) => await client.get(null,`/identityProviders?ids=${data}`);
module.exports.loadUsers = async (data) => await client.get(null,`/users?ids=${data}`);
