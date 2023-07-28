/* eslint-disable react/prop-types */
import "./netflix.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setvideogenre } from "../redux/videogenre";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faXmark,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";


// eslint-disable-next-line react/prop-types
const Toprated = ({
  likedmovie,
  topratedtable,
  settopratedtable,
  genrepurpose,
  fetchvideo,
  opiniononclick1,
  opiniononclick2,
  handleButtonClick,
  setisvideo,
  isvideo,
  videolink,
  addopinion,
  handleSubmit
}) => {
  useEffect(() => {
    addopinion(topratedtable, settopratedtable);
  }, []);
  const videogenre = useSelector((state) => state.videogenre.value);
  const dispatch = useDispatch();
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
  useEffect(() => {
    if (moviedata.image !== "") {
      // This condition checks if `moviedata` has been updated and is not empty
      handleSubmit(moviedata); // Assuming you have `e` defined elsewhere in your component
    }
  }, [moviedata]);
  return (
    <>
      <p className=" text-3xl font-semibold capitalize m-3">top rated</p>

      <div className="overflow-x-scroll tmporigin">
        <div className=" p-3 flex gap-3 originals w-fit ml-5 overflow-y-hidden">
          {
            // eslint-disable-next-line react/prop-types
            topratedtable.map((item) => {
              return (
                <>
                  <div
                    className=" bg-gradient-to-t from-orange-500 to-transparent rounded-sm z-0 underoriginals hover:scale-[1.7] transition-all hover:mx-12 relative group"
                    onClick={() => {
                      fetchvideo(item.id);
                      console.log("hi there");
                      dispatch(setvideogenre("toprated"));
                    }}
                  >
                    {" "}
                    <div className=" w-full bg-gradient-to-t from-black to-transparent absolute hidden bottom-2 h-[150px]  group-hover:flex place-content-between items-end z-10  cursor-pointer ">
                      <div className=" z-20">
                        <p className=" text-[10px] ml-1 font-bold ">
                          {item?.original_title}{" "}
                        </p>
                        <p className=" text-yellow-400 font-semibold text-sm ml-1 w-fit">
                          {item?.vote_average}
                        </p>

                        <div className=" flex">
                          {
                            // eslint-disable-next-line react/prop-types
                            genrepurpose.map((element) => {
                              if (element.id === item?.genre_ids[0]) {
                                return (
                                  <>
                                    <p className=" text-[6.95px] mb-2 mx-1">
                                      {element.name}{" "}
                                    </p>
                                  </>
                                );
                              }
                            })
                          }
                          {
                            // eslint-disable-next-line react/prop-types
                            genrepurpose.map((element) => {
                              if (element.id === item?.genre_ids[1]) {
                                return (
                                  <>
                                    <p className=" text-[6.95px] mb-2 mx-1">
                                      {element.name}{" "}
                                    </p>
                                  </>
                                );
                              }
                            })
                          }
                          {
                            // eslint-disable-next-line react/prop-types
                            genrepurpose.map((element) => {
                              if (element.id === item?.genre_ids[2]) {
                                return (
                                  <>
                                    <p className=" text-[6.95px] mb-2 mx-1">
                                      {element.name}{" "}
                                    </p>
                                  </>
                                );
                              }
                            })
                          }
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
                            likedmovie(item, topratedtable, settopratedtable);
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
                            opiniononclick1(
                              item,
                              topratedtable,
                              settopratedtable
                            );
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
                            opiniononclick2(
                              item,
                              topratedtable,
                              settopratedtable
                            );
                            handleButtonClick(e);
                          }}
                        />
                      </div>
                    </div>
                    <img
                      src={` https://image.tmdb.org/t/p/w500${item?.poster_path}`}
                      alt=""
                      className=" cursor-pointer w-full z-0 "
                    />
                  </div>
                </>
              );
            })
          }
        </div>
      </div>
      {isvideo && videogenre === "toprated" && (
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
    </>
  );
};

export default Toprated;
