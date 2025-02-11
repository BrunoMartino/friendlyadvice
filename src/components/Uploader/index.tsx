import React, { useState, useRef } from 'react';
import { FileInfo, FileUploaderContainer, Text, UploadButton } from './styled';
import { useDispatch } from 'react-redux';
import { abrirMensagem } from '../../store/modules/Components/SnackBar/action';
import { TipoMensagem } from '../SnackBar/interface';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, accept = 'csv' }) => {
  const [dragging, setDragging] = useState(false);
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: number;
    type: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type !== 'text/csv') {
        dispatch(
          abrirMensagem({
            open: true,
            mensagem: 'Tipo de arquivo inválido. O arquivo DEVE ser .csv',
            tipo: TipoMensagem.ERRO,
          }),
        );
        return;
      }
      onFileSelect(file);
      setFileInfo({ name: file.name, size: file.size, type: file.type });
      e.dataTransfer.clearData();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type !== 'text/csv') {
        dispatch(
          abrirMensagem({
            open: true,
            mensagem: 'Tipo de arquivo inválido. O arquivo DEVE ser .csv',
            tipo: TipoMensagem.ERRO,
          }),
        );
        return;
      }
      onFileSelect(file);
      setFileInfo({ name: file.name, size: file.size, type: file.type });
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <FileUploaderContainer
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      dragging={dragging}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".csv"
        style={{ display: 'none' }}
      />
      <Text>
        ARRASTE E SOLTE O ARQUIVO AQUI
        <br />
        ou se preferir...
      </Text>
      <UploadButton>Escolha o arquivo para fazer upload</UploadButton>
      {fileInfo && (
        <FileInfo>
          <p>
            <strong>Nome do Arquivo:</strong> {fileInfo.name}
          </p>
          <p>
            <strong>Tamanho:</strong> {fileInfo.size} bytes
          </p>
          <p>
            <strong>Tipo:</strong> {fileInfo.type}
          </p>
        </FileInfo>
      )}
    </FileUploaderContainer>
  );
};

export default FileUploader;
