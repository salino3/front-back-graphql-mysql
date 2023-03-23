import { GraphQLObjectType, GraphQLID, GraphQLString} from "graphql";

export const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type: GraphQLID},// <- este tipado acepta el 'id' con o sin comillas
        name: {type: GraphQLString},
        username: {type: GraphQLString},
        password: {type: GraphQLString}
    })
});



