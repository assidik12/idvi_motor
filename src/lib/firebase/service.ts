import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import app from "./init";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

const firestore = getFirestore(app);
const storage = getStorage(app);

export async function retrieveDataByField(collectionName: string, field: string, value: string) {
  const q = query(collection(firestore, collectionName), where(field, "==", value));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

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
export async function addData(collectionName: string, data: any, callback: Function) {
  const docRef = await addDoc(collection(firestore, collectionName), data)
    .then((e) => callback(true, e.id))
    .catch((e) => callback(false, e.message));

  return docRef;
}

export async function updateData(collectionName: string, id: string, data: any, callback: Function) {
  const docRef = await updateDoc(doc(firestore, collectionName, id), data)
    .then(() => {
      callback(true);
    })
    .catch(() => callback(false));
  return docRef;
}

export async function deleteData(collectionName: string, id: string, callback: Function) {
  const docRef = await deleteDoc(doc(firestore, collectionName, id))
    .then(() => callback(true))
    .catch(() => callback(false));

  return docRef;
}

export async function uploadFile(Id: string, collection: string, file: any, callback: Function) {
  if (file.size < 1178600) {
    const storageRef = ref(storage, `images/${collection}/${Id}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error: any) => {
        throw error;
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          callback(downloadURL);
        });
      }
    );
    return true;
  } else {
    return false;
  }
}
