import React from "react";
import { UPDATE_PASSWORD } from "../Graphql/Mutations";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../Graphql/Queries";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UpdateForm, User } from "../components";

export const Update: React.FC = () => {

  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_USER, {
    variables: { id },
  });
  const [updatePassword, { error: errorUpdate }] = useMutation(UPDATE_PASSWORD);

  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    username: "",
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (field: keyof UpdateForm): React.ChangeEventHandler<HTMLInputElement> =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: event.target.value });
    };

  React.useEffect(() => {
    if (data) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        username: data?.getUser?.username,
      }));
    }
  }, [data]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      updatePassword({
        variables: {
          username: formData.username,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
      }).then(() => navigate("/"));

    } catch (error) {
      console.log(error);
    };
  };


  if (!data || loading ) {
    return <h1>Loading...</h1>;
  };

  return (
    <form className="formUpdate" onSubmit={handleSubmit}>
      <div>
        {error || errorUpdate ? (
          <>
            <h1 className=" text-center  text-danger ">{error?.message} </h1>
            <h1 className=" text-center text-danger">{errorUpdate?.message}</h1>
          </>
        ) : (
          ""
        )}
      </div>
      <h1 className="my-3 text-center">Update Password</h1>
      <Link className="text-center text-info mb-4" to={"/"}>
        <b>Go back</b>
      </Link>
      <input
        type="text"
        placeholder="Name.."
        onChange={handleChange("username")}
        value={formData && formData?.username}
        required
      />{" "}
      <br /> <br />
      <input
        type="text"
        placeholder="Username.."
        autoComplete="username"
        onChange={handleChange("oldPassword")}
        required
      />{" "}
      <br /> <br />
      <input
        type="password"
        placeholder="Password.."
        autoComplete="current-password"
        onChange={handleChange("newPassword")}
        required
      />{" "}
      <br /> <br />
      <button type="submit" className="btn btn-warning mx-5">
        <b className="text-secondary">Update Password</b>
      </button>
    </form>
  );
};
