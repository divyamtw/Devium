import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../services/auth.api";
import { clearError } from "../auth.slice";
import useZodForm from "../../../shared/hooks/useZodForm";
import { registerSchema } from "../../../shared/validations/schemas";
import { useNavigate, Link } from 'react-router-dom';
import Loader from "../../../shared/components/Loader";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useZodForm(registerSchema, { username: "", email: "", password: "" });

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/"); // redirect on login
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        return () => { dispatch(clearError()); };
    }, [dispatch]);

    const submitHandler = handleSubmit(async (data) => {
        const result = await dispatch(registerUser(data));
        if (registerUser.fulfilled.match(result)) {
            navigate("/login");
        }
    });

    return (
        <div
            className="max-w-md w-full bg-card text-card-foreground border border-border rounded-2xl px-6 py-5 flex flex-col items-center gap-y-2 shadow-lg relative">

            <div className="flex flex-col items-center gap-y-0.5 mb-1">
                <h1 className="text-4xl font-extrabold tracking-tight">Devium</h1>
                <span className="text-[10px] font-medium tracking-widest uppercase text-muted-foreground select-none">
                    Build, Connect, Create
                </span>
            </div>

            <h2 className="text-2xl font-semibold">Welcome</h2>

            <p className="text-sm text-muted-foreground text-center">
                Create Account
            </p>

            <form
                className="flex flex-col w-full gap-y-2 mt-2"
                onSubmit={submitHandler}>

                <input
                    {...register("username")}
                    type="text"
                    placeholder="Username"
                    className="w-full bg-input text-foreground border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {errors.username && (
                    <p className="text-sm text-destructive px-1">{errors.username.message}</p>
                )}

                <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className="w-full bg-input text-foreground border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {errors.email && (
                    <p className="text-sm text-destructive px-1">{errors.email.message}</p>
                )}

                <input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    className="w-full bg-input text-foreground border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {errors.password && (
                    <p className="text-sm text-destructive px-1">{errors.password.message}</p>
                )}

                {error && (
                    <p className="text-sm text-destructive text-center">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-primary-foreground rounded-xl py-2 mt-1 font-medium text-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
                >
                    {isLoading ? <Loader size="sm" className="border-t-primary-foreground border-primary-foreground/20" /> : "Sign Up"}
                </button>

            </form>

            <Link
                to="/login"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
                Already have an account? Sign in
            </Link>
        </div>
    );

};

export default Signup;