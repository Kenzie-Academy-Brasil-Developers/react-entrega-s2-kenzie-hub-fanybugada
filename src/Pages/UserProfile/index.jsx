import api from "../../Services/api";
import { useEffect, useState } from "react";
import UserCards from "../../Components/UserCards";
import { Redirect } from "react-router";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@material-ui/core";
import "./style.css";

function UserProfile({ authenticated, setAuthenticated }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });

  // const [id] = useState(JSON.parse(localStorage.getItem("id")));

  const [profileUser, setProfileUser] = useState(() => {
    return localStorage.getItem("user") || "";
  });

  const schema = yup.object().shape({
    title: yup.string().required(),
    status: yup.string().required(),
  });

  // const userId = profileUser._id;

  useEffect(() => {
    api
      .get("/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfileUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleCardSubmit = ({ title, status }) => {
    const userData = { title: title, status: status };
    api
      .post("/users/techs", userData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfileUser(...profileUser, res.data.techs))
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   userTechs();
  // });

  if (!authenticated) {
    return <Redirect to="/UserLogin" />;
  }

  const logout = () => {
    localStorage.clear();
    setAuthenticated(false);
  };
  console.log(profileUser);
  return (
    <div className="profileContainer">
      <button onClick={() => logout()}>Logout</button>

      <div>
        <h1>Welcome, {profileUser.name}</h1>
        <div>
          <h4>Email: {profileUser.email}</h4>
          <h4>Bio: {profileUser.bio}</h4>
          <h4>Contact: {profileUser.contact}</h4>
          <h4>Course Module: {profileUser.course_module}</h4>
        </div>
      </div>

      <hr />

      <UserCards profileUser={profileUser} setProfileUser={setProfileUser} />

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
    </div>
  );
}
export default UserProfile;
