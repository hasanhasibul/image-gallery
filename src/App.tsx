import image1 from "./assets/images/image-1.webp";
import image2 from "./assets/images/image-2.webp";
import image3 from "./assets/images/image-3.webp";
import image4 from "./assets/images/image-4.webp";
import image5 from "./assets/images/image-5.webp";
import image6 from "./assets/images/image-6.webp";
import image7 from "./assets/images/image-7.webp";
import image8 from "./assets/images/image-8.webp";
import image9 from "./assets/images/image-9.webp";
import image10 from "./assets/images/image-10.jpeg";
import image11 from "./assets/images/image-11.jpeg";
import { useRef, useState } from "react";
import { GalleryCard } from "./components/gallery";
import { galleryType } from "./components/gallery/GalleryCard";

const App = () => {
  const [galleryData, setGalleryData] = useState<galleryType[]>([
    { id: 1, img: image1, isSelected: false },
    { id: 2, img: image2, isSelected: false },
    { id: 3, img: image3, isSelected: false },
    { id: 4, img: image4, isSelected: false },
    { id: 5, img: image5, isSelected: false },
    { id: 6, img: image6, isSelected: false },
    { id: 7, img: image7, isSelected: false },
    { id: 8, img: image8, isSelected: false },
    { id: 9, img: image9, isSelected: false },
    { id: 10, img: image10, isSelected: false },
    { id: 11, img: image11, isSelected: false },
  ]);

  const dragItem = useRef<number>(0);
  const draggedOverItem = useRef<number>(0);

  function handleSort() {
    const galleryClone = [...galleryData];
    const temp = galleryClone[dragItem.current];
    galleryClone[dragItem.current] = galleryClone[draggedOverItem.current];
    galleryClone[draggedOverItem.current] = temp;
    setGalleryData(galleryClone);
  }

  const handleOnSelect = (id: number) => {
    const newList = galleryData?.map((item: galleryType) => {
      if (item?.id === id) {
        return {
          ...item,
          isSelected: !item?.isSelected,
        };
      } else {
        return {
          ...item,
        };
      }
    });
    setGalleryData(newList);
  };

  const selectedFileCount = galleryData?.filter(
    (item: galleryType) => item?.isSelected
  )?.length;

  const handleDeleteFiles = () => {
    const selectedFileCount = galleryData?.filter(
      (item: galleryType) => !item?.isSelected
    );
    setGalleryData(selectedFileCount);
  };

  return (
    <div className="bg-[#edf2f7] md:py-5 md:px-16 py-3 px-8 ">
      <div className="bg-white border  p-4 md:p-8 rounded-md shadow-sm">
        {selectedFileCount > 0 ? (
          <div className="flex justify-between items-center">
            <div>
              <input checked={selectedFileCount > 0} type="checkbox" />{" "}
              <span className="text-black font-medium text-base">
                {selectedFileCount} Files Selected
              </span>
            </div>
            <div>
              <button onClick={handleDeleteFiles} className="text-red-500">
                Delete Files
              </button>
            </div>
          </div>
        ) : (
          <h2 className="text-lg  font-semibold leading-4">Gallery</h2>
        )}

        <hr className="my-4" />
        <div className="grid grid-rows-4  grid-cols-3 gap-2 md:grid-rows-4  md:grid-cols-4 md:gap-4  lg:grid-rows-4  lg:grid-cols-5 lg:gap-5">
          {galleryData?.map((item: galleryType, index: number) => {
            return (
              <div
                key={item?.id}
                draggable
                onDragStart={() => (dragItem.current = index)}
                onDragEnter={() => (draggedOverItem.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
                className={`${index === 0 && "col-span-2 row-span-2"}`}
              >
                <GalleryCard
                  onChange={handleOnSelect}
                  key={item?.id}
                  imageData={item}
                  index={index}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
