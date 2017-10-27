const _ = require('lodash'),
      adminResolvers = require('./adminResolvers'),
      userResolvers = require('./userResolvers'),
      graphQLJSON = require('graphql-type-json');


const resolveFunctions = {
  JSON: graphQLJSON
};

module.exports = _.merge(adminResolvers, userResolvers, resolveFunctions);
