import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory, Redirect } from "react-router";
import * as yup from "yup";
import api from "../../Services/api";
import { TextField, Button } from "@material-ui/core";

function UserLogin({ authenticated, setAuthenticated }) {
  const history = useHistory();

  const schema = yup.object().shape({
    email: yup.string().required("Campo Obrigatório!").email("Email Inválido!"),
    password: yup
      .string()
      .required("Campo Obrigatório!")
      .min(6, "Mínimo seis (6) caracteres"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  if (authenticated) {
    return <Redirect to="/UserProfile" />;
  }

  const handleButtonLogin = (data) => {
    api
      .post("/sessions", data)
      .then((res) => {
        const { token } = res.data;
        const { id } = res.data.user;

        localStorage.setItem("@Kenziehub:token", JSON.stringify(token));
        localStorage.setItem("@Kenziehub:id", JSON.stringify(id));
        setAuthenticated(true);
        return history.push("/UserProfile");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
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
            Login!
          </Button>
        </div>
      </form>
    </>
  );
}
export default UserLogin;
