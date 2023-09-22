import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
import {
  faXmarkCircle,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { authcontext } from "../context/authcontext";

// eslint-disable-next-line react/prop-types
const Login = ({ togglelogin }) => {
  const { getauthbool } = useContext(authcontext);
  const navigateTo = useNavigate();
  const [issee, setissee] = useState(false);
  const [responselogin, setresponselogin] = useState("");

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formdata
      );
      console.log(response);
      setresponselogin(response.data.message);
      getauthbool();
      if (response.status === 200) {
        navigateTo("/profile");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <>
      <div
        className={`h-96 w-96 bg-black rounded-lg opacity-100 flex flex-col place-content-evenly p-10 signin
               absolute z-20`}
      >
        <FontAwesomeIcon
          icon={faXmarkCircle}
          className=" absolute top-5 right-5 text-white text-2xl cursor-pointer"
          onClick={togglelogin}
        />
        <p className=" text-white capitalize text-center text-lg ">
          {responselogin}
        </p>
        <p className=" text-white font-semibold capitalize text-start text-2xl ">
          log in{" "}
        </p>
        <form
          className=" w-full h-72 flex flex-col place-content-evenly "
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="email adress.."
            className=" h-10 rounded-sm pl-2 text-black"
            name="email"
            onChange={(e) => {
              setformdata({ ...formdata, email: e.target.value });
            }} 
          />
          <div className=" w-full relative">
            {issee && (
              <FontAwesomeIcon
                icon={faEye}
                className=" absolute right-2 text-black top-3 cursor-pointer"
                onClick={() => {
                  setissee(!issee);
                }}
              />
            )}
            {!issee && (
              <FontAwesomeIcon
                icon={faEyeSlash}
                className=" absolute right-2 text-black top-3 cursor-pointer"
                onClick={() => {
                  setissee(!issee);
                }}
              />
            )}
            <input
              type={issee ? "text" : "password"}
              className=" h-10 rounded-sm pl-2 text-black w-full"
              placeholder="password"
              name="password"
              onChange={(e) => {
                setformdata({ ...formdata, password: e.target.value });
              }}
            />
          </div>
          <input
            type="password"
            className=" h-10 rounded-sm pl-2 text-black w-full"
            placeholder="confirm password"
            name="password"
            onChange={(e) => {
              setformdata({ ...formdata, confirmpassword: e.target.value });
            }}
          />

          <button
            type="submit"
            className=" text-white font-semibold capitalize bg-red-500 w-[300px] mx-auto rounded-md h-10 text-lg"
          >
            log in
          </button>

          <p className=" text-gray-500 capitalize">
            new to netflix ?{" "}
            <span className=" text-white font-semibold capitalize">
              {" "}
              sign up now.
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
