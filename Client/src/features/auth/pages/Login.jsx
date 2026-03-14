import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../services/auth.api";
import { clearError } from "../auth.slice.js";
import useZodForm from "../../../shared/hooks/useZodForm";
import { loginSchema } from "../../../shared/validations/schemas";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(loginSchema, { email: "", password: "" });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // redirect on login
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const submitHandler = handleSubmit((data) => {
    dispatch(loginUser(data));
  });

  return (
    <div className="max-w-md w-full bg-card text-card-foreground border border-border rounded-2xl px-6 py-5 flex flex-col items-center gap-y-2 shadow-lg">
      <h1 className="text-4xl font-bold tracking-tight">root_</h1>

      <h2 className="text-2xl font-semibold">Welcome back</h2>

      <p className="text-sm text-muted-foreground text-center">
        Enter your credentials to access your dashboard
      </p>

      <form
        className="flex flex-col w-full gap-y-2 mt-2"
        onSubmit={submitHandler}
      >
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full bg-input text-foreground border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {errors.email && (
          <p className="text-sm text-destructive px-1">
            {errors.email.message}
          </p>
        )}

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full bg-input text-foreground border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {errors.password && (
          <p className="text-sm text-destructive px-1">
            {errors.password.message}
          </p>
        )}

        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-primary-foreground rounded-xl py-2 mt-1 font-medium text-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <Link
        to="/Signup"
        className="text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        Don&apos;t have an account? Sign up
      </Link>
    </div>
  );
};

export default Login;
