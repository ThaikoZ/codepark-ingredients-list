import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import UserService, { RegisterForm } from "../../services/users-service";
import "../../app.css";

const password_msg =
  "Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.";

const schema = z.object({
  first_name: z
    .string({ invalid_type_error: "Your name should have only letters" })
    .min(1, { message: "This field cannot be empty." })
    .max(150),
  last_name: z
    .string()
    .min(1, { message: "This field cannot be empty." })
    .max(150),
  email: z
    .string({ invalid_type_error: "Email is required." })
    .email({ message: "This is not a valid address email." })
    .min(5)
    .max(45),
  password: z
    .string()
    .min(8, { message: password_msg })
    .max(20, { message: password_msg })
    .refine((value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*$/.test(value), {
      message: password_msg,
    })
    .refine((value) => !/\s/.test(value), {
      message: password_msg,
    })
    .refine((value) => !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value), {
      message: password_msg,
    })
    .refine((value) => !/[^\x00-\x7F]+/.test(value), {
      message: password_msg,
    }),
  termsAndConditions: z.boolean().refine((value) => value === true, {
    message: "This field is required.",
  }),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [errorMessage, setErrorMessage] = useState("");

  const createNewAccount = (formData: FormData) => {
    const body: RegisterForm = {
      full_name: formData.first_name + " " + formData.last_name,
      email: formData.email,
      password: formData.password,
    };

    const { request, cancel } = UserService.registerUser(body);
    request.then(() => navigate("../login"));
    request.catch((err) => setErrorMessage(err.response.data.detail));
    return () => cancel();
  };

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="submit__form">
        <form
          className="mt-1 mb-5 f-grid"
          // TODO: Register a new account in our database
          onSubmit={handleSubmit((formData) => createNewAccount(formData))}
        >
          <div className="d-flex justify-content-between row g-4">
            <div className="mb-3 col-6">
              <label htmlFor="first_name" className="form-label">
                First name
              </label>
              <input
                {...register("first_name")}
                id="first_name"
                type="text"
                className={`form-control ${errors.first_name && "is-invalid"}`}
              />
              {errors.first_name && (
                <p className="form-text text-danger mb-1">
                  {errors.first_name.message}
                </p>
              )}
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="last_name" className="form-label">
                Last name
              </label>
              <input
                {...register("last_name")}
                id="last_name"
                type="text"
                className={`form-control ${errors.last_name && "is-invalid"}`}
              />
              {errors.last_name && (
                <p className="form-text text-danger mb-0">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              type="text"
              className={`form-control ${errors.email && "is-invalid"}`}
            />
            {errors.email && (
              <p className="form-text text-danger mb-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              className={`form-control ${errors.password && "is-invalid"}`}
            />
            {errors.password && (
              <p className="form-text text-danger mb-0">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-3 form-check">
            <input
              {...register("termsAndConditions")}
              className={`form-check-input ${
                errors.termsAndConditions && "is-invalid"
              }`}
              type="checkbox"
              value=""
              id="termsAndConditions"
            />
            <label className="form-check-label" htmlFor="termsAndConditions">
              I have read and agree to the Privacy Policy.
            </label>
            {errors.termsAndConditions && (
              <p className="form-text text-danger mb-0">
                {errors.termsAndConditions.message}
              </p>
            )}
          </div>
          <button className="btn btn-primary" type="submit">
            Create new account
          </button>
          <Link to="../login" className="btn" type="submit">
            Back to login
          </Link>
        </form>
        {errorMessage && (
          <p className="form-text text-danger mb-0">{errorMessage + "."}</p>
        )}
      </div>
    </div>
  );
};

export default Register;
