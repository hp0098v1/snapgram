import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import { ProfileValidation } from "@/lib/validation";
import { useGetCurrentUser, useUpdateUser } from "@/lib/react-query/queries";
import ProfileFileUploader from "@/components/shared/ProfileFileUploader";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/lib/zustand/useAuthStore";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { setUser } = useAuthStore();

  // Queries
  const { data: user, isFetching } = useGetCurrentUser();
  const { mutateAsync: updateUser, isPending: isUpdateUserPending } =
    useUpdateUser();

  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: user?.name,
      username: user?.username,
      bio: user?.bio || "",
    },
  });

  const submitHandler = async (values: z.infer<typeof ProfileValidation>) => {
    if (user) {
      const updatedUser = await updateUser({
        userId: user?.$id,
        imageId: user?.imageId,
        imageUrl: user?.imageUrl,
        ...values,
      });

      if (!updatedUser) {
        toast({ title: "Update failed" });

        throw Error;
      }

      setUser({
        name: updatedUser?.name,
        username: updatedUser?.username,
        bio: updatedUser?.bio,
        imageUrl: updatedUser?.imageUrl,
        id: updatedUser.$id,
        email: user?.email,
      });
      navigate(`/profile/${user.$id}`);
    }
  };

  if (isFetching) return <Loader />;

  return (
    <div className="common-container">
      <div className=" max-w-5xl flex-start gap-3 w-full">
        <img
          src="/assets/icons/edit.svg"
          alt="add"
          className="w-8 h-8 md:w-12 md:h-12"
        />
        <h2 className="body-bold md:h2-bold w-full">Edit Profile</h2>
      </div>

      <Form {...form}>
        <div className=" w-full max-w-5xl flex flex-col">
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="flex-1 flex flex-col gap-5 mt-4"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ProfileFileUploader
                      fieldChange={field.onChange}
                      mediaUrl={user?.imageUrl}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      className="shad-textarea custom-scrollbar"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                className="shad-button_primary"
                disabled={isUpdateUserPending}
              >
                {isUpdateUserPending && (
                  <div className="flex-center gap-2">
                    <Loader />
                  </div>
                )}
                Update Profile
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default UpdateProfile;
