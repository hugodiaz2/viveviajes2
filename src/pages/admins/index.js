import { useState, useEffect } from 'react';
import { Triangle } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';
import { postNewAdmin, putNewAdmin, getNewAdmins, deleteAdminDoc, getAdminType } from '../../utils/firebase'; 

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isNewAdminModalOpen, setIsNewAdminModalOpen] = useState(false);
  const [isEditAdminModalOpen, setIsEditAdminModalOpen] = useState(false);
  const [newAdminData, setNewAdminData] = useState({ name: '', email: '', password: '', type: 'Admin' });
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const fetchAdminType = async () => {
      const adminType = await getAdminType();
      setUserType(adminType);
    };

    fetchAdminType();

    const unsubscribe = getNewAdmins((snapshot) => {
      const adminsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAdmins(adminsList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openModal = (type, admin = null) => {
    switch (type) {
      case 'new':
        setIsNewAdminModalOpen(true);
        break;
      case 'edit':
        setIsEditAdminModalOpen(true);
        setCurrentAdmin(admin);
        setNewAdminData({
          name: admin.name,
          email: admin.email,
          password: admin.password,
          type: admin.type,
        });
        break;
      case 'delete':
        setIsDeleteModalOpen(true);
        setCurrentAdmin(admin);
        break;
      default:
        break;
    }
  };

  const closeModal = (type) => {
    switch (type) {
      case 'new':
        setIsNewAdminModalOpen(false);
        setNewAdminData({
          name: '',
          email: '',
          password: '',
          type: 'Admin',
        });
        break;
      case 'edit':
        setIsEditAdminModalOpen(false);
        setCurrentAdmin(null);
        setNewAdminData({
          name: '',
          email: '',
          password: '',
          type: 'Admin',
        });
        break;
      case 'delete':
        setIsDeleteModalOpen(false);
        setCurrentAdmin(null);
        break;
      default:
        break;
    }
  };

  const handleDeleteAdminClick = async () => {
    try {
      setLoading(true);
      await deleteAdminDoc(currentAdmin.id);
      closeModal('delete');
      setLoading(false);
      toast.success('Admin deleted successfully!', {
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
      toast.error(error.message, {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveNewAdminClick = async () => {
    try {
      setLoading(true);
      await postNewAdmin(newAdminData);
      closeModal('new');
      setLoading(false);
      toast.success('Admin saved successfully!', {
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

  const handleSaveEditAdminClick = async () => {
    try {
      setLoading(true);
      await putNewAdmin(currentAdmin.id, newAdminData);
      closeModal('edit');
      setLoading(false);
      toast.success('Admin edited successfully!', {
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

  const renderAdminCards = () => {
    return admins.map((admin, index) => (
      <div
        key={index}
        className="flex flex-col bg-white shadow rounded-[10px] p-3 m-2"
        style={{ backgroundColor: '#F5F5F5', border: '1px solid #989898' }}
      >

        <div className="flex items-center justify-between">
          <div className="flex flex-row">
            <span className="text-black font-bold text-[13px]">
              {admin.name}
            </span>
            <span className="text-black text-[10px] ml-2 mt-1 text-gray-500">
              {admin.type}
            </span>
          </div>
        </div>

        <div className="flex items-center mt-2">
          <Image src="/mail.png" alt="Email" width={20} height={20} />
          <span className="ml-1 text-gray-600 text-[12px]">
            {admin.email}
          </span>
        </div>

        <div className="flex items-center justify-end space-x-4">
          {userType === 'Super Admin' && (
            <>
              <Image
                src="/edit.png"
                alt="Edit"
                width={20}
                height={20}
                onClick={() => openModal('edit', admin)}
                className="cursor-pointer"
              />
              <Image
                src="/delete.png"
                alt="Delete"
                width={20}
                height={20}
                onClick={() => openModal('delete', admin)}
                className="cursor-pointer"
              />
            </>
          )}
        </div>
      </div>
    ));
  };

  const renderModal = (type) => {
    switch (type) {
      case 'new':
        return (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-70" onClick={() => closeModal('new')}></div>
            <div className="relative bg-[#F5F5F5] p-4 rounded-[10px] shadow-lg w-[90%] max-w-[360px]">
              <h2 className="text-black text-center mb-8 text-xl font-bold">New Admin</h2>
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newAdminData.name}
                  onChange={handleInputChange}
                  className="w-[322px] h-[39px] mb-4 p-2 text-black text-[12px] rounded-[10px] border border-gray-400"
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={newAdminData.email}
                  onChange={handleInputChange}
                  className="w-[322px] h-[39px] mb-4 p-2 text-black text-[12px] rounded-[10px] border border-gray-400"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={newAdminData.password}
                  onChange={handleInputChange}
                  className="w-[322px] h-[39px] mb-4 p-2 text-black text-[12px] rounded-[10px] border border-gray-400"
                />
                <select
                  name="type"
                  value={newAdminData.type}
                  onChange={handleInputChange}
                  className="w-[322px] h-[39px] mb-8 p-2 text-black text-[12px] rounded-[10px] bg-white border border-gray-400"
                >
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => closeModal('new')}
                  className="bg-white text-black text-[12px] w-[150px] h-[39px] rounded-[10px]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNewAdminClick}
                  className="bg-[#FF6737] text-white font-bold text-[12px] w-[150px] h-[39px] rounded-[10px]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        );
      case 'edit':
        return (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-70" onClick={() => closeModal('edit')}></div>
            <div className="relative bg-[#F5F5F5] p-4 rounded-[10px] shadow-lg w-[90%] max-w-[360px]">
              <h2 className="text-black text-center mb-8 text-xl font-bold">Edit Admin</h2>
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={newAdminData.name}
                  onChange={handleInputChange}
                  className="w-[322px] h-[39px] mb-4 p-2 text-black text-[12px] rounded-[10px] border border-gray-400"
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={newAdminData.email}
                  onChange={handleInputChange}
                  disabled
                  className="w-[322px] h-[39px] mb-4 p-2 text-black text-[12px] rounded-[10px] border border-gray-400 bg-gray-200"
                />
                <select
                  name="type"
                  value={newAdminData.type}
                  onChange={handleInputChange}
                  className="w-[322px] h-[39px] mb-8 p-2 text-black text-[12px] rounded-[10px] bg-white border border-gray-400"
                >
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => closeModal('edit')}
                  className="bg-white text-black text-[12px] w-[150px] h-[39px] rounded-[10px]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEditAdminClick}
                  className="bg-[#FF6737] text-white font-bold text-[12px] w-[150px] h-[39px] rounded-[10px]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        );
      case 'delete':
        return (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-70" onClick={() => closeModal('delete')}></div>
            <div className="relative bg-[#F5F5F5] p-4 rounded-[10px] shadow-lg w-[90%] max-w-[350px]">
              <p className="text-center mb-4 text-black text-[12px] font-bold mb-10">
                Are you sure you want to delete this Admin Account?
              </p>
              <div className="flex flex-col items-center">
                <button
                  onClick={handleDeleteAdminClick}
                  className="bg-[#FF6737] text-white font-bold text-[12px] w-[146px] h-[39px] rounded-[10px] mb-6 mt-4"
                >
                  Confirm
                </button>
                <button
                  onClick={() => closeModal('delete')}
                  className="text-black text-[12px] mb-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
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
      <div className="bg-[#F5F5F5] p-5 rounded-[10px] mb-2 flex justify-between items-center relative">
        <h1 className="text-xl font-bold text-black text-center w-full">Admins</h1>
        {userType === 'Super Admin' && (
          <button
            onClick={() => openModal('new')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#FF6737] p-3 rounded-full w-[35px] h-[35px] flex items-center justify-center"
          >
            <span className="text-white font-bold text-2xl">+</span>
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {renderAdminCards()}
      </div>
      {isNewAdminModalOpen && renderModal('new')}
      {isEditAdminModalOpen && renderModal('edit')}
      {isDeleteModalOpen && renderModal('delete')}
      <ToastContainer />
    </div>
  );
};

export default Admins;
