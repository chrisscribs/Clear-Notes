import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // 👈 import auth hook

interface Note {
  text: string;
  category: string;
  uid?: string;
}

export const useNotes = () => {
  const { user } = useAuth(); // 👈 get current user
  const [notes, setNotes] = useState<Note[]>([]);
  const notesCollectionRef = collection(db, "notes");

  const fetchNotes = async () => {
    if (!user) return;

    const q = query(notesCollectionRef, where("uid", "==", user.uid)); // 👈 only get notes for this user
    const querySnapshot = await getDocs(q);
    const notesData = querySnapshot.docs.map((doc) => doc.data() as Note);
    setNotes(notesData);
  };

  useEffect(() => {
    fetchNotes();
    // 👇 re-fetch when user changes
  }, [user]);

  const addNote = async (text: string, category: string) => {
    if (!text.trim() || !user) return;

    const note = {
      text,
      category: category || "focus",
      uid: user.uid, // 👈 link to user
    };

    await addDoc(notesCollectionRef, note);
    fetchNotes();
  };

  const deleteNote = async (noteText: string) => {
    if (!user) return;

    const q = query(notesCollectionRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const docToDelete = querySnapshot.docs.find(
      (doc) => doc.data().text === noteText
    );

    if (docToDelete) {
      await deleteDoc(doc(db, "notes", docToDelete.id));
      fetchNotes();
    }
  };

  const editNote = async (oldText: string, newText: string) => {
    if (!newText.trim() || !user) return;

    const q = query(notesCollectionRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const docToUpdate = querySnapshot.docs.find(
      (doc) => doc.data().text === oldText
    );

    if (docToUpdate) {
      await updateDoc(doc(db, "notes", docToUpdate.id), { text: newText });
      setNotes((prev) =>
        prev.map((note) =>
          note.text === oldText ? { ...note, text: newText } : note
        )
      );
    }
  };

  return { notes, addNote, deleteNote, editNote };
};
