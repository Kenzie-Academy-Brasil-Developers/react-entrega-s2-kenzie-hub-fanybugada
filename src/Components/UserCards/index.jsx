import api from "../../Services/api";
import { Button } from "@material-ui/core";
import { useState } from "react";

function UserCards({ cardsUsers, userTechs }) {
  const [token] = useState(
    JSON.parse(localStorage.getItem("@Kenziehub:token")) || ""
  );
  const [userId] = useState(
    JSON.parse(localStorage.getItem("@Kenziehub:id")) || ""
  );

  const handleButtonDelete = ({ cardId }) => {
    api
      .delete(`/users/techs/${cardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => userTechs())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2>{userId.name}'s Techs:</h2>
      {cardsUsers &&
        cardsUsers.map((tech, index) => {
          const cardId = tech.id;
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
