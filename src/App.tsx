import { useState } from "react";
import { GalleryCard } from "./components/gallery";
import SortableList, { SortableItem } from "react-easy-sort";
import { mockData } from "./assets/mockData";
import { galleryType } from "./components/gallery/interface";

const App = () => {
  const [galleryData, setGalleryData] = useState<galleryType[]>(mockData);

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

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    const cloneGalleryData = [...galleryData];
    if (newIndex !== -1 && oldIndex !== -1) {
      const [draggedItem] = cloneGalleryData.splice(oldIndex, 1);
      cloneGalleryData.splice(newIndex, 0, draggedItem);
      setGalleryData(cloneGalleryData);
    }
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
        <SortableList
          onSortEnd={onSortEnd}
          className="list grid grid-rows-4  grid-cols-3 gap-2 md:grid-rows-4  md:grid-cols-4 md:gap-4  lg:grid-rows-4  lg:grid-cols-5 lg:gap-5"
          draggedItemClassName="dragged"
        >
          {galleryData?.map((item: galleryType, index: number) => (
            <SortableItem>
              <div className={`item ${index === 0 && "col-span-2 row-span-2"}`}>
                <GalleryCard
                  onChange={handleOnSelect}
                  key={item?.id}
                  imageData={item}
                  index={index}
                />
              </div>
            </SortableItem>
          ))}
        </SortableList>
      </div>
    </div>
  );
};

export default App;
