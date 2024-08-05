const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } = require("firebase/storage");
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, sendEmailVerification } = require("firebase/auth");
const { getFirestore, collection, query, onSnapshot, setDoc, doc, updateDoc, deleteDoc, getDoc } = require("firebase/firestore");
import moment from 'moment';

const firebaseConfig = {
  apiKey: "AIzaSyAe4que89qDhKgHcRlSpuR7uwxIHw7TZu4",
  authDomain:"viveviajes-95230.firebaseapp.com",
  projectId: "viveviajes-95230",
  storageBucket: "viveviajes-95230.appspot.com",
  messagingSenderId:  "124514684735",
  appId: "1:124514684735:web:8c91588949c1e1681ecd8a",
  measurementId: "G-XXD74SHFG2"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);

// -------------------------------- GET -------------------------------------------

const getAdminType = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  const adminDoc = await getDoc(doc(firestore, 'admins', user.uid));
  if (!adminDoc.exists()) return null;

  return adminDoc.data().type;
};

const getNewAdmins = (callback) => {
  const q = query(collection(firestore, 'admins'));
  return onSnapshot(q, callback);
};

const getGenders = (callback) => {
  const q = query(collection(firestore, 'gender'));
  return onSnapshot(q, callback);
};

const getHobbies = (callback) => {
  const q = query(collection(firestore, 'hobbie'));
  return onSnapshot(q, callback);
};

const getEventInterests = (callback) => {
  const q = query(collection(firestore, 'eventInterest'));
  return onSnapshot(q, callback);
};

const getFaqQuestions = async () => {
  const faqCollectionRef = collection(firestore, 'faq');
  const faqSnapshot = await getDocs(faqCollectionRef);
  
  const faqList = [];

  for (const faqDoc of faqSnapshot.docs) {
    const faqData = faqDoc.data();
    const subCollectionRef = collection(firestore, `faq/${faqDoc.id}/subtitles`);
    const subCollectionSnapshot = await getDocs(subCollectionRef);
    
    const subCollectionData = subCollectionSnapshot.docs.map(subDoc => subDoc.data());
    faqList.push({
      ...faqData,
      subCollection: subCollectionData
    });
  }

  return faqList;
};

const getFaqQuestionsRealTime = (callback) => {
  const faqCollectionRef = collection(firestore, 'faq');
  return onSnapshot(faqCollectionRef, async (snapshot) => {
    const faqList = [];

    for (const faqDoc of snapshot.docs) {
      const faqData = faqDoc.data();
      const subCollectionRef = collection(firestore, `faq/${faqDoc.id}/subtitles`);
      const subCollectionSnapshot = await getDocs(subCollectionRef);
      
      const subCollectionData = subCollectionSnapshot.docs.map(subDoc => subDoc.data());
      faqList.push({
        ...faqData,
        subCollection: subCollectionData
      });
    }

    callback(faqList);
  });
};

const getMoods = (callback) => {
  const q = collection(firestore, 'mood');
  return onSnapshot(q, callback);
};


// -------------------------------- POST -------------------------------------------
const postNewAdmin = async (newAdminData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, newAdminData.email.trim(), newAdminData.password.trim());
    const user = userCredential.user;

    await setDoc(doc(firestore, 'admins', user.uid), {
      name: newAdminData.name.trim(),
      email: newAdminData.email.trim(),
      type: newAdminData.type,
      adminCreated: moment().unix(),
      adminModified: moment().unix(),
    });

    return 'Admin created successfully';
  } catch (error) {
    console.error('Error creating admin:', error);
    throw error;
  }
};

const postGender = async(name) => {
  return await setDoc(doc(firestore, "gender", uuidv4()), {
    name: name,
    genderCreated: moment().unix(),
    genderModified: moment().unix(),
  });
};

const postHobbie = async(name) => {
  return await setDoc(doc(firestore, "hobbie", uuidv4()), {
    name: name,
    isSuggested:false,
    hobbieCreated: moment().unix(),
    hobbieModified: moment().unix(),
  });
};

const postEventInterest = async(name) => {
  return await setDoc(doc(firestore, "eventInterest", uuidv4()), {
    name: name,
    isSuggested:false,
    eventInterestCreated: moment().unix(),
    eventInterestModified: moment().unix(),
  });
};

const postMood = async (name, icon) => {
  return await setDoc(doc(firestore, 'mood', uuidv4()), {
    name: name.trim(),
    icon: icon.trim(),
    moodCreated: moment().unix(),
    moodModified: moment().unix(),
  });
};

