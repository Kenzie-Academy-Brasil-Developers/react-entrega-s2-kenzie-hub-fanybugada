import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory, Redirect } from "react-router";
import * as yup from "yup";
import api from "../../Services/api";
import { TextField, Button } from "@material-ui/core";
import "./style.css";
import { useState } from "react";

function Register({ authenticated }) {
  const schema = yup.object().shape({
    name: yup.string().required("Campo Obrigatório!"),
    email: yup.string().required("Campo Obrigatório!").email(),
    bio: yup.string().required("Campo Obrigatório!"),
    contact: yup.string().required("Campo Obrigatório!"),
    password: yup
      .string()
      .required("Campo Obrigatório!")
      .min(6, "Mínimo seis (6) caracteres"),
    confirmPassword: yup
      .string()
      .required("Campo Obrigatório!")
      .oneOf([yup.ref("password")], "Senhas diferentes!"),
    course_module: yup.string().required("Campo Obrigatório!"),
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

  const handleRegisterForm = ({
    name,
    email,
    bio,
    contact,
    password,
    course_module,
  }) => {
    const userData = {
      name: name,
      email: email,
      bio: bio,
      contact: contact,
      password: password,
      course_module: course_module,
    };

    api
      .post("/users", userData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => history.push("/UserLogin"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="registerContainer">
      <h1>KenzieHub</h1>
      <form onSubmit={handleSubmit(handleRegisterForm)}>
        <div>
          <TextField
            label="Name"
            margin="normal"
            variant="outlined"
            size="small"
            color="primary"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </div>

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
            label="Bio"
            margin="normal"
            variant="outlined"
            size="small"
            color="primary"
            {...register("bio")}
            error={!!errors.bio}
            helperText={errors.bio?.message}
          />
        </div>

        <div>
          <TextField
            label="Contact"
            margin="normal"
            variant="outlined"
            size="small"
            color="primary"
            {...register("contact")}
            error={!!errors.contact}
            helperText={errors.contact?.message}
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
          <TextField
            label="Confirm Password"
            margin="normal"
            variant="outlined"
            size="small"
            color="primary"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        </div>

        <div>
          <TextField
            label=" Course Module"
            margin="normal"
            variant="outlined"
            size="small"
            color="primary"
            {...register("course_module")}
            error={!!errors.course_module}
            helperText={errors.course_module?.message}
          />
        </div>

        <div>
          <Button type="submit" variant="contained" color="primary">
            Register!
          </Button>
        </div>
      </form>

      <button onClick={() => history.push("/UserLogin")}>
        Already a member? Log in
      </button>
    </div>
  );
}
export default Register;
