import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

interface Note {
  text: string;
  category: string;
}

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const notesCollectionRef = collection(db, "notes");

  const fetchNotes = async () => {
    const querySnapshot = await getDocs(notesCollectionRef);
    const notesData = querySnapshot.docs.map((doc) => doc.data() as Note);
    setNotes(notesData);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (text: string, category: string) => {
    if (!text.trim()) return;
    const note = { text, category: category || "focus" };
    await addDoc(notesCollectionRef, note);
    fetchNotes();
  };

  const deleteNote = async (noteText: string) => {
    const querySnapshot = await getDocs(notesCollectionRef);
    const docToDelete = querySnapshot.docs.find(
      (doc) => doc.data().text === noteText
    );
    if (docToDelete) {
      await deleteDoc(doc(db, "notes", docToDelete.id));
      fetchNotes();
    }
  };

  const editNote = async (oldText: string, newText: string) => {
    if (!newText.trim()) return;
    const querySnapshot = await getDocs(notesCollectionRef);
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
