"use client";
import { React, useState } from "react";
import { useSignIn } from "@/Contex/SignIncontex";
import { useFormik } from "formik";
import { Bounce, toast } from "react-toastify";

const myUrl = "https://68875657071f195ca9804edb.mockapi.io/users";

const create = (values) => {
  fetch(myUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(values),
  }).then((res) => {
    if (res.ok) {
      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return res.json();
    }
  });
};

export default function SignUp() {
  const { signInControl, signIn } = useSignIn();
  const [eye, setEye] = useState(true);

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!/[a-z]/.test(values.password)) {
      errors.password =
        "Password must contain at least one lowercase letter [a-z]";
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password =
        "Password must contain at least one uppercase letter [A-Z]";
    } else if (!/[0-9]/.test(values.password)) {
      errors.password = "Password must contain at least one number [0-9]";
    } else if (!/[^a-zA-Z0-9]/.test(values.password)) {
      errors.password =
        "Password must contain at least one special character [!,@,#,$,%,...]";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      const url = new URL(myUrl);
      url.searchParams.append("email", values.email);

      fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((tasks) => {
          if (!tasks) {
            create(values);
          } else {
            if (!tasks.length) {
              create(values);
            } else {
              toast.error("Email already exists", {
                position: "top-right",
                autoClose: 3003,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
            }
          }
        });
    },
  });

  return (
    <div
      className={`absolute left-full top-0 origin-left rotate-y-180 ${
        signIn ? "hidden" : "flex"
      } px-3`}>
      <h2 className="text-5xl font-bold w-full">Sign Up</h2>
      <form onSubmit={formik.handleSubmit} className="w-full">
        <input
          className="hover:bg-[#0000004f] focus:border-black duration-500 rounded-2xl outline-0 w-full border-2 border-[#ffffff4f] p-3 flex justify-start"
          placeholder="Name"
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
        ) : null}

        <input
          className="hover:bg-[#0000004f] focus:border-black duration-500 rounded-2xl outline-0 w-full border-2 border-[#ffffff4f] p-3 flex justify-start mt-4"
          placeholder="Email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
        ) : null}

        <div className="w-full relative mt-4">
          <input
            className="hover:bg-[#0000004f] focus:border-black duration-500 outline-0 w-full rounded-2xl border-2 border-[#ffffff4f] p-3 flex justify-start"
            placeholder="Password"
            type={eye ? "password" : "text"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <i
            className={`${eye ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}
                 absolute duration-500 hover:text-black right-3 cursor-pointer top-1/2 -translate-y-1/2 text-2xl text-amber-50 z-50`}
            onClick={() => {
              setEye(!eye);
            }}></i>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.password}
          </div>
        ) : null}

        <div className="w-full mt-4">
          <button
            type="submit"
            className="w-35 p-4 text-center border-4 border-[#ffffff73] rounded-2xl mx-auto block hover:border-black duration-500 cursor-pointer hover:text-black text-white">
            Sign Up
          </button>
        </div>
      </form>

      <p className="w-full text-center mt-4">
        Already have an account?{" "}
        <span
          onClick={signInControl}
          className="underline cursor-pointer duration-500 hover:text-black">
          Sign In
        </span>
      </p>
    </div>
  );
}
