import api from "../../Services/api";
import { Button } from "@material-ui/core";
import { useState } from "react";

function UserCards({ profileUser }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });

  // const [user, setUser] = useState(() => {
  //   return localStorage.getItem("user") || "";
  // });

  const [userTechs, setUserTechs] = useState(() => {
    return localStorage.getItem("techs") || "";
  });

  const handleButtonDelete = ({ cardId }) => {
    api
      .delete(`/users/techs/${cardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUserTechs(...profileUser, res.data.techs))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2>{profileUser.name}'s Techs:</h2>
      {userTechs > 0 &&
        userTechs.map((tech, index) => {
          const cardId = tech[index].id;
          return (
            <div key={index}>
              <h3>{tech.title}</h3>
              <h4>{tech.status}</h4>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleButtonDelete({ cardId })}
              >
                Delete Tech
              </Button>
            </div>
          );
        })}
    </>
  );
}

export default UserCards;
