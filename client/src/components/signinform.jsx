import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmarkCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setfalse } from "../redux/signinslice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { authcontext } from "../context/authcontext";

// eslint-disable-next-line react/prop-types
const Signinform = () => {
  const { getauthbool } = useContext(authcontext);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const [issee, setissee] = useState(false);
  const [responsesignin, setresponsesignin] = useState("");
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/signin",
        formdata
      );
      console.log("sign in", response);
      setresponsesignin(response.data.message);
      getauthbool();
      if (response.status === 200) {
        navigateTo("/profile");
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };
  return (
    <>
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
        <p className=" text-white capitalize text-center text-lg ">
          {responsesignin}
        </p>
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
            sign in
          </button>
        </form>
      </div>
    </>
  );
};

export default Signinform;
