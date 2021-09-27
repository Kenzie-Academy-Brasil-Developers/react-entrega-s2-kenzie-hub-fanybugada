import { useHistory } from "react-router";

function Welcome({ authenticated }) {
  const history = useHistory();

  return (
    <>
      <div>
        <h1> Welcome to KenzieHub! </h1>
      </div>
      <div>
        <button onClick={() => history.push("/UserLogin")}> Login </button>
        <button onClick={() => history.push("/Register")}> Register </button>
      </div>
    </>
  );
}
export default Welcome;
