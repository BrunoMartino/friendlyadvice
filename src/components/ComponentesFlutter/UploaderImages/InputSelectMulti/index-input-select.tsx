import React, { useState, useRef, ReactElement } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import {
  ImageBox,
  InputContainerImagem,
  PreviewContainerImagem,
  RemoveButton,
} from '../../shared-styles';
import { UploaderImagesFlutter } from '../index-upload-flutter';

interface IIputProps {
  text: string;
  icon?: ReactElement;
  getImage: (image: File[]) => void;
  onRemove?: (imageFile: File | string) => void;
}

export const InputSelectImageMulti = ({
  text,
  icon,
  getImage,
  onRemove,
}: IIputProps) => {
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
      getImage([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    getImage(images.filter((_, i) => i !== index));
  };

  return (
    <InputContainerImagem>
      <div className="input-area" onClick={handleIconClick}>
        <div className="icon">{icon ? icon : <FaPlus />}</div>
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleImageChange}
          name="fileSelectMultiple"
          id="fileSelectMultiple"
        />
        <p>{text}</p>
      </div>
      <PreviewContainerImagem>
        {images.map((image, index) => (
          <React.Fragment key={index}>
          <UploaderImagesFlutter.ImageHandler
            configDisplay={{
              blob: image,
              convertedBlob: false,
            }}
            index={index}
            removeImage={() => {
              removeImage(index);
            }}
            onRemove={onRemove}
          />
          </React.Fragment>
        ))}
      </PreviewContainerImagem>
    </InputContainerImagem>
  );
};
