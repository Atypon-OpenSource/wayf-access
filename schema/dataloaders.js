const DataLoader = require('dataloader'),
      wayf = require('../wayf-client');

module.exports.publisher = new DataLoader(
    keys => wayf.loadPublishers(keys),
    {cacheKeyFn: key => key.toString()},
);

module.exports.idp = new DataLoader(
    keys => wayf.loadIdps(keys),
    {cacheKeyFn: key => key.toString()},
);

module.exports.user = new DataLoader(
    keys => wayf.loadUsers(keys), 
    {cacheKeyFn: key => key.toString()},
);

// module.exports.idp = new DataLoader( (context,keys) => wayf.listIdp(context,keys));
// module.exports.user = new DataLoader(keys => wayf.listAdminUsers(context,keys));
// module.exports.activity = new DataLoader((context,keys) => listActivity(context,keys));

// module.exports = ({data}) => {
//   publiserLoader: new DataLoader (
//     (context,keys) => wayf.loadPublishers(context,keys)),
//     {cacheKeyFn: key => key.toString()},
//   ),
//
//   adminUserLoader: new DataLoaders (
//     keys => wayf.listAdminUsers
//   )
// }
