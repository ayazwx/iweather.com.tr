"use client"
import { useFirebase } from "@/context/FirebaseContext";
import ThemeSwitcher from "@/theme/ThemeSwitcher";
import Image from "next/image";
import React, { useContext, useEffect } from "react";

export default function Page() {
  // const {data, setData, city, setCity} = useContext(DataContext);
  // console.log(data);
  const {signInEmailPassword, createUserEmailPassword} = useFirebase();

  // useEffect(() => {
  //   // signInEmailPassword("hello@gmail.com", "password");
  //   createUserEmailPassword("helloworld@gmail.com", "password").then((userCredential) => {
  //     const user = userCredential.user;
  //     console.log(user);
      
  //   })
  // }
  // , []);

  return (
    <main className="m-0 p-0 bg-white dark:bg-black">
      login
    </main>
  );
}
