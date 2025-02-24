"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { useCoverImage } from "@/lib/hooks/useCoverImage";
import { useState } from "react";
// import { toast } from "sonner";
import { useParams } from "next/navigation";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";
import Image from "next/image";

interface ImageModalProps {
  children: React.ReactNode;
  filePath: string;
  title?: string;
  // description?: string;
  // onConfirm: () => void;
}

const ImageModal = ({ children, filePath, title }: ImageModalProps) => {
  // const coverImage = useCoverImage();
  const [open, setOpen] = useState(false);
  const params = useParams();

  const onClose = () => {
    // coverImage.onClose();
  };

  return (
    <Dialog>
      <DialogTrigger onClick={(e) => e.stopPropagation()} asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <DialogTitle hidden />
          <h2 className="text-center text-lg font-medium">
            {title || "Image"}
          </h2>
        </DialogHeader>
        <div
          className="w-full h-[100px] md:h-[500px] px-5 py-3"
          style={{ position: "relative" }}
        >
          <IKImage
            alt="image-dialog"
            path={filePath}
            fill
            urlEndpoint={config.env.imageKit.urlEndpoint}
            loading="lazy"
            lqip={{ active: true }}
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
