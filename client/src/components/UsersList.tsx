import React from 'react';
import { useQuery, useMutation } from "@apollo/client";
import {GET_ALL_USERS} from "../Graphql/Queries";
import { DELETE_USER } from "../Graphql/Mutations";
import { User } from './interfaces';
import { Link } from 'react-router-dom';


export const UsersList: React.FC = () => {

  console.log("UsersList");


 const {data, error, refetch} = useQuery(GET_ALL_USERS);
 const [deleteUser ] = useMutation(DELETE_USER);

const handleDelete = (event: any) => {
 deleteUser({variables: {id: event.id}});
 alert("User Deleted!")
 refetch()
};

  if (error) {
    return <h1 className='text-center text-danger'>{error.message}</h1>;
  };  

  return (
    <div className="m-5 divList">
      {!data?.getAllUsers || data.getAllUsers.length === 0 ? (
        <h1 className='text-center'>No users found</h1>
      ) : (
        data.getAllUsers.map((user: User) => (
          <div
            className="text-warning border border-warning p-1 m-1 rounded "
            key={user.id}
          >
            <p>
              Name: <span className="text-primary">{user.name}</span>
            </p>
            <p>
              Username: <span className="text-primary">{user.username}</span>
            </p>
            <button
              className="btn-sm btn-info"
              onClick={() => handleDelete(user)}
            >
              Delete User
            </button>{" "}
            <br />
            <div className="mb-1 mt-3 ">
              <Link
                to={`/update/${user.id}`}
                className="border border-success text-success rounded p-1 "
              >
                change password
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
