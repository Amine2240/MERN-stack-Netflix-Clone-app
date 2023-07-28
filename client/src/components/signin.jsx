import "../App.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmarkCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setfalse } from "../redux/signinslice";
import axios from "axios";

const Signin = () => {
  const issignin = useSelector((state) => state.issignin.value);
  const dispatch = useDispatch();
  const [issee, setissee] = useState(false);
  const [emailvalue, setemailvalue] = useState("");
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000", formdata);
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <>
      <div
        className={`contain h-[100vh] w-full brightness-[0.65] ${
          issignin ? "forfilter" : ""
        }`}
      >
        <div className="h-[90vh] flex place-content-center items-center z-20 ">
          {!issignin && (
            <div className=" text-center z-20 ">
              <p className=" text-4xl text-white font-bold capitalize m-3 z-20">
                unlimited films, TV programmes and more.
              </p>
              <p className=" text-3xl text-white font-medium m-2">
                watch anywhere. Cancel at any time.
              </p>
              <p className=" text-white text-xl mb-5">
                ready to watch? enter your email to create or restart your
                memebership.{" "}
              </p>
              <form>
                <input
                  type="email"
                  placeholder="email adress..."
                  className=" h-10  pl-2 mr-2 rounded-sm outline-none  text-black"
                  value={emailvalue}
                  onChange={(event) => {
                    setemailvalue(event.target.value);
                  }}
                />
                <Link
                  to={
                    emailvalue != "" &&
                    emailvalue.includes("@gmail.com") &&
                    `/netflix`
                  }
                >
                  <button
                    type="submit"
                    className="text-white border-2 border-transparent bg-red-500 px-4 py-1 h-10 font-medium rounded-sm uppercase"
                  >
                    log in
                  </button>
                </Link>
              </form>
            </div>
          )}
          {issignin && (
            <div
              className={`h-96 w-96 bg-black rounded-lg opacity-100 flex flex-col place-content-evenly p-10 signin
               relative`}
            >
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className=" absolute top-5 right-5 text-white text-2xl cursor-pointer"
                onClick={() => {
                  dispatch(setfalse());
                }}
              />
              <p className=" text-white font-semibold capitalize text-start text-2xl ">
                sign in{" "}
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

                <button
                  type="submit"
                  className=" text-white font-semibold capitalize bg-red-500 w-[300px] mx-auto rounded-md h-10 text-lg"
                >
                  <Link to="/profile">sign in </Link>
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
          )}
        </div>
      </div>
    </>
  );
};

export default Signin;
