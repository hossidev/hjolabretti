import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import Image from "next/image";
import { FC } from "react";
import { Bounded } from "@/components/Bounded";
import { LazyYouTubePlayer } from "./LazyYoutubePlayer";
const MASK_CLASSES =
  "[mask-image:url(/video-mask.png)] [mask-mode:alpha] [mask-position:center_center] [mask-repeat:no-repeat] [mask-size:100%_auto]";

/**
 * Props for `VideoBlock`.
 */
export type VideoBlockProps = SliceComponentProps<Content.VideoBlockSlice>;

/**
 * Component for "VideoBlock" Slices.
 */
const VideoBlock: FC<VideoBlockProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-zinc-900"
    >
      <h2 className="sr-only">Myndskeið</h2>
      <div className="relative aspect-video">
        {/* Masks */}
        <div
          className={clsx(
            "bg-brand-lime absolute inset-0 ~translate-x-2/3 ~translate-y-2/3",
            MASK_CLASSES
          )}
        ></div>
        <div
          className={clsx(
            "bg-white absolute inset-0 ~translate-x-1/3 ~translate-y-1/2",
            MASK_CLASSES
          )}
        ></div>
        <div
          className={clsx(
            "bg-white absolute inset-0 ~translate-x-1/2 ~-translate-y-1/3",
            MASK_CLASSES
          )}
        ></div>
        {/* Video */}
        <div className={clsx("relative h-full", MASK_CLASSES)}>
          {isFilled.keyText(slice.primary.youtube_video_id) && (
            <LazyYouTubePlayer youTubeID={slice.primary.youtube_video_id} />
          )}
        </div>
        {/* Texture Overlay */}
        <Image
          src="/image-texture.png"
          alt=""
          fill
          className="pointer-events-none object-cover opacity-50"
        />
      </div>
    </Bounded>
  );
};

export default VideoBlock;