// -------------------------------- PUT -------------------------------------------
const putNewAdmin = async (id, adminData) => {
  const adminRef = doc(firestore, 'admins', id);
  return await updateDoc(adminRef, {
    name: adminData.name.trim(),
    email: adminData.email.trim(),
    type: adminData.type,
    adminModified: moment().unix(),
  });
};

const putEditQuestion = async (button, oldQuestion, newQuestion, newAnswer) => {
  const faqRef = collection(firestore, 'faq');
  const faqSnapshot = await getDocs(faqRef);
  
  for (const faqDoc of faqSnapshot.docs) {
    if (faqDoc.data().content === button) {
      const subCollectionRef = collection(firestore, `faq/${faqDoc.id}/subtitles`);
      const subCollectionSnapshot = await getDocs(subCollectionRef);
      
      for (const subDoc of subCollectionSnapshot.docs) {
        if (subDoc.data().content === oldQuestion) {
          await updateDoc(doc(firestore, `faq/${faqDoc.id}/subtitles`, subDoc.id), {
            content: newQuestion,
            answer: newAnswer,
            faqModified: moment().unix(),
          });
          await updateDoc(doc(firestore, 'faq', faqDoc.id), {
            faqModified: moment().unix(),
          });

          return;
        }
      }
    }
  }
};

const putGender = async(data) => {
  return await updateDoc(doc(firestore, "gender", data.uid), {
    name: data.name,
    genderModified: moment().unix(),
  });
};

const putHobbie = async(data) => {
  return await updateDoc(doc(firestore, "hobbie", data.uid), {
    name: data.name,
    isSuggested:false,
    hobbieModified: moment().unix(),
  });
}; 

const putEventInterest = async(data) => {
  return await updateDoc(doc(firestore, "eventInterest", data.uid), {
    name: data.name,
    isSuggested:false,
    hobbieModified: moment().unix(),
  });
}; 

const putMood = async (id, updatedMood) => {
  const moodDocRef = doc(firestore, 'mood', id);
  await updateDoc(moodDocRef, updatedMood);
};

// -------------------------------- DELETE -------------------------------------------
const deleteAdminDoc = async (id) => {
  await deleteDoc(doc(firestore, 'admins', id));
};

const deleteGender = async(data) => {
  return await deleteDoc(doc(firestore, "gender", data.uid));
};

const deleteHobbie = async(data) => {
  return await deleteDoc(doc(firestore, "hobbie", data.uid));
};

const deleteEventInterest = async(data) => {
  return await deleteDoc(doc(firestore, "eventInterest", data.uid));
};

const deleteMood = async (id) => {
  const moodDocRef = doc(firestore, 'mood', id);
  const moodDoc = await getDoc(moodDocRef);
  if (moodDoc.exists()) {
    const moodData = moodDoc.data();
    if (moodData.icon) {
      const imageRef = ref(storage, moodData.icon);
      await deleteObject(imageRef);
    }
  }
  await deleteDoc(moodDocRef);
};


// -------------------------------- LOGIN -------------------------------------------
const signInWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, userEmail);
  return 'Success';
};

export const signOutAdmin = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
// Función para registrar un nuevo usuario y enviar correo de verificación
const registerUserWithEmail = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await sendEmailVerification(user);

  await setDoc(doc(firestore, 'admins', user.uid), {
    name: email.split('@')[0], // Utilizar el nombre de usuario antes del '@' como nombre por defecto
    email: email,
    type: 'Admin', // Tipo por defecto
    createdAt: moment().unix(),
    updatedAt: moment().unix(),
    emailVerified: user.emailVerified
  });

  return user;
};

// -------------------------------- STORAGE -------------------------------------------
const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export {
  auth,
  firestore,
  signInWithEmail,
  registerUserWithEmail,
  sendPasswordResetEmail,
  signOut,
  postNewAdmin,
  postGender,
  postHobbie,
  postEventInterest,
  putNewAdmin,
  putEditQuestion,
  putGender,
  putHobbie,
  putEventInterest,
  getNewAdmins,
  getGenders,
  getHobbies,
  getEventInterests,
  getFaqQuestions,
  getFaqQuestionsRealTime,
  deleteAdminDoc,
  deleteGender,
  deleteHobbie,
  deleteEventInterest,
  uploadImage,
  postMood,
  getMoods,
  deleteMood,
  putMood,
  getAdminType
};
