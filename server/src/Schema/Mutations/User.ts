import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';
import { UserType } from "../TypeDefs/User";
import { MessageTypes } from "../TypeDefs/Messages";
import { Users } from "../../Entities/Users";


export const CREATE_USER = {
  type: UserType,
  name: "CreateUser",
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
   const {name, username, password} = args;

   const user = await Users.findOne({ where: { username: username } });

   if(user){
    throw new Error("Sorry, already exist a user with this username");
   };

   await Users.insert({ name, username, password });
   return args;
  }
};


export const UPDATE_PASSWORD = {
  type: new GraphQLObjectType({
    name: "UpdateUserResponse",
    fields: () => ({
      user: { type: UserType },
      message: { type: MessageTypes },
    }),
  }),
  args: {
    username: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { username, oldPassword, newPassword } = args;

    const user = await Users.findOne({ where: { username: username } });

    if(!user){
      throw new Error("Username doesn't Exist!");
    };
 
    const userPassword = user?.password;

    if (oldPassword === userPassword) {
       await Users.update(
        { username: username },
        { password: newPassword }
      );

      return {
        message: { successful: true, message: "Password Updated!" },
       };
     } else {
      throw new Error("Password do not Match!");
    }
  },
};


export const DELETE_USER = {
  type: new GraphQLObjectType({
    name: "DeleteUserResponse",
    fields: () => ({
      user: { type: UserType },
      message: { type: MessageTypes },
    }),
  }), 
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const id = args.id;
    const user = await Users.findOne({ where: { id: id } });

    if (!user) {
      throw new Error(`User with id ${id} not found!`);
    };

    await Users.delete(id);
    return {
      user: user,
      message: { successful: true, message: "User Deleted!" },
    };
  },
};
