import styled from 'styled-components';

export const FileUploaderContainer = styled.div<{ dragging: boolean }>`
  border: 2px dashed ${(props) => (props.dragging ? '#000' : '#ddd')};
  padding: 40px;
  text-align: center;
  cursor: pointer;
  width: 50vw;
  margin: 0 auto;
  background-color: #f8f8f8;
  border-radius: 8px;
  transition: border-color 0.3s ease-in-out;

  @media screen and (max-width: 726px) {
    width: 100%;
    margin: 0 auto;
  }
`;

export const Text = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

export const UploadButton = styled.div`
  display: inline-block;
  padding: 10px 20px;
  background-color: #d89553;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #c28442;
  }
`;

export const FileInfo = styled.div`
  margin-top: 20px;
  text-align: left;
  color: #333;

  p {
    margin: 0.1rem 0;
    font-size: 1.2rem;
  }
`;
