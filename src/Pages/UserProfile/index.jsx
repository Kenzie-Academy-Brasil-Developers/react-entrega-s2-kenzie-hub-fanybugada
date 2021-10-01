import api from "../../Services/api";
import { useEffect, useState } from "react";
import UserCards from "../../Components/UserCards";
import { Redirect } from "react-router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@material-ui/core";

function UserProfile({ authenticated, setAuthenticated }) {
  const [token] = useState(
    JSON.parse(localStorage.getItem("@Kenziehub:token")) || ""
  );
  const [userId] = useState(
    JSON.parse(localStorage.getItem("@Kenziehub:id")) || ""
  );
  const [cardsUser, setCardsUser] = useState([]);

  const schema = yup.object().shape({
    title: yup.string().required(),
    status: yup.string().required(),
  });

  const userTechs = () => {
    api
      .get(`/users/${userId.id}`)
      .then((res) => setCardsUser(res.data.techs))
      .catch((err) => console.log(err));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleCardSubmit = ({ title, status }) => {
    const userData = { title: title, status: status };
    api
      .post("users/techs", userData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCardsUser(...cardsUser, userData))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    userTechs();
  });

  if (!authenticated) {
    return <Redirect to="/UserLogin" />;
  }

  const logout = () => {
    localStorage.clear();
    setAuthenticated(false);
  };

  return (
    <>
      <button onClick={() => logout()}>Logout</button>

      <div>
        <h1>Welcome, {userId.name}</h1>
        <div>
          <h4>Email: {userId.email}</h4>
          <h4>Bio: {userId.bio}</h4>
          <h4>Contact: {userId.contact}</h4>
          <h4>Course Module: {userId.course_module}</h4>
        </div>
      </div>

      <hr />

      <UserCards cardsUser={cardsUser} />

      <form onSubmit={handleSubmit(handleCardSubmit)}>
        <h2>Add New Tech:</h2>
        <input
          type="text"
          placeholder="Add Technology's name"
          {...register("title")}
        />
        <input
          type="text"
          placeholder="Add Description"
          {...register("status")}
        />
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </>
  );
}
export default UserProfile;
