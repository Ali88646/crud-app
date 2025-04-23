"use client";
import React, { useState } from "react";
import UserForm from "./UserForm";
import UsersList from "./UsersList";

const Wrapper = () => {
  const [userValues, setUserValues] = useState<{
    id: string;
    username: string;
    email: string;
    phoneNumber: string;
  } | null>(null);

  return (
    <div className="flex-1 grid md:grid-cols-2">
      <UserForm userValues={userValues} setUserValues={setUserValues} />
      <UsersList setUserValues={setUserValues} />
    </div>
  );
};

export default Wrapper;
