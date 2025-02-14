import React from 'react';
import { ImageBox, RemoveButton } from '../../shared-styles';
import { FaTimes } from 'react-icons/fa';

interface IImageHandlerProps {
  configDisplay: {
    blob: any;
    convertedBlob: boolean;
  };
  index: number | string;
  alt?: string;
  removeImage: (index: number | string) => void;
  onRemove?: (image: File | string) => void;
}

export const ImageHandler = ({
  configDisplay: { blob, convertedBlob },
  alt,
  index,
  removeImage,
  onRemove,
}: IImageHandlerProps) => {
  return (
    <ImageBox key={index}>
      <img
        src={convertedBlob ? blob : URL.createObjectURL(blob)}
        alt={`${alt}`}
      />
      <RemoveButton onClick={(e) => {
        removeImage(index)
        onRemove && onRemove(convertedBlob ? blob : URL.createObjectURL(blob))
        e.preventDefault()
        }}>
        <FaTimes />
      </RemoveButton>
    </ImageBox>
  );
};
