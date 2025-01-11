"use client"

import { toast } from "@/hooks/use-toast";
import config from "@/lib/config";
import {
  IKImage,
  ImageKitProvider,
  IKUpload,
} from "imagekitio-next";
import { IKUploadResponse, UploadError } from "imagekitio-next/dist/types/components/IKUpload/props";
import Image from "next/image";
import { useRef, useState } from "react";

const {
  env: {
    imageKit: { publicKey, privateKey, urlEndpoint },
    apiEndpoint
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;
    return { token, expire, signature };
  } catch (error:any) {
    throw new Error(`Authentication request failed: ${error?.message || ""}`);
  }
}

const ImageUpload = ({
  onFileChange
}: {
  onFileChange: (fielPath: string) => void
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null)

  const onError = (err: UploadError) => {
    console.log(err);
    toast({
      title: "Image upload failed",
      description: `Your image could not be uploaded successfully`,
      variant: "destructive",
    });
  }
  const onSuccess = (res: IKUploadResponse) => {
    setFile(res);
    onFileChange(res.filePath)

    toast({
      title: "Image uploaded successfully",
      description: `${res.filePath} uploaded successfully`
    });
  }

  const onClickUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if(ikUploadRef.current){
      // @ts-expect-error click is not detected
      ikUploadRef.current?.click()
    }
  }

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload 
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />

      <button className="upload-btn" onClick={onClickUpload}>
        <Image src={"/icons/upload.svg"} alt="upload-icon" width={20} height={20} className="object-contain" />

        <p className="text-base text-light-100">Upload a File</p>
        {file && <p className="upload-filename">{file?.filePath}</p>}
      </button>

      {file && (
        <IKImage 
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={500}
        />
      )}
    </ImageKitProvider>
  )
}

export default ImageUpload;