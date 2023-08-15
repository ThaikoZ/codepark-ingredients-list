import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../app.css";

const Login = () => {
  const { register, handleSubmit } = useForm();

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="submit__form">
        <form
          className="mt-1 mb-5 f-grid"
          // TODO: Check the data is valid
          onSubmit={handleSubmit((data) => console.log(data))}
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
      </div>
    </div>
  );
};

export default Login;
