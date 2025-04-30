"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { db } from "@/app/fireabse/firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { SetUser, User } from "../../types";
import toast from "react-hot-toast";

const UsersList = ({ setUserValues }: { setUserValues: SetUser }) => {
  const [users, setUsers] = useState<User[] | null | []>(null);

  const collectionRef = collection(db, "users");
  useEffect(() => {
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(() => {
        return docs && docs.length ? docs : [];
      });
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteUser = async (id: string) => {
    const deleteRef = doc(collectionRef, id);
    try {
      await deleteDoc(deleteRef);
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error("An Error Occured");
    }
  };
  const handleSetUserValues = (user: User) => {
    setUserValues(user);
  };

  return (
    <>
      <div className="p-6 flex flex-col gap-6 relative">
        <h2 className="text-3xl font-semibold">Users List</h2>
        {users && users.length ? (
          users.map((user, i) => (
            <div
              className="flex gap-3 px-3 py-2 items-center bg-gray-100 rounded-lg"
              key={i}
            >
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>{user.phoneNumber}</p>
              <div className="flex-1 flex justify-end gap-3">
                <Button
                  variant={"outline"}
                  className="cursor-pointer"
                  onClick={() => handleSetUserValues(user)}
                >
                  Edit
                </Button>
                <Button
                  variant={"destructive"}
                  className="cursor-pointer"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : !users ? (
          <div className="flex-1 flex items-center justify-center">
            <h2 className="text-3xl font-semibold">Loading...</h2>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <h2 className="text-3xl font-semibold">No users found</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default UsersList;
