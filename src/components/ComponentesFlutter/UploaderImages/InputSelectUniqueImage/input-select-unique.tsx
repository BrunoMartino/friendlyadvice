import React, {
  useState,
  useRef,
  ReactElement,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import {
  ImageBox,
  InputContainerImagem,
  PreviewContainerImagem,
  RemoveButton,
} from '../../shared-styles';
import { UploaderImagesFlutter } from '../index-upload-flutter';

interface IInputProps {
  text: string;
  icon?: ReactElement;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const InputSelectImageUnique = forwardRef(
  ({ text, icon, onClick }: IInputProps, ref) => {
    const [image, setImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setImage(e.target.files[0]);
      }
    };

    const handleIconClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const removeImage = () => {
      setImage(null);
    };

    useImperativeHandle(ref, () => ({
      handleImageChange,
    }));

    return (
      <InputContainerImagem>
        <div
          className="input-area"
          onClick={(e) => {
            handleIconClick();
            onClick && onClick(e);
          }}
        >
          <div className="icon">{icon ? icon : <FaPlus />}</div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            name="fileSelectUniq"
            id="fileSelectUniq"
          />
          <p>{text}</p>
        </div>
        <PreviewContainerImagem>
          {image && (
            <UploaderImagesFlutter.ImageHandler
              configDisplay={{ blob: image, convertedBlob: false }}
              index={0}
              removeImage={removeImage}
            />
          )}
        </PreviewContainerImagem>
      </InputContainerImagem>
    );
  },
);
