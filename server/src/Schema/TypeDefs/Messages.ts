import { GraphQLObjectType, GraphQLString } from "graphql";

export const MessageTypes = new GraphQLObjectType({
  name: "Message",
  fields: () => ({
    successful: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});
