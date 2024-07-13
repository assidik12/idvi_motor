import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import bcrypt from "bcrypt";
import app from "./init";

type userData = {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  role?: string;
};

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();

  return data;
}

export async function SignUp(userData: userData, callback: Function) {
  const q = query(collection(firestore, "users"), where("email", "==", userData.email));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    callback({ statis: false, message: "Email already exists" });
  } else {
    if (!userData.role) {
      userData.role = "user";
    }

    userData.password = await bcrypt.hash(userData.password, 10);

    await addDoc(collection(firestore, "users"), userData)
      .then((res) => {
        callback({ status: true, message: res.id });
      })
      .catch((err) => {
        callback({ status: false, message: err.message });
      });
  }
}

export async function signIn(email: string) {
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data.length > 0) {
    return data[0];
  } else {
    return null;
  }
}
