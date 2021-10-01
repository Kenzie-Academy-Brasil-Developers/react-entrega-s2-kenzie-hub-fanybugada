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
      <div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => history.push("/UserLogin")}
        >
          Log In
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => history.push("/Register")}
        >
          Sign In
        </Button>
      </div>
    </section>
  );
}
export default Welcome;
