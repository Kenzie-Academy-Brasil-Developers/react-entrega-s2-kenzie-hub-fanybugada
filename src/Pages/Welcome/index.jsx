import { useHistory } from "react-router";
import "./style.css";
import { Button } from "@material-ui/core";

function Welcome({ authenticated }) {
  const history = useHistory();

  return (
    <section className="welcomeContainer">
      <div>
        <h1> Welcome to KenzieHub! </h1>
      </div>
      <div className="divWelcomeButtons">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => history.push("/UserLogin")}
        >
          Log In
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => history.push("/Register")}
        >
          Sign In
        </Button>
      </div>
    </section>
  );
}
export default Welcome;
