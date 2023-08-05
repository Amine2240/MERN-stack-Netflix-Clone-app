import "../App.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import Signinform from "./signinform";
import Login from "./login";

const Signin = () => {
  const issignin = useSelector((state) => state.issignin.value);
  const [islogin, setislogin] = useState(false);

  const togglelogin = () => {
    setislogin(!islogin);
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

              <button
                type="submit"
                className="text-white border-2 border-transparent bg-red-500 px-4 py-1 h-10 font-medium rounded-sm uppercase"
                onClick={togglelogin}
              >
                log in
              </button>
            </div>
          )}
          {issignin && <Signinform />}
          {islogin && <Login togglelogin={togglelogin} />}
        </div>
      </div>
    </>
  );
};

export default Signin;
