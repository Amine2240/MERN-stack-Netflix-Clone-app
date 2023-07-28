import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsDown,
  faThumbsUp,
  faXmark,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import Netflix from "./netflix";
import axios from "axios";
const Searchcomp = () => {
  const value = useSelector((state) => state.inputvalue.value);
  const [searchedmovie, setsearchedmovie] = useState([]);
  const [movies, setmovies] = useState([]);
  const [tvshows, settvshows] = useState([]);
  // const issearch = useSelector((state) => state.issearch.value);
  const [genrepurpose, setgenrepurpose] = useState([]);
  const [videotable, setvideotable] = useState([]);
  const [trailerkey, settrailerkey] = useState("");
  const [isvideo, setisvideo] = useState(false);
  const [videolink, setvideolink] = useState("");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODczMGU3MDNjNDMxNTBhZGFjNDNmNGJlZWVjZGQ3OSIsInN1YiI6IjY0YjE5MGJhMjUzZmFiMGM4MmViMDg2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BHSxIxctTDmUUFEyAPX8WvsvdJICusAA8YRwY0o1do0",
    },
  };

  const fetchsearchmovie = () => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${value}`, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setmovies(data.results);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`https://api.themoviedb.org/3/search/tv?query=${value}`, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        settvshows(data.results);
      })
      .catch((err) => {
        console.log(err);
      });

    const tmpentier = Math.max(movies.length, tvshows.length);
    setsearchedmovie(movies.length === tmpentier ? movies : tvshows);
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

  const addopinion = () => {
    const tmparray = searchedmovie.map((item) => {
      return {
        ...item,
        isgreen: false,
        isgreennum: 0,
        isred: !item.isgreen,
        islist: false,
      };
    });
    setsearchedmovie(tmparray);
  };

  const opiniononclick1 = (element) => {
    const tmparray = searchedmovie.map((item) => {
      if (element === item) {
        return { ...element, isgreen: !item.isgreen, isgreennum: 1 };
      } else {
        return item;
      }
    });
    setsearchedmovie(tmparray);
  };

  const opiniononclick2 = (element) => {
    const tmparray = searchedmovie.map((item) => {
      if (element === item) {
        return { ...element, isred: !item.isred, isgreennum: 2 };
      } else {
        return item;
      }
    });
    setsearchedmovie(tmparray);
  };
  const likedmovie = (element, table, settable) => {
    const tmparray = table.map((item) => {
      if (element === item) {
        return { ...element, islist: !item.islist };
      } else {
        return item;
      }
    });
    settable(tmparray);
  };

  useEffect(() => {
    fetchmoviegenres();
    addopinion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchsearchmovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  const handleButtonClick = (event) => {
    // Prevent the event from propagating to the div's click event
    event.stopPropagation();
    //credit to chat gpt
  };
  const [moviedata, setmoviedata] = useState({
    image: "",
    title: "",
    vote: 0,
    genre_ids: [],
  });
  const updatemoviedata = async (item) => {
    await setmoviedata({
      ...moviedata,
      image: item.poster_path,
      title: item.original_title,
      vote: item.vote_average,
      genre_ids: item.genre_ids,
      id : item.id,
    });
  };
  const handleSubmit = async (item) => {
    try {
      const response = await axios.post("http://localhost:5000/netflix", item);
      console.log("item added", response.data);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };
  useEffect(() => {
    if (moviedata.image !== "") {
      // This condition checks if `moviedata` has been updated and is not empty
      handleSubmit(moviedata); // Assuming you have `e` defined elsewhere in your component
    }
  }, [moviedata]);

  return (
    <>
      {value != "" && (
        <div className=" bg-black h-[130vh]">
          <div className={`h-fit bg-black pt-20 pl-10 pb-10`}>
            <div className=" h-fit ">
              <p className=" text-4xl font-semibold m-10">
                Results for: {value}{" "}
                <span className="text-sm font-normal ">
                  (click on space in searchsection for results){" "}
                </span>
              </p>
              <div className=" flex flex-wrap gap-5 w-[90%] mx-auto ">
                {searchedmovie.map((item) => {
                  return (
                    <>
                      <div
                        className={`${
                          item?.poster_path === null ? "hidden" : ""
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
                              {movies.length >= tvshows.length
                                ? item?.original_title
                                : item?.original_name}{" "}
                            </p>
                            <p className=" text-yellow-400 font-semibold text-sm ml-1 w-fit">
                              {item?.vote_average}
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
                              icon={faHeart}
                              className={`${
                                item.islist ? "text-red-400 border-red-400" : ""
                              } border rounded-full text-[7px] p-1 transition-all z-20  hover:border-red-400 `}
                              onClick={(e) => {
                                handleButtonClick(e);
                                likedmovie(
                                  item,
                                  searchedmovie,
                                  setsearchedmovie
                                );
                                {
                                  !item.islist && updatemoviedata(item);
                                }
                              }}
                            />
                            <FontAwesomeIcon
                              className={`${
                                item?.isgreen && item.isgreennum === 1
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
                          src={` https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                          alt={
                            searchedmovie === movies
                              ? item?.original_title
                              : item?.original_name
                          }
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
      )}

      {value === "" && <Netflix />}
      {searchedmovie.length === 0 && value != "" && (
        <p className=" absolute -translate-x-1/2 translate-y-1/2 top-1/2 left-1/2 capitalize text-center">
          No results found{" "}
        </p>
      )}
    </>
  );
};

export default Searchcomp;
