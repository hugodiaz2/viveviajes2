import Image from 'next/image';
import { useState } from 'react';
import { Triangle } from 'react-loader-spinner';
import { resetPassword } from '../../utils/firebase';
import { ToastContainer, toast } from 'react-toastify';

export default function RecoverPassword() {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const checkEmail = async (email) => {
    const url = 'https://us-central1-g-play-dd31d.cloudfunctions.net/checkEmail';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const emailExists = await checkEmail(email);

      if (!emailExists) {
        setLoading(false);
        toast.error("User not found", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }

      await resetPassword(email);
      setLoading(false);

      toast.success(`An email was sent to your address '${email}' to change your password`, {
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
        autoClose: 2000,
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
    <div className="min-h-screen bg-black flex items-center justify-center">
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

      <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-md">
        
        <div className="text-center mb-6">
          <Image 
            src="/GPlay.png" 
            alt="Descripción de la imagen" 
            width={90} 
            height={148} 
            className="mx-auto mb-4" 
          />
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-[10px] bg-white text-black placeholder-[#989898] focus:outline-none focus:ring-2 focus:ring-orange-500 text-[0.85rem]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-[10px] bg-[#FF6737] text-white font-bold transition duration-200 text-[0.85rem]"
          >
            Reset Password
          </button>
        </form>

      </div>

      <ToastContainer />
    </div>
  );
}

RecoverPassword.getLayout = function getLayout(page) {
  return page;
}
