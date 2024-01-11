import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  useCreateUserAccountMutation,
  useSignInAccount,
} from "@/lib/react-query/queries";
import { SignUpValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/lib/zustand/useAuthStore";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Context
  const { checkAuthUser } = useAuthStore();

  // Queries
  const { mutateAsync: createUserAccount, status: createUserAccountStatus } =
    useCreateUserAccountMutation();
  const { mutateAsync: SignInAccount } = useSignInAccount();

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // Submit Handler
  const submitHandler = async (values: z.infer<typeof SignUpValidation>) => {
    try {
      const newUser = await createUserAccount(values);

      if (!newUser) return toast({ title: "Sign up failed! please try again" });

      const session = await SignInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session) return toast({ title: "Sign in failed! please try again" });

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate("/");
      } else {
        return toast({ title: "Sign in failed! please try againg" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-8">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Snapgram, please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {createUserAccountStatus === "pending" ? (
              <div className="flex-center gap-2">
                <Loader />
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to={"/sign-in"}
              className="text-primary-500 text-small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignUp;
