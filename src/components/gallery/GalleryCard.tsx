import { FC } from "react";

export type galleryType = {
  img: string;
  id: number;
  isSelected: boolean;
};

interface props {
  imageData: galleryType;
  index: number;
  onChange: (id: number) => void;
}

const GalleryCard: FC<props> = ({ imageData, onChange }) => {
  return (
    <div className={`h-fit group cursor-pointer`}>
      <div className="relative overflow-hidden">
        <img
          className="object-cover border bg-[#edf2f7]  rounded-md"
          src={imageData?.img}
          alt=""
        />
        <div
          className={` ${
            imageData?.isSelected && "opacity-100 bottom-0"
          } absolute h-full  w-full  bg-black/50 rounded-md   group-hover:bottom-0  group-hover:opacity-100 transition-all duration-500`}
        >
          <div className="pl-4 pt-2">
            <input
              className="cursor-pointer"
              onChange={() => {
                onChange(imageData?.id);
              }}
              type="checkbox"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
