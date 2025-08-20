"use client";
import React, { useEffect, useState } from "react";
import { useUpForm } from "@/Contex/UpFormcontex";
import { Bounce, toast } from "react-toastify";
export default function LiTable() {
  const { openForm } = useUpForm();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://68875657071f195ca9804edb.mockapi.io/users")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error();
      })
      .then((users) => {
        setData(users);
      })
      .catch((error) => {});
  }, [data]);

  const del = (id) => {
    fetch(`https://68875657071f195ca9804edb.mockapi.io/users/`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Delet successfully!", {
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
          return res.json();
        }
      })
      .then((task) => {})
      .catch((error) => {});
  };

  return (
    <>
      <li className="flex p-3 pt-5 top-0  *:w-1/5 items-center justify-center *:flex *:items-center *:justify-center  **:text-center">
        <div>
          <p>Name</p>
        </div>
        <div>
          <p>Email</p>
        </div>
        <div>
          <p>Password</p>
        </div>
        <div>
          <p>Id</p>
        </div>
        <div>
          <p>Action</p>
        </div>
      </li>
      {data &&
        data.map((item) => {
          return (
            <li
              key={item.name + item.email}
              className="flex border-t-4 border-amber-50 p-2 *:w-1/5 items-center justify-center *:flex *:items-center *:justify-center  **:text-center">
              <div>
                <p>{item.name}</p>
              </div>
              <div>
                <p>{item.email}</p>
              </div>
              <div>
                <p>{item.password}</p>
              </div>
              <div>
                <p>{item.id}</p>
              </div>
              <div className="flex gap-2 items-center justify-center">
                <i
                  onClick={() => {
                    del(item.id);
                  }}
                  className="bi bi-trash3-fill text-amber-50 cursor-pointer text-3xl hover:text-red-600 duration-150"></i>
                <i
                  onClick={() => {
                    openForm(item);
                  }}
                  className="bi bi-pen-fill text-amber-50 cursor-pointer text-3xl hover:text-amber-500 duration-150"></i>
              </div>
            </li>
          );
        })}
    </>
  );
}
