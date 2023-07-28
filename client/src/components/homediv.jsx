/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import trailer from "../assets/trailer.mp4";
// import { useDispatch } from "react-redux";
// import { additem } from "../redux/mylistslice";
// import { removeitem } from "../redux/mylistslice";
import { useEffect , useState } from "react";

// eslint-disable-next-line react/prop-types
const Homediv = ({
  particularelement,
  addopinion,
  likedmovie,
  settrendingtable,
  handleSubmit
}) => {
  // const dispatch = useDispatch();
  useEffect(() => {
    addopinion(particularelement, settrendingtable);
  }, []);
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
      <div className=" h-[120vh] w-full flex flex-col place-content-center items-start bande relative top-0">
        <div className="  ">
          <video className="  " autoPlay muted loop>
            <source src={trailer} type="video/mp4" />
          </video>
        </div>
        <div className=" absolute z-10">
          <p className=" font-bold text-5xl capitalize z-10 ml-10">
            business education
          </p>
          <div className=" ml-10 z-10">
            <button
              className=" hover:text-white capitalize w-24 p-1  rounded-sm  m-4 hover:bg-red-700 text-red-700 bg-thisblack transition-all"
              onClick={() => {
                likedmovie(
                  particularelement[3],
                  particularelement,
                  settrendingtable
                );
                // eslint-disable-next-line react/prop-types
                {
                  !particularelement[3].islist &&
                  
                     updatemoviedata(particularelement[3]);
                  
                }
                // eslint-disable-next-line react/prop-types
                
              }}
            >
              <FontAwesomeIcon icon={faAdd} className=" mr-2" />
              my list
            </button>
          </div>
          <p className=" z-10 w-80 ml-10">
            {" "}
            Lorem ipsdm dolor, sit amet consectetur adipisicing elit. Voluptas
            ipsam repellat, aut sunt sequi inventore vel
          </p>
        </div>
      </div>
    </>
  );
};

export default Homediv;
