import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutStart,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../components/Modal.jsx";
import DeleteModal from "../components/DeleteModal.jsx";
import { FaSignOutAlt, FaTrashAlt } from "react-icons/fa";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    setIsDeleteModalOpen(true); // Show the delete confirmation modal
  };

  const handleConfirmDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      setIsDeleteModalOpen(false); // Close the modal after successful deletion
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false); // Hide the delete modal if canceled
  };

  // const handleDeleteUser = async () => {
  //   try {
  //     dispatch(deleteUserStart());
  //     const res = await fetch(`/api/user/delete/${currentUser._id}`, {
  //       method: "DELETE",
  //     });
  //     const data = await res.json();
  //     if (data.success === false) {
  //       dispatch(deleteUserFailure(data.message));
  //       return;
  //     }
  //     dispatch(deleteUserSuccess(data));
  //   } catch (error) {
  //     dispatch(deleteUserFailure(error.message));
  //   }
  // };

  const handleSignOut = async () => {
    setIsModalOpen(true); // Show the confirmation modal
  };

  const handleConfirmLogut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      setIsModalOpen(false);
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); // Hide the modal if canceled
  };

  const handleShowListings = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  const iconStyle = {
    marginRight: "20px",
  };

  return (
    <div className=" p-24">
      <div
        className="max-w-fit mx-auto px-40 border border-gray-100 rounded-lg  shadow-xl "
        style={{
          backgroundColor: "rgba(235, 248, 255, 0.5)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className=" max-w-lg mx-auto mt-1">
          <h1 className="text-4xl font-sans  text-center my-7">
            <b>Homeowner's Portal</b>
          </h1>
          <p className="text-2xl font-normal text-center my-7">
            Your Account, Your Control
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar || currentUser.avatar}
              alt="profile"
              className="rounded-lg h-48 w-48 object-cover cursor-pointer self-center mt-2 transition-transform transform hover:scale-105 border-3 border-gray-200"
            />
            <p className=" text-sm self-center">
              {fileUploadError ? (
                <span className="text-red-700">
                  Error Uploading image (image must be less than 2MB )
                </span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span className="text-green-700">
                  Image Uploaded Successfully !
                </span>
              ) : (
                ""
              )}
            </p>
            <label className="font-medium">Username:</label>
            <input
              type="text"
              placeholder="username"
              defaultValue={currentUser.username}
              id="username"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            />
            <label className="font-medium">Email:</label>
            <input
              type="text"
              placeholder="email"
              defaultValue={currentUser.email}
              id="email"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            />
            <label className="font-medium">Password:</label>
            <input
              type="password"
              placeholder="password"
              id="password"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            />
            <button
              disabled={loading}
              className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Update"}
            </button>
            <Link
              className="bg-green-700 text-white rounded-lg p-3 uppercase text-center hover:opacity-95"
              to={"/create-listing"}
            >
              Create Listing
            </Link>
            {currentUser?.isAdmin && (
              <button
                className="bg-blue-500 text-white rounded-lg p-3 uppercase text-center hover:opacity-95"
                onClick={() => (window.location.href = "/admin/dashboard")} // Redirect to admin dashboard
              >
                Go to Admin Dashboard
              </button>
            )}
          </form>

          <div className="flex justify-between mt-5">
            <span
              onClick={handleDeleteUser}
              className="text-gray-700 cursor-pointer font-medium flex gap-2 "
            >
              {" "}
              <FaTrashAlt className="text-black text-2xl" />
              Delete Account
            </span>
            <DeleteModal
              show={isDeleteModalOpen}
              onClose={handleCloseDeleteModal}
              onConfirm={handleConfirmDelete}
            />

            <span
              onClick={handleSignOut}
              className="text-gray-700 cursor-pointer font-medium flex gap-2 "
            >
              {" "}
              <FaSignOutAlt className="text-black text-2xl" />
              Sign Out
            </span>

            <Modal
              show={isModalOpen}
              onClose={handleCloseModal}
              onConfirm={handleConfirmLogut}
            />
          </div>
          <p className="text-green-800 mt-5">
            {updateSuccess ? "User is updated successfully" : ""}
          </p>
        </div>
      </div>
      <br />
      <div className="p-3 max-w-lg mx-auto mt-1">
        <button
          className="text-gray-600 w-full text-3xl font-sans hover:text-gray-900 overflow-hidden"
          onClick={handleShowListings}
        >
          Explore My Listings
        </button>
        <p className="text-red-700 mt-5">
          {showListingError ? "Error showing listing" : ""}
        </p>
        {userListings && userListings.length > 0 && (
          <div className="flex flex-col gap-4">
            <h1 className="text-center mt-3 text-2xl font-semibold">
              {" "}
              Your Listings
            </h1>
            {userListings.map((listing) => (
              <div
                key={listing._id}
                className="border rounded-lg p-3 flex justify-between items-center gap-4"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    className="h-16 w-16 object-contain"
                    src={listing.imageUrls[0]}
                    alt="listing cover"
                  ></img>
                </Link>
                <Link
                  className="text-slate-700 font-semibold  hover:underline truncate flex flex-1"
                  to={`/listing/${listing._id}`}
                >
                  <p>{listing.name}</p>
                </Link>
                <div className="flex flex-col items-center">
                  <Link to={`/update-listing/${listing._id}`}>
                    <button className="text-green-700 uppercase hover:font-medium">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleListingDelete(listing._id)}
                    className="text-red-700 uppercase hover:font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
