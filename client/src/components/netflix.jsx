import "./netflix.css";
import { useState, useEffect } from "react";
import Actions from "./actions";
import Comedy from "./comedy";
import Documentaries from "./documentaries";
import Horror from "./horror";
import Originals from "./originals";
import Romance from "./romance";
import Toprated from "./toprated";
import Trending from "./trending";
import Homediv from "./homediv";
import axios from "axios";

const Netflix = () => {
  const [infotable, setinfotable] = useState([]);
  const [videotable, setvideotable] = useState([]);
  const [trailerkey, settrailerkey] = useState("");
  const [isvideo, setisvideo] = useState(false);
  const [videolink, setvideolink] = useState("");
  const [genrepurpose, setgenrepurpose] = useState([]);
  const [trendingtable, settrendingtable] = useState([]);
  const [topratedtable, settopratedtable] = useState([]);
  const [actionstable, setactionstable] = useState([]);
  const [comedytable, setcomedytable] = useState([]);
  const [horrortable, sethorrortable] = useState([]);
  const [adventuretable, setadventuretable] = useState([]);
  const [crimetable, setcrimetable] = useState([]);

  // const likedsavedobj = useSelector((state) => state.likedsavedslice.value);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODczMGU3MDNjNDMxNTBhZGFjNDNmNGJlZWVjZGQ3OSIsInN1YiI6IjY0YjE5MGJhMjUzZmFiMGM4MmViMDg2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BHSxIxctTDmUUFEyAPX8WvsvdJICusAA8YRwY0o1do0",
    },
  };
  const fetchdata = () => {
    // const API_KEY = 'api_key=28730e703c43150adac43f4beeecdd79'
    fetch(`https://api.themoviedb.org/3/discover/movie`, options)
      .then((response) => response.json())
      .then((data) => {
        setinfotable(data.results);
        console.log(infotable);
      })
      .catch((err) => console.error(err));
  };

  const fetchdatatrending = () => {
    // const API_KEY = 'api_key=28730e703c43150adac43f4beeecdd79'
    fetch(`https://api.themoviedb.org/3/trending/movie/day`, options)
      .then((response) => response.json())
      .then((data) => {
        settrendingtable(data.results);
      })
      .catch((err) => console.error(err));
  };
  const fetchdatatoprated = () => {
    fetch("https://api.themoviedb.org/3/movie/top_rated", options)
      .then((response) => response.json())
      .then((data) => {
        settopratedtable(data.results);
      })
      .catch((err) => console.error(err));
  };
  const fetchdataactions = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=28`, options)
      .then((response) => response.json())
      .then((data) => {
        setactionstable(data.results);
      })
      .catch((err) => console.error(err));
  };

  const fetchdatacomedy = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=35`, options)
      .then((response) => response.json())
      .then((data) => {
        setcomedytable(data.results);
        console.log(comedytable);
      })
      .catch((err) => console.error(err));
  };
  const fetchdatahorror = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=27`, options)
      .then((response) => response.json())
      .then((data) => {
        sethorrortable(data.results);
      })
      .catch((err) => console.error(err));
  };

  const fetchdatacrime = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=80`, options)
      .then((response) => response.json())
      .then((data) => {
        setcrimetable(data.results);
      })
      .catch((err) => console.error(err));
  };
  const fetchdataadventure = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=12`, options)
      .then((response) => response.json())
      .then((data) => {
        setadventuretable(data.results);
      })
      .catch((err) => console.error(err));
  };

  const fetchmoviegenres = () => {
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

  const addopinion = (table, settable) => {
    const tmparray = table.map((item) => {
      return {
        ...item,
        isgreen: false,
        isgreennum: 0,
        isred: !item.isgreen,
        islist: false,
      };
    });
    settable(tmparray);
  };

  const likedmovie = (element, table, settable) => {
    const tmparray = table.map((item) => {
      if (element === item) {
        return {
          ...element,
          islist: !item?.islist,
        };
      } else {
        return item;
      }
    });
    settable(tmparray);
  };

  const opiniononclick1 = (element, table, settable) => {
    const tmparray = table.map((item) => {
      if (element === item) {
        return {
          ...element,
          isgreen: !item?.isgreen,
          isgreennum: 1,
        };
      } else {
        return item;
      }
    });
    settable(tmparray);
  };

  const opiniononclick2 = (element, table, settable) => {
    const tmparray = table.map((item) => {
      if (element === item) {
        return {
          ...element,
          isred: !item?.isred,
          isgreennum: 2,
        };
      } else {
        return item;
      }
    });
    settable(tmparray);
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
    fetchdatatrending();
    fetchdata();
    fetchmoviegenres();
    fetchdatatoprated();
    fetchdataactions();
    fetchdatacomedy();
    fetchdatahorror();
    fetchdatacrime();
    fetchdataadventure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButtonClick = (event) => {
    event.stopPropagation();
  };
  return (
    <div className=" h-fit pb-14 bg-black containerscroll">
      <Homediv
        particularelement={trendingtable}
        settrendingtable={settrendingtable}
        addopinion={addopinion}
        likedmovie={likedmovie}
        handleSubmit={handleSubmit}
      />
      <div>
        <Originals
          infotable={infotable}
          genrepurpose={genrepurpose}
          isvideo={isvideo}
          setisvideo={setisvideo}
          fetchvideo={fetchvideo}
          handleButtonClick={handleButtonClick}
          opiniononclick1={opiniononclick1}
          opiniononclick2={opiniononclick2}
          videolink={videolink}
          setinfotable={setinfotable}
          addopinion={addopinion}
          likedmovie={likedmovie}
          handleSubmit={handleSubmit}
        />
        <Trending
          trendingtable={trendingtable}
          genrepurpose={genrepurpose}
          isvideo={isvideo}
          setisvideo={setisvideo}
          fetchvideo={fetchvideo}
          handleButtonClick={handleButtonClick}
          opiniononclick1={opiniononclick1}
          opiniononclick2={opiniononclick2}
          videolink={videolink}
          addopinion={addopinion}
          settrendingtable={settrendingtable}
          likedmovie={likedmovie}
          handleSubmit={handleSubmit}
        />
        <Toprated
          topratedtable={topratedtable}
          genrepurpose={genrepurpose}
          isvideo={isvideo}
          setisvideo={setisvideo}
          fetchvideo={fetchvideo}
          handleButtonClick={handleButtonClick}
          opiniononclick1={opiniononclick1}
          opiniononclick2={opiniononclick2}
          videolink={videolink}
          addopinion={addopinion}
          settopratedtable={settopratedtable}
          likedmovie={likedmovie}
          handleSubmit={handleSubmit}
        />
        <Actions
          actionstable={actionstable}
          genrepurpose={genrepurpose}
          isvideo={isvideo}
          setisvideo={setisvideo}
          fetchvideo={fetchvideo}
          handleButtonClick={handleButtonClick}
          opiniononclick1={opiniononclick1}
          opiniononclick2={opiniononclick2}
          videolink={videolink}
          addopinion={addopinion}
          setactionstable={setactionstable}
          likedmovie={likedmovie}
          handleSubmit={handleSubmit}
        />
        <Comedy
          comedytable={comedytable}
          genrepurpose={genrepurpose}
          isvideo={isvideo}
          setisvideo={setisvideo}
          fetchvideo={fetchvideo}
          handleButtonClick={handleButtonClick}
          opiniononclick1={opiniononclick1}
          opiniononclick2={opiniononclick2}
          videolink={videolink}
          addopinion={addopinion}
          setcomedytable={setcomedytable}
          likedmovie={likedmovie}
          handleSubmit={handleSubmit}
        />
        <Horror
          horrortable={horrortable}
          genrepurpose={genrepurpose}
          isvideo={isvideo}
          setisvideo={setisvideo}
          fetchvideo={fetchvideo}
          handleButtonClick={handleButtonClick}
          opiniononclick1={opiniononclick1}
          opiniononclick2={opiniononclick2}
          videolink={videolink}
          addopinion={addopinion}
          sethorrortable={sethorrortable}
          likedmovie={likedmovie}
          handleSubmit={handleSubmit}
        />
        <Romance
          adventuretable={adventuretable}
          genrepurpose={genrepurpose}
          isvideo={isvideo}
          setisvideo={setisvideo}
          fetchvideo={fetchvideo}
          handleButtonClick={handleButtonClick}
          opiniononclick1={opiniononclick1}
          opiniononclick2={opiniononclick2}
          videolink={videolink}
          addopinion={addopinion}
          setadventuretable={setadventuretable}
          likedmovie={likedmovie}
          handleSubmit={handleSubmit}
        />
        <Documentaries
          crimetable={crimetable}
          genrepurpose={genrepurpose}
          isvideo={isvideo}
          setisvideo={setisvideo}
          fetchvideo={fetchvideo}
          handleButtonClick={handleButtonClick}
          opiniononclick1={opiniononclick1}
          opiniononclick2={opiniononclick2}
          videolink={videolink}
          addopinion={addopinion}
          setcrimetable={setcrimetable}
          likedmovie={likedmovie}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Netflix;
