import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_AL_USERS, GET_USER } from "./Queries/User";
import { CREATE_USER, DELETE_USER, UPDATE_PASSWORD } from "./Mutations/User";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllUsers: GET_AL_USERS,
    getUser: GET_USER,
  },
});
 
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
    updatePassword: UPDATE_PASSWORD,
  },
}); 

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
