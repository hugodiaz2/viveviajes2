import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Triangle } from 'react-loader-spinner';
import { signInWithEmail, registerUserWithEmail } from '../utils/firebase';
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    lengthCheck: false,
    uppercaseCheck: false,
    lowercaseCheck: false,
    specialCharCheck: false,
    consecutiveNumberCheck: true,
    consecutiveLetterCheck: true,
  });

  const validatePassword = (password) => {
    const lengthCheck = password.length >= 8;
    const uppercaseCheck = /[A-Z]/.test(password);
    const lowercaseCheck = /[a-z]/.test(password);
    const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const consecutiveNumberCheck = !/(\d)\1/.test(password);
    const consecutiveLetterCheck = !/(.)\1/.test(password);

    setPasswordValidations({
      lengthCheck,
      uppercaseCheck,
      lowercaseCheck,
      specialCharCheck,
      consecutiveNumberCheck,
      consecutiveLetterCheck,
    });

    return lengthCheck && uppercaseCheck && lowercaseCheck && specialCharCheck && consecutiveNumberCheck && consecutiveLetterCheck;
  };

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await signInWithEmail(email, password);
      const user = response.user;
      sessionStorage.setItem('accessToken', user.stsTokenManager.accessToken);
      sessionStorage.setItem('refreshToken', user.stsTokenManager.refreshToken);
      localStorage.setItem('userId', user.uid);
      setLoading(false);
      router.push('/dashboard');
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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      toast.error("La contraseña no cumple con los requisitos", {
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

    try {
      setLoading(true);
      const user = await registerUserWithEmail(email, password);
      toast.success("Registro exitoso. Verifica tu correo electrónico.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false);
      setIsRegistering(false); // Cambiar de nuevo al formulario de login
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
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

  const openSecurityModal = () => {
    setIsSecurityModalOpen(true);
  };

  const closeSecurityModal = () => {
    setIsSecurityModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative">
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
            src="/viveviajes.png"
            alt="Descripción de la imagen"
            width={190}
            height={148}
            className="mx-auto mb-4"
          />
        </div>
        {isRegistering ? (
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-[10px] bg-white text-black placeholder-[#989898] focus:outline-none focus:ring-2 focus:ring-orange-500 text-[0.85rem]"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded-[10px] bg-white text-black placeholder-[#989898] focus:outline-none focus:ring-2 focus:ring-orange-500 text-[0.85rem]"
              />
              <ul className="text-white mt-2 text-xs">
                <li className={passwordValidations.lengthCheck ? "text-green-500" : "text-red-500"}>
                  {passwordValidations.lengthCheck ? "✔" : "✖"} Longitud mínima de 8 caracteres
                </li>
                <li className={passwordValidations.uppercaseCheck ? "text-green-500" : "text-red-500"}>
                  {passwordValidations.uppercaseCheck ? "✔" : "✖"} Utilizar mínimo una mayúscula
                </li>
                <li className={passwordValidations.lowercaseCheck ? "text-green-500" : "text-red-500"}>
                  {passwordValidations.lowercaseCheck ? "✔" : "✖"} Utilizar mínimo una minúscula
                </li>
                <li className={passwordValidations.specialCharCheck ? "text-green-500" : "text-red-500"}>
                  {passwordValidations.specialCharCheck ? "✔" : "✖"} Utilizar mínimo un carácter especial
                </li>
                <li className={passwordValidations.consecutiveNumberCheck ? "text-green-500" : "text-red-500"}>
                  {passwordValidations.consecutiveNumberCheck ? "✔" : "✖"} No permitir números consecutivos
                </li>
                <li className={passwordValidations.consecutiveLetterCheck ? "text-green-500" : "text-red-500"}>
                  {passwordValidations.consecutiveLetterCheck ? "✔" : "✖"} No permitir letras consecutivas
                </li>
              </ul>
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-[10px] bg-[#FF6737] text-white font-bold transition duration-200 text-[0.85rem]"
            >
              Register
            </button>
            <p
              onClick={() => setIsRegistering(false)}
              className="text-white text-center mt-4 cursor-pointer"
            >
              ¿Ya tienes una cuenta? Inicia sesión
            </p>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-[10px] bg-white text-black placeholder-[#989898] focus:outline-none focus:ring-2 focus:ring-orange-500 text-[0.85rem]"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded-[10px] bg-white text-black placeholder-[#989898] focus:outline-none focus:ring-2 focus:ring-orange-500 text-[0.85rem]"
              />
            </div>
            <div className="mb-3 forgotPassword">
              <p onClick={() => router.push('/recoverPassword')}>Forgot Password?</p>
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-[10px] bg-[#FF6737] text-white font-bold transition duration-200 text-[0.85rem]"
            >
              Log In
            </button>
            <p
              onClick={() => setIsRegistering(true)}
              className="text-white text-center mt-4 cursor-pointer"
            >
              ¿No tienes una cuenta? Regístrate
            </p>
            <div className="flex justify-center mt-2">
              <button
                onClick={openSecurityModal}
                className="bg-[#FF6737] text-white font-bold py-1 px-2 rounded-[10px] text-[0.7rem]"
              >
                Protocolos y Servicios de Seguridad
              </button>
            </div>
          </form>
        )}
      </div>

      <ToastContainer />

      {/* Security Protocols Modal */}
      {isSecurityModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-70" onClick={closeSecurityModal}></div>
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[500px]">
            <h3 className="text-black text-center mb-4">Protocolos y Servicios de Seguridad</h3>
            <ul className="text-black text-sm list-disc list-inside">
              <li>Encriptación de datos en tránsito y en reposo.</li>
              <li>Autenticación multifactor (MFA) para acceso seguro.</li>
              <li>Monitoreo continuo de seguridad y detección de amenazas.</li>
              <li>Backups regulares y recuperación ante desastres.</li>
              <li>Políticas de seguridad estrictas y auditorías regulares.</li>
            </ul>
            <button
              onClick={closeSecurityModal}
              className="mt-4 bg-[#FF6737] text-white font-bold py-2 px-4 rounded-[10px] transition duration-200 text-[0.85rem] w-full"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return page;
}
