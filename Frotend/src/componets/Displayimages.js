import { IoCloseSharp } from "react-icons/io5";
 
const DisplayImage = ({ imgUrl, onClose }) => {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75">
        <button
          className="absolute top-4 right-4 text-white text-4xl hover:bg-red-500"
          onClick={onClose}
        >
          <IoCloseSharp />
        </button>
        <div className="flex justify-center p-4 max-w-[80vh] max-h-[80vh]">
          <img src={imgUrl} alt="Full Screen" className="w-full h-full object-contain" />
        </div>
      </div>
    );
  };
  
  export default DisplayImage;