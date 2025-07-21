import Image from "next/image";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface QuotifyPreviewProp {
  image: string;
  onReset: () => void;
}

export default function QuotifyPreview({ image, onReset }: QuotifyPreviewProp) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Your Quote is Ready ✨</DialogTitle>
        <DialogDescription className="text-muted-foreground">
          Share or download your customized quote image.
        </DialogDescription>
      </DialogHeader>

      <div className="flex justify-center w-full px-4">
        <div className="flex flex-col gap-2 w-full max-w-[500px]">
          <div className="w-full aspect-[5/4] relative rounded-xl overflow-hidden">
            <Image
              src={image}
              alt="Final quote result"
              fill={true}
              className="object-cover"
            />
          </div>

          <Button
            onClick={onReset}
            variant="ghost"
            className="
          px-4 py-2 text-sm font-medium rounded-full
          backdrop-blur-md bg-[#6320EE]/50 text-white
          border border-white/20 shadow-md
          transition hover:bg-[#A6B1E1]/40 active:scale-95
          w-full cursor-pointer"
          >
            Reset
          </Button>
        </div>
      </div>
    </>
  );
}
