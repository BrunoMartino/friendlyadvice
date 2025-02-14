import React, { useEffect, useState } from 'react';
import {
  ContainerTable,
  ListItemsContainer,
  ListItemsContainerGrid,
  TotalGridContainer,
  TotalItemsContainer,
} from './styles';

interface iGridHeader {
  label: string;
  position: string;
}

interface ITable {
  headerArraysObject: iGridHeader[];
  useSelectorArray: Array<{}>;
  headerTemplate: string;
  removeItem?: Array<string>;
  maxWidth?: number;
  checked?: boolean;
  headerArrayMedia?: iGridHeader[];
  newHeaderTemplateMedia?: string;
}

const TabelaDinamica: React.FC<ITable> = ({
  headerArraysObject,
  headerTemplate,
  removeItem,
  newHeaderTemplateMedia,
  useSelectorArray,
  headerArrayMedia,
  maxWidth,
}) => {
  const [header, setHeader] = useState<Array<{}>>();
  // const [list, setList] = useState<Array<{}>>();

  function verifyItemsOnArray(itensToRemove: any) {
    let results: any = [];
    if (
      removeItem &&
      removeItem.length > 0 &&
      window.innerWidth / 16 <= maxWidth!
    ) {
      results = itensToRemove
        ?.map((el: any) => {
          if (!removeItem.findIndex((item: any) => item === el.label)) {
            return el;
          }
        })
        .filter(Boolean);
    }
    return results;
  }

  useEffect(() => {
    const header = verifyItemsOnArray(headerArraysObject);
    const list = verifyItemsOnArray(useSelectorArray);
    if (header.length > 0) {
      setHeader(header);
    } else {
      setHeader(headerArraysObject);
    }
    // if (list.length > 0) {
    //   setList(list);
    // } else {
    //   setList(useSelectorArray);
    // }
  }, []);

  return (
    <>
      <ContainerTable
        maxWidth={maxWidth}
        headerTemplate={
          newHeaderTemplateMedia && window.innerWidth / 16 <= maxWidth!
            ? newHeaderTemplateMedia
            : headerTemplate
        }
      >
        <div className="header-table">
          {newHeaderTemplateMedia
            ? headerArrayMedia &&
              headerArrayMedia.length > 0 &&
              headerArrayMedia.map((item: any, i: number) => {
                return (
                  <span
                    key={i}
                    className={`check--label-text-grid-${item.position}`}
                  >
                    {item.label}
                  </span>
                );
              })
            : headerArraysObject &&
              headerArraysObject.length > 0 &&
              headerArraysObject.map((item: any, i: number) => {
                return (
                  <span
                    key={i}
                    className={`check--label-text-grid-${item.position}`}
                  >
                    {item.label}
                  </span>
                );
              })}
          {/* {header &&
            header.length > 0 &&
            header.map((item: any, i: number) => {
              return (
                <span key={i} className={`check--label-text-grid-${item.position}`}>
                  {item.label}
                </span>
              );
            })} */}
        </div>
        {/* {useSelectorArray &&
          useSelectorArray.length > 0 &&
          useSelectorArray.map((item: any, i: number) => {
            return (
              <ListItemsContainerGrid headerTemplate={headerTemplate} order={i}>
                {for (let i; item.lenght > 0; i++) {
                  return (
                    <ListItemsContainer
                    >
                      {item[i]}
                    </ListItemsContainer>
                  )
                }}
                
              </ListItemsContainerGrid>
              <TotalGridContainer  headerTemplate={headerTemplate}>
                <ListItemsContainer className={`check--label-text-grid-right`}>
                  TOTAIS
                </ListItemsContainer>
                <ListItemsContainer className={`check--label-text-grid-right`}>
                  {item.period}
                </ListItemsContainer>
              </TotalGridContainer>
            );
          })} */}
        <ListItemsContainerGrid
          headerTemplate={
            newHeaderTemplateMedia ? newHeaderTemplateMedia : headerTemplate
          }
          order={1}
        >
          <ListItemsContainer className={`check--label-text-grid-center`}>
            teste
          </ListItemsContainer>
          <ListItemsContainer className={`check--label-text-grid-left`}>
            teste2
          </ListItemsContainer>
          <ListItemsContainer className={`check--label-text-grid-right`}>
            teste3
          </ListItemsContainer>
          <ListItemsContainer className={`check--label-text-grid-center`}>
            teste
          </ListItemsContainer>
          <ListItemsContainer className={`check--label-text-grid-left`}>
            teste2
          </ListItemsContainer>
          <ListItemsContainer className={`check--label-text-grid-right`}>
            teste3
          </ListItemsContainer>
        </ListItemsContainerGrid>

        <TotalGridContainer
          headerTemplate={
            newHeaderTemplateMedia ? newHeaderTemplateMedia : headerTemplate
          }
        >
          <TotalItemsContainer className={`check--label-text-grid-right`}>
            TOTAIS
          </TotalItemsContainer>
          <TotalItemsContainer className={`check--label-text-grid-right`}>
            TOTAIS
          </TotalItemsContainer>
        </TotalGridContainer>
      </ContainerTable>
    </>
  );
};

export default TabelaDinamica;
