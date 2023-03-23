import React from "react";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../Graphql/Mutations";
import { User } from "./interfaces";

export const CreateUser: React.FC = () => {
  
console.log("CreateUser");

const [createUser, { error }] = useMutation(CREATE_USER, {
  onCompleted: () => {
    window.location.reload();
  },
});
  const [formData, setFormData] = React.useState({
    name: "",
    username: "",
    password: "",
  });

  const handleChange =
    (field: keyof User): React.ChangeEventHandler<HTMLInputElement> =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: event.target.value });
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
      event: React.FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      try {
        
        createUser({
          variables: {
            name: formData.name,
            username: formData.username,
            password: formData.password,
          },
        });
      } catch (error: any | unknown ) {
    if (error.message.includes("Sorry, already exist a user with this username")) {
       console.log("Sorry, already exist a user with this username");
    } else {
      alert("Something went wrong.. Please try again.");
      };   
     };
    };


  return (
    <>
      <div className="d-flex justify-content-center align-items-center ">
        <form onSubmit={handleSubmit}>
          <h1>Creat User</h1>
          <input
            type="text"
            placeholder="Name.."
            onChange={handleChange("name")}
            required
          />{" "}
          <br /> <br />
          <input
            type="text"
            placeholder="Username.."
            autoComplete="username"
            onChange={handleChange("username")}
            required
          />{" "}
          <br /> <br />
          <input
            type="password"
            placeholder="Password.."
            autoComplete="current-password"
            onChange={handleChange("password")}
            required
          />{" "}
          <br /> <br />
          <div className="d-flex justify-content-center">
            <button className="btn-sm btn-primary w-50" type="submit">
              <b>Create</b>
            </button>
          </div>
        </form>
      </div>
      <div>
        {error && error ? (
          <h3 className="text-center text-danger">{error?.message}</h3>) : ("")}
      </div>
    </>
  );
};
