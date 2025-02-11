import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CanvasContainer } from './styled-canvas';
import Button from '../Button/button-componente';
import { ButtonThemes } from '../Button/ButtonThemesEnum';

export const CanvasDrawing = styled.div`
  border-radius: 1rem;
  border: 2px solid #ccc;
  display: inline-block;
  padding: 0.5rem;

  canvas {
    width: 100%; // Preenche a largura do contêiner
    height: ${({ height }: { height?: number }) =>
      height ? `${height}px` : 'auto'};
    display: block;
  }
`;

interface SignatureCanvasProps {
  lineWidth?: number;
  height?: number;
  getImage: (image: string) => void;
  getImageBlob?: (image: File) => void;
  handleOpenOrClose: () => void;
}

const SignatureCanvas = ({
  lineWidth = 4,
  height,
  getImage,
  getImageBlob,
  handleOpenOrClose,
}: SignatureCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef<boolean>(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [backColor, setBackColor] = useState<string>('white');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctxRef.current = ctx;
        applySettings(ctx, canvas);
        setupCanvasEvents(canvas);
      }
    }

    return () => {
      const canvas = canvasRef.current;
      if (canvas) {
        cleanUpCanvasEvents(canvas);
      }
    };
  }, [backColor]);

  const applySettings = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ) => {
    const containerWidth = canvas.parentElement
      ? canvas.parentElement.clientWidth
      : 500;

    // Definir o tamanho real do canvas em pixels
    canvas.width = containerWidth;
    canvas.height = height || containerWidth;
    // canvas.height = height || containerWidth * 0.6;

    ctx.lineWidth = lineWidth;
    ctx.imageSmoothingEnabled = true;

    // Definir a cor de fundo
    if (backColor) {
      ctx.fillStyle = backColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  const setupCanvasEvents = (canvas: HTMLCanvasElement) => {
    canvas.addEventListener('mousedown', onCanvasMouseDown);
    canvas.addEventListener('mouseup', onCanvasMouseUp);
    canvas.addEventListener('mousemove', onCanvasMouseMove);
    // Eventos de touch para telas sensíveis
    canvas.addEventListener('touchstart', handleTouchEvent);
    canvas.addEventListener('touchend', handleTouchEventEnd);
    canvas.addEventListener('touchmove', handleTouchEventMove);
  };

  const cleanUpCanvasEvents = (canvas: HTMLCanvasElement) => {
    canvas.removeEventListener('mousedown', onCanvasMouseDown);
    canvas.removeEventListener('mouseup', onCanvasMouseUp);
    canvas.removeEventListener('mousemove', onCanvasMouseMove);
  };

  const onCanvasMouseDown = (evt: MouseEvent) => {
    if (!ctxRef.current || !canvasRef.current) return;
    const pos = getPos(canvasRef.current, evt);
    ctxRef.current.moveTo(pos.x, pos.y);
    drawingRef.current = true;
  };

  const onCanvasMouseUp = () => {
    drawingRef.current = false;
  };

  const onCanvasMouseMove = (evt: MouseEvent) => {
    if (!drawingRef.current || !ctxRef.current || !canvasRef.current) return;
    const pos = getPos(canvasRef.current, evt);
    ctxRef.current.lineTo(pos.x, pos.y);
    ctxRef.current.stroke();
  };

  const getPos = (canvasDom: HTMLCanvasElement, mouseEvent: MouseEvent) => {
    const clientRect = canvasDom.getBoundingClientRect();
    const scaleX = canvasDom.width / clientRect.width;
    const scaleY = canvasDom.height / clientRect.height;

    // Ajusta as coordenadas conforme o redimensionamento
    return {
      x: (mouseEvent.clientX - clientRect.left) * scaleX,
      y: (mouseEvent.clientY - clientRect.top) * scaleY,
    };
  };

  const handleTouchEvent = (evt: TouchEvent) => {
    const touch = evt.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    canvasRef.current?.dispatchEvent(mouseEvent);
  };

  const handleTouchEventEnd = () => {
    const mouseEvent = new MouseEvent('mouseup', {});
    canvasRef.current?.dispatchEvent(mouseEvent);
  };

  const handleTouchEventMove = (evt: TouchEvent) => {
    const touch = evt.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    canvasRef.current?.dispatchEvent(mouseEvent);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (canvas && ctx) {
      canvas.width = canvas.width; // Limpa o canvas
      applySettings(ctx, canvas); // Reaplica as configurações
    }
  };

  const dataURLToBlob = (dataURL: string): Blob => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');
      const blob = dataURLToBlob(dataURL);
      const file = new File([blob], 'signature.png', { type: 'image/png' });
      getImage(dataURL);
      getImageBlob && getImageBlob(file);
      handleOpenOrClose();
    }
  };

  return (
    <CanvasContainer height={height}>
      <canvas className="board" ref={canvasRef} />
      <section>
        <div>
          <Button theme={ButtonThemes.default} onClick={clearCanvas}>
            Limpar
          </Button>
          <Button theme={ButtonThemes.default} onClick={saveCanvas}>
            Assinar
          </Button>
        </div>
        <div>
          <Button theme={ButtonThemes.default} onClick={handleOpenOrClose}>
            Voltar
          </Button>
        </div>
      </section>
    </CanvasContainer>
  );
};

export default SignatureCanvas;
