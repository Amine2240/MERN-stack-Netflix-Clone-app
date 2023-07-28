import { Link } from "react-router-dom";
const Profile = () => {
  return (
    <div className=" bg-black h-[100vh] flex place-content-center  items-center ">
      <div>
        <p className=" text-white font-semibold capitalize text-5xl">
          edit profile
        </p>
        <div className=" flex flex-row">
          <div className=" h-16 w-16 bg-green-600 rounded-sm m-5"></div>
          <div className=" w-[500px]">
            <p className=" bg-gray-500 w-full h-9 rounded-sm my-5 pl-2 pt-1">
              amine@gmail.com
            </p>
            <p className=" text-2xl font-semibold">Plans</p>
            <ul>
              <li className=" mb-2 ml-5 mt-5">
                <div className=" flex flex-row place-content-between ">
                  <div>
                    <p>netflix standard</p>
                    <p className=" text-gray-500">1080p</p>
                  </div>
                  <button className=" bg-red-500 mb-1 h-9 w-28 rounded-sm">
                    subscribe
                  </button>
                </div>
              </li>
              <li className=" mb-2 ml-5 mt-5">
                <div className=" flex flex-row place-content-between ">
                  <div>
                    <p>netflix basic</p>
                    <p className=" text-gray-500">480p</p>
                  </div>
                  <button className=" bg-red-500 mb-1 h-9 w-28 rounded-sm">
                    subscribe
                  </button>
                </div>
              </li>
              <li className=" mb-7 ml-5 mt-5">
                <div className=" flex flex-row place-content-between ">
                  <div>
                    <p>netflix premium</p>
                    <p className=" text-gray-500">4k + hdr</p>
                  </div>
                  <Link to='/netflix'>
                  <button className=" bg-gray-500 h-9 w-36 rounded-sm">
                    current package
                  </button>
                  </Link>
                </div>
              </li>
            </ul>
            <Link to='/'>
            <button className=" w-full bg-red-500 h-9 rounded-md capitalize font-semibold">
              sign out
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
