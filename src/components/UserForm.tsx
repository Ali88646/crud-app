"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/app/fireabse/firebase";
import { useEffect } from "react";
import { SetUser, User } from "../../types";
import toast from "react-hot-toast";

const userSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),

  email: z.string().email("Invalid email address"),

  phoneNumber: z
    .string()
    .regex(
      /^(\+?\d{1,3}[- ]?)?\d{8}$/,
      "Phone number must be 10 digits (optionally include country code)"
    ),
});

const UserForm = ({
  userValues,
  setUserValues,
}: {
  userValues: User | null;
  setUserValues: SetUser;
}) => {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
  });

  const formResetValues = {
    username: "",
    email: "",
    phoneNumber: "",
  };

  // if user values change form values will change accordingly
  useEffect(() => {
    if (userValues) {
      form.reset({
        username: userValues.username,
        email: userValues.email,
        phoneNumber: userValues.phoneNumber,
      });
    }
  }, [userValues, form.reset]);

  const dbRef = collection(db, "users");

  // handeling both update and add logic in one function
  const onSubmit = async (e: z.infer<typeof userSchema>) => {
    if (userValues) {
      try {
        const updateRef = doc(dbRef, userValues.id);
        setUserValues(null);
        await updateDoc(updateRef, { ...e });
        toast.success("Updated Successfully");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const dbRef = collection(db, "users");
        await addDoc(dbRef, { ...e });
        toast.success("User has been added");
      } catch (error) {
        console.log(error);
      }
    }
    form.reset(formResetValues);
  };

  return (
    <div className="py-6 px-16 space-y-6">
      <h2 className="text-3xl font-semibold">
        {userValues ? "Update User Details" : "Add user Details"}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-heading-color">Username</FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-slate-300 "
                    placeholder="Enter your username"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-heading-color">Email</FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-slate-300"
                    placeholder="Enter your email"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-heading-color">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-slate-300"
                    placeholder="Enter your phone number"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-x-3">
            <Button type="submit" className="cursor-pointer">
              {userValues ? "Update" : "Add"}
            </Button>
            {userValues && (
              <Button
                onClick={() => {
                  setUserValues(null);
                  form.reset(formResetValues);
                }}
                variant={"destructive"}
                className="cursor-pointer"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserForm;
