import { GraphQLID, GraphQLList } from 'graphql';
import {UserType} from '../TypeDefs/User';
import {Users} from '../../Entities/Users';

interface IUser {
    id: number;
    name: string;
    username: string;
    password: string;

};

export const GET_AL_USERS = {
    type: new GraphQLList(UserType),
    async resolve():  Promise<IUser[]> {
       const users = await Users.find();
       return users;
      }
};

export const GET_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_: any, args: any): Promise<IUser | null> {
    const { id } = args;
    const user = await Users.findOne({ where: { id: id } });

    return user;
  },
};
 
