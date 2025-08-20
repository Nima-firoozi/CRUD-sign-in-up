"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useUpForm } from "@/Contex/UpFormcontex";
import { Bounce, toast } from "react-toastify";
const myUrl = "https://68875657071f195ca9804edb.mockapi.io/users";

const upDate = (values, id) => {
  fetch(`https://68875657071f195ca9804edb.mockapi.io/users/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(values),
  })
    .then((res) => {
      if (res.ok) {
        toast.success("Updated successfully!", {
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
        closeForm();
        return res.json();
      }
    })
    .then((task) => {})
    .catch((error) => {});
};
export default function UpForm() {
  const [eye, setEye] = useState(true);
  const { open, closeForm, dataUp } = useUpForm();
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
      id: "",
    },
    validate,
    onSubmit: (values) => {
      closeForm();

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
            upDate(values, values.id);
          } else {
            if (!tasks.length) {
              upDate(values, values.id);
            } else {
              if (tasks[0].id === values.id) {
                upDate(values, values.id);
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
          }
        });
    },
  });

  useEffect(() => {
    formik.setValues(dataUp);
  }, [dataUp]);

  return (
    <div
      className={`w-[100%] h-[100vh] top-0 flex items-center justify-center backdrop-blur-[5px] z-30 absolute duration-500 ${
        open ? "left-0" : "left-[200%]"
      } `}>
      <div className={`rounded-2xl w-1/2 h-[80%] relative  bg-amber-50   p-4`}>
        <i
          class="bi bi-x-circle-fill absolute right-2 top-2 text-black text-3xl cursor-pointer"
          onClick={closeForm}></i>
        <h2 className="text-center text-black mb-4 text-4xl font-bold">
          UPDATE
        </h2>
        <form
          onSubmit={formik.handleSubmit}
          className="flex justify-center content-center *:w-full gap-2 flex-wrap w-full">
          <input
            className="hover:bg-[#0000004f] focus:border-black duration-500 rounded-2xl outline-0 w-full border-2 border-black text-black p-3 flex justify-start"
            placeholder="Name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </div>
          ) : null}

          <input
            className="hover:bg-[#0000004f] focus:border-black duration-500 rounded-2xl outline-0 w-full border-2 border-black text-black p-3 flex justify-start mt-4"
            placeholder="Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.email}
            </div>
          ) : null}

          <div className="w-full relative mt-4">
            <input
              className="hover:bg-[#0000004f] focus:border-black duration-500 outline-0 w-full rounded-2xl border-2 border-black text-black p-3 flex justify-start"
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
                 absolute duration-500 text-black right-3 cursor-pointer top-1/2 -translate-y-1/2 text-2xl z-50`}
              onClick={() => {
                setEye(!eye);
              }}></i>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          ) : null}
          <p className="text-black pl-3 ">id:</p>
          <input
            className="hover:bg-[#0000004f] focus:border-black duration-500 rounded-2xl outline-0 w-full border-2 border-black text-black p-3 flex justify-start"
            placeholder="id"
            type="text"
            name="id"
            disabled
            value={formik.values.id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <div className="w-full mt-4">
            <button
              type="submit"
              className="w-35 p-4 text-center border-4 border-black text-black rounded-2xl mx-auto block  duration-500 cursor-pointer hover:text-white hover:bg-black">
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
