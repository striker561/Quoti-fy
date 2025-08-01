import Image from "next/image";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Save } from "lucide-react";
import { useState } from "react";
import { shareUsingShareAPI, toastFailure, toastSuccess } from "@/lib/generic";
import { QuotifyMetaDataRequest } from "@/types/requests";
import { APIResponse } from "@/types/responses";
import { apiRequest } from "@/lib/apiRequest";

interface QuotifyPreviewProp {
  image: string;
  onReset: () => void;
  metadata: QuotifyMetaDataRequest;
}

export default function QuotifyPreview({
  image,
  onReset,
  metadata,
}: QuotifyPreviewProp) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const res = await fetch(image);
      const blob = await res.blob();
      const pngBlob =
        blob.type === "image/png"
          ? blob
          : await blob
              .arrayBuffer()
              .then((buffer) => new Blob([buffer], { type: "image/png" }));

      const link = document.createElement("a");
      link.href = URL.createObjectURL(pngBlob);
      link.download = `quotify-${new Date().toISOString().slice(0, 10)}.png`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      toastFailure("Failed to download image");
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result: APIResponse = await apiRequest({
        method: "POST",
        url: "/quotify",
        data: metadata,
      });
      toastSuccess(result.message);
      shareUsingShareAPI({
        title: "Quoti-Fy",
        text: metadata.quotifyReq.quote,
        url: window.location.href,
      });
    } catch (err) {
      console.log(err);
      toastFailure(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const isBusy = isDownloading || isSaving;

  return (
    <>
      <DialogHeader>
        <DialogTitle>Your Quote is Ready ✨</DialogTitle>
        <DialogDescription className="text-muted-foreground">
          Share or download your customized quote image.
        </DialogDescription>
      </DialogHeader>

      <div className="flex justify-center w-full px-4">
        <div className="flex flex-col gap-4 w-full max-w-[500px] items-center">
          <div className="w-full relative rounded-xl overflow-hidden shadow-md">
            <Image
              src={image}
              alt="Final quote result"
              layout="intrinsic"
              width={800}
              height={600}
              className="w-full h-auto rounded-xl"
            />
          </div>

          <p className="text-xs text-muted-foreground mt-1">{today}</p>

          {!isBusy && (
            <Button
              onClick={onReset}
              variant="ghost"
              className="px-4 py-2 text-sm font-medium rounded-full backdrop-blur-md bg-[#6320EE]/50 text-white border border-white/20 shadow-md transition hover:bg-[#A6B1E1]/40 active:scale-95 w-full cursor-pointer"
            >
              Reset
            </Button>
          )}

          <div className="flex gap-2 w-full">
            <Button
              onClick={handleSave}
              disabled={isBusy}
              className="flex-1 px-4 py-2 text-sm font-medium rounded-full bg-[#A6B1E1] text-[#1F1B2E] hover:bg-[#C3C8F5] transition active:scale-95 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving.." : "Save"}
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 px-4 py-2 text-sm font-medium rounded-full bg-[#1F1B2E] text-white hover:bg-[#3A3650] transition active:scale-95 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? "Downloading..." : "Download"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
