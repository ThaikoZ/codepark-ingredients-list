import { Link, useNavigate } from "react-router-dom";
import { useForm, FieldValues } from "react-hook-form";
import { useState } from "react";
import UserService, { LoginForm } from "../../services/users-service";
import "../../app.css";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const logIn = (dataForm: FieldValues) => {
    const body: LoginForm = {
      username: dataForm.email,
      password: dataForm.password,
    };

    const { request, cancel } = UserService.loginUser(body);
    request.then((data) => {
      localStorage.setItem("session_token", JSON.stringify(data.data));
      navigate("../../items");
    });
    request.catch((err) => setErrorMessage(err.response.data.detail));
    return () => cancel();
  };
  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="submit__form">
        <form
          className="mt-1 mb-5 f-grid"
          // TODO: Check the data is valid
          onSubmit={handleSubmit((data) => logIn(data))}
        >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Log in
          </button>
          <Link to="../register" className="btn" type="submit">
            Create account
          </Link>
        </form>
        {errorMessage && (
          <p className="form-text text-danger mb-0">{errorMessage + "."}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
