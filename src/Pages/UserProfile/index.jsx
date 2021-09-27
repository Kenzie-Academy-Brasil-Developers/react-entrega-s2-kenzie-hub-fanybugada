import api from "../../Services/api";
import { useState } from "react";
import UserCards from "../../Components/UserCards";
import { Redirect } from "react-router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@material-ui/core";

function UserProfile({ authenticated }) {
  const token = JSON.parse(localStorage.getItem("@Kenziehub:token"));
  const id = JSON.parse(localStorage.getItem("@Kenziehub:id"));
  const [cardsUser, setCardsUser] = useState([]);

  const schema = yup.object().shape({
    title: yup.string().required(),
    status: yup.string().required(),
  });

  api
    .get(`/users/${id}`)
    .then((res) => setCardsUser(res.data.techs))
    .catch((err) => console.log(err));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  if (!authenticated) {
    return <Redirect to="/UserLogin" />;
  }

  const handleCardSubmit = (data) => {
    //   console.log(data);
    api
      .post("users/techs", data, {
        headers: { Authorization: `Bearer: ${token}` },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(handleCardSubmit)}>
      <input type="text" placeholder="Add Technology" {...register("title")} />
      <input
        type="text"
        placeholder="Add Description"
        {...register("status")}
      />
      <Button type="submit" variant="contained" color="primary">
        Create
      </Button>
      <UserCards cardsUser={cardsUser} />
    </form>
  );
}
export default UserProfile;
