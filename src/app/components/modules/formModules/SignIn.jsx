"use client";
import { React, useEffect, useState } from "react";
import { useSignIn } from "@/Contex/SignIncontex";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useValid } from "@/Contex/Validcontex";

export default function SignIn() {
  const { validTrue, validFalse } = useValid();
  const { signInControl, signIn } = useSignIn();
  const [eye, setEye] = useState(true);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    validFalse();
  }, []);
  const tostErr = () => {
    return toast.error("password or email incorrect", {
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
  };

  const tostSuc = (name) => {
    return toast.success(`Welcome ${name} `, {
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
  };
  const check = () => {
    const url = new URL("https://68875657071f195ca9804edb.mockapi.io/users");
    url.searchParams.append("email", formData.email);
    url.searchParams.append("password", formData.password);

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
          tostErr();
        } else {
          if (!tasks.length) {
            tostErr();
          } else {
            const valid = tasks.findIndex((task) => {
              return (
                task.email == formData.email &&
                task.password == formData.password
              );
            });
            if (valid == -1) {
              tostErr();
            } else {
              validTrue();

              tostSuc(tasks[valid].name);
              router.push("/panel");
            }
          }
        }
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setFormData((prev) => ({ ...prev, email: value }));
        break;
      case "password":
        setFormData((prev) => ({ ...prev, password: value }));
        break;
      default:
        break;
    }
  };
  return (
    <div className={`px-3 ${signIn ? "flex" : "hidden"}`}>
      <h2 className="text-5xl font-bold w-full">Sign In</h2>

      <input
        className="hover:bg-[#0000004f] focus:border-black duration-500 rounded-2xl outline-0 w-full border-2 border-[#ffffff4f] p-3 flex justify-start"
        placeholder="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <div className="w-full relative">
        <input
          className="hover:bg-[#0000004f] focus:border-black duration-500 outline-0 w-full rounded-2xl border-2 border-[#ffffff4f] p-3 flex justify-start"
          placeholder="Password"
          type={eye ? "password" : "text"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <i
          className={`${eye ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}
                 absolute duration-500 hover:text-black right-0 cursor-pointer top-1/2 -translate-1/2 text-2xl text-amber-50 z-50`}
          onClick={() => {
            setEye(!eye);
          }}></i>
      </div>
      <div className="w-full">
        <button
          onClick={check}
          className="w-35 p-4 text-center border-4 border-[#ffffff73] rounded-2xl mx-auto block hover:border-black duration-500 cursor-pointer hover:text-black text-white">
          Sign In
        </button>
      </div>
      <p className="w-full text-center">
        Don't have an account?{" "}
        <span
          onClick={signInControl}
          className="underline cursor-pointer duration-500 hover:text-black">
          Sign Up
        </span>
      </p>
    </div>
  );
}
