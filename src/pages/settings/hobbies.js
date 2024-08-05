import Image from 'next/image';
import { Triangle } from 'react-loader-spinner';
import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { postHobbie, putHobbie, deleteHobbie, getHobbies } from '../../utils/firebase'; 

const Hobbies = () => {
  const [approvedHobbies, setApprovedHobbies] = useState([]);
  const [suggestedHobbies, setSuggestedHobbies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showApproveConfirmModal, setShowApproveConfirmModal] = useState(false);
  const [newHobby, setNewHobby] = useState('');
  const [editHobby, setEditHobby] = useState('');
  const [hobbyToEdit, setHobbyToEdit] = useState(null);
  const [hobbyToDelete, setHobbyToDelete] = useState(null);
  const [hobbyToApprove, setHobbyToApprove] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = getHobbies((snapshot) => {
      const hobbiesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const approved = hobbiesList.filter(hobby => !hobby.isSuggested);
      const suggested = hobbiesList.filter(hobby => hobby.isSuggested);
      setApprovedHobbies(approved);
      setSuggestedHobbies(suggested);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (showAddModal || showEditModal) {
      inputRef.current && inputRef.current.focus();
    }
  }, [showAddModal, showEditModal]);

  const handleAddSave = async () => {
    try {
      setLoading(true);
      await postHobbie(newHobby);
      setShowAddModal(false);
      setNewHobby('');
      setLoading(false);
      toast.success('Hobby added successfully!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.code, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleEditSave = async () => {
    try {
      setLoading(true);
      await putHobbie({ uid: hobbyToEdit.id, name: editHobby });
      setShowEditModal(false);
      setShowConfirmModal(false);
      setLoading(false);
      toast.success('Hobby edited successfully!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.code, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      await deleteHobbie({ uid: hobbyToDelete.id });
      setShowDeleteConfirmModal(false);
      setHobbyToDelete(null);
      setLoading(false);
      toast.success('Hobby deleted successfully!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.code, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleEditClick = (hobby) => {
    setEditHobby(hobby.name);
    setHobbyToEdit(hobby);
    setShowEditModal(true);
  };

  const handleConfirm = () => {
    handleEditSave();
    setShowConfirmModal(false);
    setEditHobby('');
  };

  const handleCancel = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowConfirmModal(false);
    setShowDeleteConfirmModal(false);
    setShowApproveConfirmModal(false);
  };

  const handleDeleteClick = (hobby) => {
    setHobbyToDelete(hobby);
    setShowDeleteConfirmModal(true);
  };

  const handleApproveClick = (hobby) => {
    setHobbyToApprove(hobby);
    setShowApproveConfirmModal(true);
  };

  const handleApproveConfirm = async () => {
    try {
      setLoading(true);
      await putHobbie({ uid: hobbyToApprove.id, name: hobbyToApprove.name, isSuggested: false });
      setShowApproveConfirmModal(false);
      setHobbyToApprove(null);
      setLoading(false);
      toast.success('Hobby approved successfully!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.code, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="relative p-2 md:p-4 h-full overflow-hidden">

      {loading && (
        <>
          <div className="absolute inset-0 bg-black bg-opacity-70 z-40"></div>
          <div className="fixed bottom-6 right-6 z-50">
            <Triangle
              visible={true}
              height="50"
              width="50"
              color="#FF6737"
              ariaLabel="triangle-loading"
            />
          </div>
        </>
      )}

      <div className="bg-[#F5F5F5] p-5 rounded-[10px] mb-10 flex justify-between items-center relative">
        <h1 className="text-xl font-bold text-black text-center w-full">Hobbies</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#FF6737] p-3 rounded-full w-[35px] h-[35px] flex items-center justify-center"
        >
          <span className="text-white font-bold text-2xl">+</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-[#F5F5F5] p-2 sm:p-4 md:p-6 rounded-[10px] shadow-md h-[64vh] overflow-hidden">
          <div className="max-h-full overflow-y-auto custom-scrollbar">
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
                height: 6px;
              }

              .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: #b3b3b3;
                border-radius: 20px;
                border: 2px solid transparent;
                background-clip: content-box;
              }

              .custom-scrollbar::-webkit-scrollbar-track {
                background-color: #F5F5F5;
              }
            `}</style>
            <h2 className="text-md font-bold mb-4 text-black text-center font-[Montserrat]">
              Approved
            </h2>
            <ul className="px-4">
              {approvedHobbies.map((hobby) => (
                <li
                  key={hobby.id}
                  className="flex justify-between items-center p-4 min-h-[50px]"
                >
                  <span className="text-[14px] font-[Montserrat] text-black ml-2">{hobby.name}</span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleEditClick(hobby)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <img src="/edit.png" alt="Edit" className="w-[20px] h-[20px]" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(hobby)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <img src="/delete.png" alt="Delete" className="w-[20px] h-[20px]" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-[#F5F5F5] p-2 sm:p-4 md:p-6 rounded-[10px] shadow-md h-[64vh] overflow-hidden">
          <div className="max-h-full overflow-y-auto custom-scrollbar">
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
                height: 6px;
              }

              .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: #b3b3b3;
                border-radius: 20px;
                border: 2px solid transparent;
                background-clip: content-box;
              }

              .custom-scrollbar::-webkit-scrollbar-track {
                background-color: #F5F5F5;
              }
            `}</style>
            <h2 className="text-md font-bold mb-4 text-black text-center font-[Montserrat]">
              Suggested by the user
            </h2>
            <ul className="px-4">
              {suggestedHobbies.map((hobby) => (
                <li
                  key={hobby.id}
                  className="flex justify-between items-center p-4 min-h-[50px]"
                >
                  <span className="text-[14px] font-[Montserrat] text-black ml-2">{hobby.name}</span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleApproveClick(hobby)}
                      className="text-green-500 hover:text-green-600"
                    >
                      <img src="/approve.png" alt="Approve" className="w-[20px] h-[20px]" />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(hobby)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <img src="/delete.png" alt="Delete" className="w-[20px] h-[20px]" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-70" onClick={handleCancel}></div>
          <div className="relative bg-[#F5F5F5] p-8 rounded-[10px] shadow-lg w-[90%] max-w-[360px]">
            <h2 className="text-black text-center mb-8 text-xl font-bold">
              New Hobby
            </h2>
            <div className="flex flex-col items-center">
              <input
                ref={inputRef}
                type="text"
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                placeholder="Name"
                className="w-[322px] h-[39px] mb-4 p-2 text-black text-[12px] rounded-[10px] border border-gray-400"
              />
              <div className="flex justify-center space-x-4 mt-8">
                <button
                  onClick={handleCancel}
                  className="bg-white text-black text-[12px] w-[150px] h-[39px] rounded-[10px]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSave}
                  className="bg-[#FF6737] text-white font-bold text-[12px] w-[150px] h-[39px] rounded-[10px]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-70" onClick={handleCancel}></div>
          <div className="relative bg-[#F5F5F5] p-8 rounded-[10px] shadow-lg w-[90%] max-w-[360px]">
            <h2 className="text-black text-center mb-8 text-xl font-bold">
              Edit Hobby
            </h2>
            <div className="flex flex-col items-center">
              <input
                ref={inputRef}
                type="text"
                value={editHobby}
                onChange={(e) => setEditHobby(e.target.value)}
                placeholder="Name"
                className="w-[322px] h-[39px] mb-4 p-2 text-black text-[12px] rounded-[10px] border border-gray-400"
              />
              <div className="flex justify-center space-x-4 mt-8">
                <button
                  onClick={handleCancel}
                  className="bg-white text-black text-[12px] w-[150px] h-[39px] rounded-[10px]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="bg-[#FF6737] text-white font-bold text-[12px] w-[150px] h-[39px] rounded-[10px]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-[#F5F5F5] p-6 sm:p-8 rounded-[10px] shadow-md w-[90%] max-w-[350px]">
            <p className="text-center mb-4 text-black text-[12px] font-bold mb-10">
              Are you sure you want to save this hobby?
            </p>
            <div className="flex flex-col items-center">
              <button
                onClick={handleConfirm}
                className="bg-[#FF6737] text-white font-bold text-[12px] w-[146px] h-[39px] rounded-[10px] mb-6 mt-4"
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="text-black text-[12px] mb-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-[#F5F5F5] p-6 sm:p-8 rounded-[10px] shadow-md w-[90%] max-w-[350px]">
            <p className="text-center mb-4 text-black text-[12px] font-bold mb-10">
              Are you sure you want to delete this hobby?
            </p>
            <div className="flex flex-col items-center">
              <button
                onClick={handleDeleteConfirm}
                className="bg-[#FF6737] text-white font-bold text-[12px] w-[146px] h-[39px] rounded-[10px] mb-6 mt-4"
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="text-black text-[12px] mb-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showApproveConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-[#F5F5F5] p-6 sm:p-8 rounded-[10px] shadow-md w-[90%] max-w-[350px]">
            <p className="text-center mb-4 text-black text-[12px] font-bold mb-10">
              Are you sure you want to approve this hobby?
            </p>
            <div className="flex flex-col items-center">
              <button
                onClick={handleApproveConfirm}
                className="bg-[#FF6737] text-white font-bold text-[12px] w-[146px] h-[39px] rounded-[10px] mb-6 mt-4"
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="text-black text-[12px] mb-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 bg-[#FF6737] text-white p-4 rounded-full shadow-lg md:hidden"
      >
        <Image src="/plus.png" alt="Plus" width={24} height={24} />
      </button>

      <ToastContainer />
    </div>
  );
};

export default Hobbies;
