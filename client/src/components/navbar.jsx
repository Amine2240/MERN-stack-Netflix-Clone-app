import { useSelector, useDispatch } from "react-redux";
import { settrue } from "../redux/signinslice";
import "../App.css";
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { setinputvalue } from "../redux/inputvalueslice";
import { Link, useNavigate } from "react-router-dom";
import { setsearchtrue } from "../redux/searchslice";
import { authcontext } from "../context/authcontext";
import axios from "axios";

const Navbar = () => {
  const navgateTo = useNavigate();

  const { boolauth, getauthbool } = useContext(authcontext);
  const value = useSelector((state) => state.inputvalue.value);
  // const issignin = useSelector((state) => state.issignin.value);
  const dispatch = useDispatch();
  const [scrollY, setScrollY] = useState(0);
  const [issearch, setissearch] = useState(false);
  // const [!issearchtmp, setissearchtmp] = useState(false);
  // const [tmp, settmp] = useState(0);

  const handlescroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handlescroll);
  }, []);

  const logoutfunction = async () => {
    try {
      const response = await axios.post("http://localhost:5000/logout");
      console.log("logout response", response);
      getauthbool();
      navgateTo("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log("booolauth", boolauth);
  return (
    <>
      <nav
        className={` w-full h-[9vh] ${
          scrollY < 150 ? "bg-transparent" : "bg-black"
        } flex flex-row place-content-between items-center px-5 z-20  top-0 fixed transition-all `}
      >
        <Link to="/netflix">
          <p className=" uppercase text-red-500 text-3xl font-bold z-10 cursor-pointer">
            netflix
          </p>
        </Link>
        {!boolauth && (
          <button
            className=" text-white border-2 border-transparent bg-red-500 px-3 h-9 font-medium rounded-sm capitalize z-10"
            onClick={() => {
              dispatch(settrue());
            }}
          >
            sign in{" "}
          </button>
        )}
        {boolauth && (
          <div className=" flex">
            <>
              <Link to="mylist">
                <p className=" text-xl font-semibold mr-5 hover:text-red-500 transition-all capitalize cursor-pointer">
                  my list
                </p>
              </Link>
              <div className=" relative w-fit ">
                <input
                  type="text"
                  className={`${
                    issearch
                      ? " w-60 rounded-sm"
                      : "w-4 cursor-pointer rounded-sm bg-transparent hover:border-red-500 transition-all  "
                  } border-2 bg-black  h-9 mr-3 pl-8 transition-all placeholder:text-[14px]`}
                  placeholder="Movies, TV shows..."
                  onChange={(event) => {
                    dispatch(setinputvalue(event.target.value));
                  }}
                  value={value}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className={` ${
                    !issearch ? " block" : "hidden"
                  } text-xl absolute top-[8px] left-[8px] cursor-pointer hover:text-red-500 transition-all`}
                  onClick={() => {
                    setissearch(true);
                  }}
                />
                <Link to="/searchpage">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className={` ${
                      !issearch ? " hidden" : "block"
                    } text-xl absolute top-[8px] left-[8px] cursor-pointer`}
                    onClick={() => {
                      setissearch(true);
                      dispatch(setsearchtrue());
                    }}
                  />
                </Link>
                <FontAwesomeIcon
                  icon={faXmark}
                  className={` ${
                    !issearch ? " hidden" : "block"
                  } absolute right-5 text-xl top-[7px] cursor-pointer`}
                  onClick={() => {
                    setissearch(false);
                  }}
                />
              </div>
            </>

            <button
              className=" text-white border-2 border-transparent bg-red-500 px-3 h-9 font-medium rounded-sm capitalize z-10"
              onClick={() => {
                getauthbool();
                logoutfunction();
              }}
            >
              log out{" "}
            </button>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
