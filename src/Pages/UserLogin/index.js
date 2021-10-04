import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory, Redirect } from "react-router";
import * as yup from "yup";
import api from "../../Services/api";
import { TextField, Button } from "@material-ui/core";
import "./style.css";
import { useState } from "react";

function UserLogin({ authenticated, setAuthenticated }) {
  const schema = yup.object().shape({
    email: yup.string().required("Campo Obrigatório!").email("Email Inválido!"),
    password: yup
      .string()
      .required("Campo Obrigatório!")
      .min(6, "Mínimo seis (6) caracteres"),
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const history = useHistory();

  if (authenticated) {
    return <Redirect to="/UserProfile" />;
  }

  const handleButtonLogin = (data) => {
    const userData = { email: data.email, password: data.password };

    api
      .post("/sessions", userData)
      .then((res) => {
        // const { token } = res.data.token;

        localStorage.clear();
        localStorage.setItem(
          "token",
          JSON.parse(JSON.stringify(res.data.token))
        );

        localStorage.setItem(
          "id",
          JSON.parse(JSON.stringify(res.data.user.id))
        );

        setAuthenticated(true);
        return history.push("/UserProfile");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="loginContainer">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit(handleButtonLogin)}>
        <div>
          <TextField
            label="Email"
            margin="normal"
            variant="outlined"
            size="small"
            color="primary"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </div>

        <div>
          <TextField
            label="Password"
            margin="normal"
            variant="outlined"
            size="small"
            color="primary"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </div>

        <div>
          <Button type="submit" variant="contained" color="primary">
            Log in
          </Button>
        </div>
      </form>
      <div>
        <button onClick={() => history.push("/Register")}>
          Not a member yet? Sign in
        </button>
      </div>
    </div>
  );
}
export default UserLogin;
