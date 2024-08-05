import Image from 'next/image';
import { Triangle } from 'react-loader-spinner';
import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { postGender, putGender, deleteGender, getGenders } from '../../utils/firebase';

const Genders = () => {
  const [genders, setGenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGender, setSelectedGender] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [newGender, setNewGender] = useState('');
  const [editGender, setEditGender] = useState('');
  const [genderToEdit, setGenderToEdit] = useState(null);
  const [genderToDelete, setGenderToDelete] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = getGenders((snapshot) => {
      const gendersList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGenders(gendersList);
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
      await postGender(newGender);
      setShowAddModal(false);
      setNewGender('');
      setLoading(false);
      toast.success('Gender added successfully!', {
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
      await putGender({ uid: genderToEdit.id, name: editGender });
      setShowEditModal(false);
      setShowConfirmModal(false);
      setLoading(false);
      toast.success('Gender edited successfully!', {
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
      await deleteGender({ uid: genderToDelete.id });
      setShowDeleteConfirmModal(false);
      setGenderToDelete(null);
      setLoading(false);
      toast.success('Gender deleted successfully!', {
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

  const handleEditClick = (gender) => {
    setEditGender(gender.name);
    setGenderToEdit(gender);
    setShowEditModal(true);
  };

  const handleConfirm = () => {
    handleEditSave();
    setShowConfirmModal(false);
    setEditGender('');
  };

  const handleCancel = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowConfirmModal(false);
    setShowDeleteConfirmModal(false);
  };

  const handleDeleteClick = (gender) => {
    setGenderToDelete(gender);
    setShowDeleteConfirmModal(true);
  };

  const handleSelectGender = (gender) => {
    setSelectedGender(gender);
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
        <h1 className="text-xl font-bold text-black text-center w-full">Genders</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#FF6737] p-3 rounded-full w-[35px] h-[35px] flex items-center justify-center"
        >
          <span className="text-white font-bold text-2xl">+</span>
        </button>
      </div>

      <div className="bg-[#F5F5F5] p-4 sm:p-6 md:p-8 rounded-[10px] shadow-md h-[64vh] overflow-hidden">
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

          <ul className="px-4">
            {genders.map((gender) => (
              <li
                key={gender.id}
                className="flex justify-between items-center p-4 min-h-[50px]"
              >
                <span className="text-[14px] font-[Montserrat] text-black ml-2">{gender.name}</span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditClick(gender)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <img src="/edit.png" alt="Edit" className="w-[20px] h-[20px]" />
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(gender)}
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

      <div className="md:hidden">
        <ul className="space-y-2">
          {genders.map((gender) => (
            <li
              key={gender.id}
              className={`flex justify-between items-center p-4 rounded-[10px] ${selectedGender === gender ? 'bg-white text-black' : 'bg-black text-white'}`}
              onClick={() => handleSelectGender(gender.name)}
            >
              <span className="text-[20px] font-[Montserrat]">{gender.name}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowAddModal(true)}
          className="fixed bottom-8 right-8 bg-[#FF6737] text-white p-4 rounded-full shadow-lg md:hidden"
        >
          <Image src="/plus.png" alt="Plus" width={24} height={24} />
        </button>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-70" onClick={handleCancel}></div>
          <div className="relative bg-[#F5F5F5] p-8 rounded-[10px] shadow-lg w-[90%] max-w-[360px]">
            <h2 className="text-black text-center mb-8 text-xl font-bold">New Gender</h2>
            <div className="flex flex-col items-center">
              <input
                ref={inputRef}
                type="text"
                value={newGender}
                onChange={(e) => setNewGender(e.target.value)}
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
            <h2 className="text-black text-center mb-8 text-xl font-bold">Edit Gender</h2>
            <div className="flex flex-col items-center">
              <input
                ref={inputRef}
                type="text"
                value={editGender}
                onChange={(e) => setEditGender(e.target.value)}
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
            <p className="text-center mb-4 text-black text-[12px] font-bold mb-10">Are you sure you want to save this gender?</p>
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
            <p className="text-center mb-4 text-black text-[12px] font-bold mb-10">Are you sure you want to delete this gender?</p>
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

      <ToastContainer />
    </div>
  );
};

export default Genders;
