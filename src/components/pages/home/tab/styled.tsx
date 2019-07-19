import styled, { css } from "styled-components";
import { MaxWidth } from "../../../../styles/utils";

const TabWrapper = styled.div`
  border: 1px solid #e7ebf2;
  position: sticky;
  top: 0;
  overflow: scroll;
  background-color: #fff;
  z-index: 2;
`;

const TabContentWrapper = styled.div`
  padding: 60px 0 80px 0;
`;

const TabMenu = styled.ul`
  white-space: nowrap;
  li {
    margin-right: 32px;
    a {
      color: #262626;
    }
  }
`;

const TabMenuList = styled.li<{ activePage: boolean }>`
  display: inline-block;
  padding: 24px 0;
  cursor: pointer;
  ${props =>
    props.activePage &&
    css`
      border-bottom: 4px solid #36b37e;
      font-weight: 600;
    `}
`;
const TabMenuOnlyShowMobile = styled.li<{ activePage: boolean }>`
  display: none;
  padding: 24px 0;
  cursor: pointer;
  ${MaxWidth.md`
    display: inline-block;
  `}
  ${props =>
    props.activePage &&
    css`
      border-bottom: 4px solid #36b37e;
      font-weight: 600;
    `}
`;

export {
  TabWrapper,
  TabContentWrapper,
  TabMenu,
  TabMenuList,
  TabMenuOnlyShowMobile
};