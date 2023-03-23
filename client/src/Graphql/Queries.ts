import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
# debe tener el mismo nombre del backend
  query getAllUsers {
    getAllUsers {
        id
        name
        username
    }
  }
`;

export const GET_USER = gql`
  # debe tener el mismo nombre del backend
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      username
      password
    }
  }
`;