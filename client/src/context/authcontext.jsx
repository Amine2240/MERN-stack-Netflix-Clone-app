/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const authcontext = createContext();
const Authcontextprovider = (props) => {
  const [boolauth, setboolauth] = useState(false);
  const getauthbool = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth");
      setboolauth(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getauthbool();
  }, [boolauth]);
  return (
    <authcontext.Provider value={{ boolauth, getauthbool }}>
      {props.children}
    </authcontext.Provider>
  );
};

export default Authcontextprovider;
