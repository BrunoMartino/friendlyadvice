import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { GoPlus } from 'react-icons/go';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import { MdUndo } from 'react-icons/md';
import { Container } from './input-file-upload.style';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const InputFileUpload: React.FC<any> = ({
  id,
  width,
  height,
  handleChange,
  initialImage,
  reloadFlag,
  disabled,
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = useState<any>();
  const [image, setImage] = useState<any>(initialImage);
  const [sideMenu, setSideMenu] = useState<boolean>(false);
  const [dataImage, setDataImage] = useState<any>();

  const inputFile = useRef<any>();

  const reduxRefImage = useSelector(
    (state: any) => state.session.cadastroProduto.imagem,
  );
  const imagemAntiga = useSelector(
    (state: any) => state.session.cadastroProduto.produto.imagem,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (initialImage) {
      setImageLoaded(initialImage);
    }

    return () => clearImage();
  }, [initialImage]);

  useEffect(() => {
    if (reduxRefImage === null) {
      clearImage();
    }
  }, [reduxRefImage]);

  useEffect(() => {
    const imagem = imageLoaded || image;
  }, [imageLoaded, image]);

  const exibirImagem = useCallback((e: any) => {
    e.persist();
    const { files } = e.target;

    if (files.length > 0) {
      setImageLoaded(URL.createObjectURL(files[0]));
      const { size, type } = files[0];
      const imgSize = size / 1000;
      const imgTipo = type.split('/');
      setDataImage({
        size: parseFloat(imgSize.toString()).toFixed(2),
        tipo: imgTipo[1].toUpperCase(),
      });

      handleChange(id, files[0]);
    }
  }, []);

  const toggleMenu = useCallback(() => {
    setSideMenu((prev: any) => !prev);
  }, []);

  const backToImageOriginal = useCallback(() => {
    if (initialImage) {
      setImage(initialImage);
      setImageLoaded(null);
      if (imagemAntiga) {
        handleChange(id, imagemAntiga);
      }
    }
  }, [imagemAntiga]);

  const clearImage = useCallback(() => {
    if (inputFile.current) {
      setSideMenu(false);
      setImageLoaded(null);
      setImage(null);
      inputFile.current.value = '';
      handleChange(id, null);
    }
  }, [inputFile]);

  return (
    <Container width={width} height={height} disabled={disabled}>
      {(imageLoaded || image || initialImage) && (
        <span className="menu" onClick={disabled ? () => {} : toggleMenu}>
          <BsThreeDotsVertical color="black" size="20" />
        </span>
      )}
      <input
        onChange={(e: any) => exibirImagem(e)}
        id={id}
        ref={inputFile}
        accept="image/jpg, image/jpeg"
        type="file"
        {...props}
        hidden
        disabled={disabled}
      />
      <label
        htmlFor={id}
        // style={{
        //   backgroundColor: 'rgba(255,255,255,0.4)',
        //   borderRadius: '2rem',
        // }}
      >
        <GoPlus
          className="addIcon"
          style={{
            border: '0.2rem double rgba(255, 255, 255, 0.8)',
            borderRadius: '2rem',
          }}
          color="black"
          size={30}
        />
        <div className="tipoImagem">JPG</div>
      </label>
      {/* <img src={imageLoaded || image} /> */}
      <LazyLoadImage src={imageLoaded || image} />
      {sideMenu && (image || imageLoaded || initialImage) && (
        <div className="side-menu">
          <span>
            <MdUndo size={15} color="blue" onClick={backToImageOriginal} />
          </span>
          <span>
            <BsTrash size={15} color="red" onClick={clearImage} />
          </span>
        </div>
      )}
      {(image || imageLoaded) && dataImage && (
        <div className="status-menu">
          <span>Tipo: {dataImage.tipo}</span>
          <span>Tam.: {dataImage.size} Kb</span>
        </div>
      )}
    </Container>
  );
};

export default InputFileUpload;
