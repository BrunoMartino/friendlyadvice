import React from 'react';

import { Header, ListContent } from './styles-contentHeader-componente';

type TContentHeader = {
  title?: string;
  subTitle?: string;
  linkToBack?: JSX.Element;
  listSearch?: JSX.Element | string;
  listSearchButton?: JSX.Element;
  rightButtons?: JSX.Element;
};

const ContentHeader: React.FC<TContentHeader> = ({
  rightButtons,
  title,
  subTitle,
  linkToBack,
  listSearch,
  listSearchButton,
}) => {
  return (
    <Header>
      <div className="header">
        <div className="content-header-div">
          <div>{linkToBack}</div>
          <p className="title">{title}</p>
          {subTitle ? (
            <span className="subTitle">{subTitle}</span>
          ) : (
            <span style={{ display: 'none' }} className="subTitle">
              {subTitle}
            </span>
          )}
        </div>
        <div className="children-div">{rightButtons}</div>
      </div>
      <ListContent>
        <div className="div-container-list">
          {listSearch}
          <div className="search-button">{listSearchButton}</div>
        </div>
      </ListContent>
    </Header>
  );
};

export default ContentHeader;
