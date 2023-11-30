import { useState, useCallback } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

type ProfileFileUploaderProps = {
  fieldChange: (Files: File[]) => void;
  mediaUrl: string;
};

const ProfileFileUploader = ({
  fieldChange,
  mediaUrl,
}: ProfileFileUploaderProps) => {
  const [file, setFile] = useState<File[]>();
  const [fileUrl, setFileUrl] = useState(mediaUrl || "");

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
  });

  return (
    <div className="flex items-center gap-3 cursor-pointer" {...getRootProps()}>
      <input className="cursor-pointer " {...getInputProps()} />

      <img
        src={fileUrl}
        alt="file image"
        className="w-12 h-12 lg:w-20 lg:h-20 rounded-full object-cover"
      />
      <p className="text-light-3 lg:body-medium">Change profile photo</p>
    </div>
  );
};

export default ProfileFileUploader;
