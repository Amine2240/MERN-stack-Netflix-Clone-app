import "./netflix.css";
import { removeitem, setmylistarray } from "../redux/mylistslice";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faMinus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

const Mylist = () => {
  // const issearch = useSelector((state) => state.issearch.value);
  const [genrepurpose, setgenrepurpose] = useState([]);
  const [videotable, setvideotable] = useState([]);
  const [trailerkey, settrailerkey] = useState("");
  const [isvideo, setisvideo] = useState(false);
  const [videolink, setvideolink] = useState("");
  const [moviesfromdb, setmoviesfromdb] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODczMGU3MDNjNDMxNTBhZGFjNDNmNGJlZWVjZGQ3OSIsInN1YiI6IjY0YjE5MGJhMjUzZmFiMGM4MmViMDg2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BHSxIxctTDmUUFEyAPX8WvsvdJICusAA8YRwY0o1do0",
    },
  };

  const fetchmoviegenres = () => {
    // const API_KEY = 'api_key=28730e703c43150adac43f4beeecdd79'

    fetch(`https://api.themoviedb.org/3/genre/movie/list`, options)
      .then((response) => response.json())
      .then((data) => {
        setgenrepurpose(data.genres);
      })
      .catch((err) => console.error(err));
  };

  const fetchvideo = (id) => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
      .then((response) => response.json())
      .then((data) => {
        setvideotable(data.results);
      })
      .catch((err) => console.error(err));

    const trailer = videotable.find((element) => element.type === "Trailer");
    settrailerkey(trailer?.key);
    setisvideo(true);
    setvideolink(`https://www.youtube.com/embed/${trailerkey}`);
  };

  const mylistarray = useSelector((state) => state.mylistarray.value);

  const addopinion = () => {
    const tmparray = mylistarray.map((item) => {
      return {
        ...item,
        isgreen: false,
        isgreennum: 0,
        isred: !item?.isgreen,
        islist: false,
      };
    });
    dispatch(setmylistarray(tmparray));
  };

  const opiniononclick1 = (element) => {
    const tmparray = mylistarray.map((item) => {
      if (element === item) {
        return { ...element, isgreen: !item.isgreen, isgreennum: 1 };
      } else {
        return item;
      }
    });
    dispatch(setmylistarray(tmparray));
  };

  const opiniononclick2 = (element) => {
    const tmparray = mylistarray.map((item) => {
      if (element === item) {
        return { ...element, isred: !item.isred, isgreennum: 2 };
      } else {
        return item;
      }
    });
    dispatch(setmylistarray(tmparray));
  };
  useEffect(() => {
    fetchmoviegenres();
    addopinion();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleButtonClick = (event) => {
    // Prevent the event from propagating to the div's click event
    event.stopPropagation();
    //credit to chat gpt
  };

  const dispatch = useDispatch();
  localStorage.setItem("arraylist", JSON.stringify(mylistarray));

  const handledelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/netflix/${id}`
      );
      setmoviesfromdb(moviesfromdb.filter((item) => item._id !== id));
      console.log("item deleted", response.data);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  const handledatafromdb = async () => {
    try {
      const response = await axios.get("http://localhost:5000/netflix");
      const movies = response.data;
      console.log("movies fetched from db", movies);
      setmoviesfromdb(movies);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handledatafromdb();
  }, []);

  return (
    <div className=" h-[100vh] bg-black">
      <div className=" bg-black ">
        <div className=" bg-black p-24">
          <p className=" text-4xl font-semibold capitalize">my list: </p>
          <div className=" flex flex-wrap gap-4 w-[95%] mx-auto mt-10">
            {moviesfromdb.length === 0 && (
              <p className=" absolute -translate-x-1/2 translate-y-1/2 top-1/2 left-1/2 capitalize text-center">
                there is no element, Click on heart button to add movies or TV
                shows on your list.{" "}
              </p>
            )}
            {moviesfromdb.length != 0 &&
              moviesfromdb.map((item) => {
                return (
                  <>
                    <div
                      className={`${
                        item?.image === null ? "hidden" : ""
                      } cursor-pointer mb-12 bg-gradient-to-t from-orange-500 to-transparent rounded-sm z-0 underoriginals hover:scale-[1.5] hover:z-20 transition-all hover:mx-12 relative group`}
                      onClick={() => {
                        fetchvideo(item.id);
                        console.log("hi there");
                      }}
                    >
                      {" "}
                      <div className=" w-full bg-gradient-to-t from-black to-transparent absolute hidden bottom-[-45px] h-[150px]  group-hover:flex place-content-between items-end z-20  cursor-pointer ">
                        <div className=" z-20 ">
                          <p className=" text-[10px] ml-1 font-bold ">
                            {
                              /* {movies.length >= tvshows.length
                                ? item?.original_title
                                : item?.original_name}{" "} */
                              item?.title || item?.original_name
                            }
                          </p>
                          <p className=" text-yellow-400 font-semibold text-sm ml-1 w-fit">
                            {item?.vote}
                          </p>

                          <div className=" flex">
                            {genrepurpose.map((element) => {
                              if (element.id === item?.genre_ids[0]) {
                                return (
                                  <>
                                    <p className=" text-[6.95px] mb-2 mx-1">
                                      {element.name}{" "}
                                    </p>
                                  </>
                                );
                              }
                            })}
                            {genrepurpose.map((element) => {
                              if (element.id === item?.genre_ids[1]) {
                                return (
                                  <>
                                    <p className=" text-[6.95px] mb-2 mx-1">
                                      {element.name}{" "}
                                    </p>
                                  </>
                                );
                              }
                            })}
                            {genrepurpose.map((element) => {
                              if (element.id === item?.genre_ids[2]) {
                                return (
                                  <>
                                    <p className=" text-[6.95px] mb-2 mx-1">
                                      {element.name}{" "}
                                    </p>
                                  </>
                                );
                              }
                            })}
                          </div>
                        </div>

                        <div className=" flex flex-col h-14 place-content-around mb-3 mr-2 z-30">
                          <FontAwesomeIcon
                            icon={faMinus}
                            className={`${
                              item?.islist ? "text-red-400 border-red-400" : ""
                            } border rounded-full text-[7px] p-1 transition-all z-20  hover:border-red-400 `}
                            onClick={(e) => {
                              handleButtonClick(e);
                              dispatch(removeitem(item));
                              handledelete(item._id);
                            }}
                          />
                          <FontAwesomeIcon
                            className={`${
                              item?.isgreen && item?.isgreennum === 1
                                ? "text-green-500 border-green-500"
                                : "bg-transparent"
                            } border rounded-full text-[7px] p-1 transition-all z-20 hover:text-green-500 hover:border-green-500 `}
                            icon={faThumbsUp}
                            onClick={(e) => {
                              opiniononclick1(item);
                              handleButtonClick(e);
                            }}
                          />
                          <FontAwesomeIcon
                            className={`${
                              item?.isred && item.isgreennum === 2
                                ? " text-red-500 border-red-500"
                                : "bg-transparent"
                            } border rounded-full text-[7px] p-1 transition-all z-20 hover:text-red-500 hover:border-red-500`}
                            icon={faThumbsDown}
                            onClick={(e) => {
                              opiniononclick2(item);
                              handleButtonClick(e);
                            }}
                          />
                        </div>
                      </div>
                      <img
                        src={` https://image.tmdb.org/t/p/w500${item?.image}`}
                        alt={item?.original_title}
                        className=" w-full z-0 "
                      />
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        {isvideo && (
          <div className=" relative">
            <FontAwesomeIcon
              icon={faXmark}
              className=" text-white absolute right-10 top-0 text-3xl cursor-pointer"
              onClick={() => {
                setisvideo(false);
              }}
            />
            <iframe
              src={videolink}
              className="  w-[85%] mx-auto kmx h-[70vh] my-7"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mylist;
