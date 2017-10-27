const {makeExecutableSchema} = require('graphql-tools'),
      typeDefs = require('./typeDefs'),
      resolvers = require('./resolvers');



// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
