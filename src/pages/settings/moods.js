import moment from 'moment';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import { Triangle } from 'react-loader-spinner';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { postMood, uploadImage, getMoods, deleteMood, putMood } from '@/utils/firebase';

const Moods = () => {
  const [moods, setMoods] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [newMood, setNewMood] = useState('');
  const [newMoodImage, setNewMoodImage] = useState(null);
  const [editMood, setEditMood] = useState('');
  const [editMoodImage, setEditMoodImage] = useState(null);
  const [currentEditMood, setCurrentEditMood] = useState(null);
  const [moodToDelete, setMoodToDelete] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getMoods((snapshot) => {
      const moodsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMoods(moodsData);
    });
    setLoading(false);
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSaveNewMood = async () => {
    setLoading(true);
    try {
      let imageUrl;
      if (newMoodImage) {
        imageUrl = await uploadImage(newMoodImage);
      }
      await postMood(newMood, imageUrl);
      setShowAddModal(false);
      setNewMood('');
      setNewMoodImage(null);
      toast.success('Mood added successfully!', {
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
    } finally {
      setLoading(false);
    }
  };

  const handleEditSave = async () => {
    setLoading(true);
    try {
      let imageUrl = currentEditMood.icon;
      if (editMoodImage) {
        imageUrl = await uploadImage(editMoodImage);
      }
      const updatedMood = { name: editMood, icon: imageUrl, moodModified: moment().unix() };
      await putMood(currentEditMood.id, updatedMood);
      setShowEditModal(false);
      setEditMood('');
      setEditMoodImage(null);
      setCurrentEditMood(null);
      toast.success('Mood updated successfully!', {
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
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (mood) => {
    setEditMood(mood.name);
    setCurrentEditMood(mood);
    setEditMoodImage(null);
    setShowEditModal(true);
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    setEditMood('');
  };

  const handleCancel = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowConfirmModal(false);
    setShowDeleteConfirmModal(false);
  };

  const handleDeleteClick = (mood) => {
    setMoodToDelete(mood.id);
    setShowDeleteConfirmModal(true);
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await deleteMood(moodToDelete);
      setMoods(moods.filter(mood => mood.id !== moodToDelete));
      setShowDeleteConfirmModal(false);
      setMoodToDelete('');
      toast.success('Mood deleted successfully!', {
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
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowConfirmModal(false);
    setShowDeleteConfirmModal(false);
  };

  const toggleSelectMood = (index) => {
    setMoods(moods.map((mood, i) => ({
      ...mood,
      selected: i === index
    })));
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
        <h1 className="text-xl font-bold text-black text-center w-full">Moods</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#FF6737] p-3 rounded-full w-[35px] h-[35px] flex items-center justify-center"
        >
          <span className="text-white font-bold text-2xl">+</span>
        </button>
      </div>

      <div className="bg-black sm:bg-[#F5F5F5] p-4 rounded-[10px] h-[64vh] shadow-md">
        <div className="max-h-[400px] sm:max-h-[600px] overflow-y-scroll">
          <ul className="px-4 space-y-1">
            {moods.map((mood, index) => (
              <li
                key={index}
                className={`relative flex items-center justify-between p-4 min-h-[50px] cursor-pointer ${mood.selected ? 'bg-[#F5F5F5]' : 'bg-black'} sm:bg-[#F5F5F5] sm:text-black text-${mood.selected ? 'black' : 'white'}`}
                onClick={() => toggleSelectMood(index)}
              >
                <div className="flex items-center">
                  <Image src={mood.icon} alt={mood.name} width={24} height={24} className="mr-2" />
                  <span className="text-[14px] font-[Montserrat] ml-2">{mood.name}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditClick(mood)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <img src="/edit.png" alt="Edit" className="w-[20px] h-[20px]" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(mood)}
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

      <button
        onClick={() => setShowAddModal(true)}
        className="sm:hidden fixed bottom-4 right-4 rounded-full bg-[#F5F5F5] text-black"
      >
        <Image src="/plus.png" alt="Plus" width={24} height={24} className="w-8 h-8" />
      </button>

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-70" onClick={handleCloseModal}></div>

          <div className="relative bg-[#F5F5F5] p-4 rounded-[10px] shadow-lg w-[90%] max-w-[360px]">

            <h2 className="text-black text-center mb-8 text-xl font-bold">
              New Mood
            </h2>

            <div className="flex flex-col items-center">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newMood}
                onChange={(e) => setNewMood(e.target.value)}
                className="w-[322px] h-[39px] mb-4 p-2 text-black text-[12px] rounded-[10px] border border-gray-400"
              />
              <div
                className="relative w-[322px] h-[150px] border-2 border-dashed border-[#989898] flex items-center justify-center text-black cursor-pointer rounded-[10px]"
                style={{ backgroundColor: '#FFFDF5' }}
                onClick={() => document.getElementById('newFileInput').click()}
              >
                {newMoodImage ? (
                  <img src={URL.createObjectURL(newMoodImage)} alt="New Mood" className="object-cover h-full w-full rounded-[10px]" />
                ) : (
                  <p className='text-xs text-gray-400'>Add Icon</p>
                )}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 sm:hidden">
                  <Image src="/plus.png" alt="Plus" width={24} height={24} className="w-6 h-6" />
                </div>
              </div>
              <input
                type="file"
                id="newFileInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => handleImageUpload(e, setNewMoodImage)}
              />
            </div>

            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={handleCancel}
                className="bg-white text-black text-[12px] w-[150px] h-[39px] rounded-[10px]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewMood}
                className="bg-[#FF6737] text-white font-bold text-[12px] w-[150px] h-[39px] rounded-[10px]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-70" onClick={handleCloseModal}></div>

          <div className="relative bg-[#F5F5F5] p-4 rounded-[10px] shadow-lg w-[90%] max-w-[360px]">

            <h2 className="text-black text-center mb-8 text-xl font-bold">
              Edit Mood
            </h2>

            <div className="flex flex-col items-center">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={editMood}
                onChange={(e) => setEditMood(e.target.value)}
                className="w-[322px] h-[39px] mb-4 p-2 text-black text-[12px] rounded-[10px] border border-gray-400"
              />
              <div
                className="relative w-[322px] h-[150px] border-2 border-dashed border-[#989898] flex items-center justify-center text-black cursor-pointer rounded-[10px]"
                style={{ backgroundColor: '#FFFDF5' }}
                onClick={() => document.getElementById('editFileInput').click()}
              >
                {editMoodImage ? (
                  <img src={URL.createObjectURL(editMoodImage)} alt="Edit Mood" className="object-cover h-full w-full rounded-[10px]" />
                ) : (
                  currentEditMood && currentEditMood.icon ? (
                    <Image src={currentEditMood.icon} alt="Edit Mood" layout="fill" objectFit="cover" className="rounded-[10px]" />
                  ) : (
                    <p className='text-xs text-gray-400'>Add Icon</p>
                  )
                )}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 sm:hidden">
                  <Image src="/plus.png" alt="Plus" width={24} height={24} className="w-6 h-6" />
                </div>
              </div>
              <input
                type="file"
                id="editFileInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => handleImageUpload(e, setEditMoodImage)}
              />
            </div>

            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={handleCancel}
                className="bg-white text-black text-[12px] w-[150px] h-[39px] rounded-[10px]"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="bg-[#FF6737] text-white font-bold text-[12px] w-[150px] h-[39px] rounded-[10px]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div
            className="bg-[#F5F5F5] p-4 sm:p-6 rounded-[10px] shadow-md w-[90%] max-w-[350px]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-center mb-4 text-black text-[12px] font-bold mb-10">
              Are you sure you want to save this mood?
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
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div
            className="bg-[#F5F5F5] p-4 sm:p-6 rounded-[10px] shadow-md w-[90%] max-w-[350px]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-center mb-4 text-black text-[12px] font-bold mb-10">
              Are you sure you want to delete this mood?
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
      <ToastContainer />
    </div>
  );
};

export default Moods;
