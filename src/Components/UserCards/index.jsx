import api from "../../Services/api";
import { Button } from "@material-ui/core";

function UserCards({ cardsUsers }) {
  const token = JSON.parse(localStorage.getItem("@Kenziehub:token"));

  const handleButtonDelete = (data) => {
    api
      .delete(`/users/techs/${data.id}`, {
        headers: {
          Authorization: `Bearer: ${token}`,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  if (cardsUsers[0] === undefined) {
    return (
      <div>
        <h1>Nenhuma Tecnologia cadastrada.</h1>
      </div>
    );
  } else {
    return cardsUsers.map((tech, index) => (
      <div key={index}>
        <h1>{tech.title}</h1>
        <h3>{tech.status}</h3>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleButtonDelete(tech)}
        >
          Delete Tech
        </Button>
      </div>
    ));
  }
}

export default UserCards;
