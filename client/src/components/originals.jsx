/* eslint-disable react/prop-types */
import "./netflix.css";
import { setvideogenre } from "../redux/videogenre";
import { useSelector, useDispatch } from "react-redux";
// import { additem, removeitem } from "../redux/mylistslice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faThumbsDown,
  faThumbsUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

// import {
//   likedmovieclone,
//   opinionclick1clone,
//   opinionclick2clone,
// } from "../redux/likedislikeslice";

// eslint-disable-next-line react/prop-types
const Originals = ({
  likedmovie,
  infotable,
  setinfotable,
  addopinion,
  fetchvideo,
  genrepurpose,
  opiniononclick1,
  opiniononclick2,
  handleButtonClick,
  videolink,
  isvideo,
  setisvideo,
  handleSubmit
}) => {
  useEffect(() => {
    addopinion(infotable, setinfotable);
  }, []);

  const videogenre = useSelector((state) => state.videogenre.value);
  // const mylistarray = useSelector((state) => state.mylistarray.value);
  // const likedsavedobj = useSelector((state) => state.likedsavedslice.value);
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
      <p className=" text-3xl font-semibold capitalize m-3 z-10">
        netflix originals
      </p>

      <div className="overflow-x-scroll tmporigin">
        <div className=" p-3 flex gap-3 originals w-fit ml-5 overflow-y-hidden">
          {
            // eslint-disable-next-line react/prop-types
            infotable.map((item) => {
              return (
                <>
                  <div
                    className="  bg-gradient-to-t from-orange-500 to-transparent rounded-sm z-0 underoriginals hover:scale-[1.7] transition-all hover:mx-12 relative group"
                    onClick={() => {
                      fetchvideo(item.id);
                      console.log("hi there");
                      dispatch(setvideogenre("originals"));
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
                            item?.islist ? "text-red-400 border-red-400" : ""
                          } border rounded-full text-[7px] p-1 transition-all z-20  hover:border-red-400 `}
                          onClick={(e) => {
                            handleButtonClick(e);

                            likedmovie(item, infotable, setinfotable);
                            console.log(moviedata);

                            // dispatch(likedmovieclone(item));
                            {
                              !item.islist && updatemoviedata(item);
                            }
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
                            opiniononclick1(item, infotable, setinfotable);
                            handleButtonClick(e);
                            // dispatch(opinionclick1clone(item));
                          }}
                        />
                        <FontAwesomeIcon
                          className={`${
                            item?.isred && item?.isgreennum === 2
                              ? " text-red-500 border-red-500"
                              : "bg-transparent"
                          } border rounded-full text-[7px] p-1 transition-all z-20 hover:text-red-500 hover:border-red-500`}
                          icon={faThumbsDown}
                          onClick={(e) => {
                            opiniononclick2(item, infotable, setinfotable);
                            handleButtonClick(e);
                            // dispatch(opinionclick2clone(item));
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
      {isvideo && videogenre === "originals" && (
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

export default Originals;
