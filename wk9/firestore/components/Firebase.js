import { initializeApp } from 'firebase/app';
import { Timestamp, addDoc, collection, getFirestore, onSnapshot, orderBy, query, updateDoc, doc, deleteDoc, increment } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD_7ROHth4Nt91wffigmljesNBlZLPtQm0",
  authDomain: "workshop-photo-share.firebaseapp.com",
  projectId: "workshop-photo-share",
  storageBucket: "workshop-photo-share.appspot.com",
  messagingSenderId: "186092165562",
  appId: "1:186092165562:web:bfc380b5e391951e9d6583",
  measurementId: "G-6LYNR09Y6X"
};

app = initializeApp(firebaseConfig);
db = getFirestore(app);

const COLLECTION = 'Observations'

export const subscribeToPosts = (callback, sortField, SortDirection) => {
  const q = query(collection(db, COLLECTION), orderBy(sortField, SortDirection));
  const unsubscribe = onSnapshot(q, (snapshot) => {callback(snapshot)});
  return () => (unsubscribe);
}

export const addPost = async (title, description, image) => {
  addDoc(collection(db, COLLECTION), 
  {
    'title': title,
    'description': description,
    'image': image,
    'date': new Timestamp.fromMillis(Date.now()),
    'likes': 0,
    'dislikes': 0
  });
}

export const updatePost = async (docID, title, description, image) => {
  const docRef = doc(db, COLLECTION, docID);
  await updateDoc(docRef, {
    'title': title,
    'description': description,
    'image': image
  });
}

export const deletePost = async (docID) => {
    const docRef = doc(db, COLLECTION, docID);
    await deleteDoc(docRef);
}

export const likePost = async (docID) => {
    const docRef = doc(db, COLLECTION, docID);
    await updateDoc(docRef, {
      'likes': increment(1)
  });
}

export const dislikePost = async (docID) => {
    const docRef = doc(db, COLLECTION, docID);
    await updateDoc(docRef, {
      'dislikes': increment(1)
  });
}