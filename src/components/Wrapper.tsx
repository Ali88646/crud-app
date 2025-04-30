"use client";
import React, { useState } from "react";
import UserForm from "./UserForm";
import UsersList from "./UsersList";
import { User } from "../../types";

const Wrapper = () => {
  const [userValues, setUserValues] = useState<User | null>(null);

  return (
    <div className="flex-1 grid md:grid-cols-2">
      <UserForm userValues={userValues} setUserValues={setUserValues} />
      <UsersList setUserValues={setUserValues} />
    </div>
  );
};

export default Wrapper;
