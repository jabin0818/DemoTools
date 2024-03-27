import { createGlobalStyle } from 'styled-components'
import HanZiRootFontWoff from '../font/HanZiRootFont.woff2';
import HanZiRootFontTff from '../font/HanZiRootFont.ttf';


export const GlobalStyle = createGlobalStyle`

@font-face{
    font-family: "HanZiRootFont";
    font-style: normal;
    font-weight: 400;
    src: url('${HanZiRootFontWoff}') format("woff2"), url('${HanZiRootFontTff}') format("ttf");
}

:where(.css-dev-only-do-not-override-1i9hnpv).ant-drawer, :where(.css-dev-only-do-not-override-17zo61b).ant-drawer {

  .ant-drawer-body::-webkit-scrollbar {
      width: 5px;
      height: 12px;
  }
  .ant-drawer-body::-webkit-scrollbar-track {
        background-color: var(--scroll-track-color);
    }

  .ant-drawer-body::-webkit-scrollbar-thumb {
    background-color: var(--scroll-thumb-color);
  }

  .ant-drawer-content-wrapper{

    .ant-drawer-content{

        &.DrawerWrapper{
          background-color: var(--color-background);
        }
    }
  }
    
  .ant-drawer-close{
    color: var(--color-text);

    &:hover {
        color: var(--color-text-gray);
        text-decoration: none;
    }
  }
}

/* 流程图轮播图dot样式 */
:where(.css-dev-only-do-not-override-awurm5).ant-carousel .slick-dots li.slick-active button {
  background-color: var(--theme);
  opacity: 1;
  border: 0;
}

:where(.css-dev-only-do-not-override-awurm5).ant-carousel .slick-dots li button{
  border: 1px solid rgb(23, 23, 23);
}

  :root[theme="light"]
 {
    /* color-scheme: normal; */
    --theme: #249ffd;
    --color-danger: #fa5477;
    --color-success: #47da6b;
    --color-warning: #f7c907;
    --color-text-placeholder: #c0c4cc;
    --color-text: #2f3e4c;
    --color-level-color: #000;
    --color-text-gray: #787980;
    --color-background: #fff;
    --color-background-primary: #f1f1f1;
    --color-background-body: #f4f8fb;
    --border-color: #dcdee0;
    --bg: #fff;
    --transparent-el-bg: hsla(0,0%,100%,0.65);
    --transparent-el: hsla(0,0%,100%,0.7);
    --scroll-thumb-color: #bcc5d5;
    --scroll-track-color: #eef0f4;
    --color-background-tag: var(--theme);

    --color-piano-char: #26243d;
    --color-piano-char-actived: rgba(38,36,61,.4);
}

  :root[theme="dark"] {
    /* color-scheme: dark; */
    --theme: #2689d6;
    --color-danger: #d94967;
    --color-success: #3ebf5e;
    --color-warning: #d3ac07;
    --color-text-placeholder: #484747;
    --color-text: #989898;
    --color-level-color: #fff;
    --color-text-gray: #66686f;
    --color-background: #1c1f24;
    --color-background-primary: #0f0f0f;
    --color-background-body: #0a0a0a;
    --bg: #222;
    --border-color: #7b7b7b;
    --transparent-el-bg: rgba(28,31,36,0.7);
    --transparent-el: rgba(28,31,36,0.7);
    --scroll-thumb-color: #292b30;
    --scroll-track-color: #505050;
    --color-background-tag: var(--theme);

    --color-piano-char:#fff;
    --color-piano-char-actived: rgb(116, 116, 116);
}

:root {
    --theme-success: #52de97;
    --theme-danger: #fa5477;
    --theme-info: #9ed0ff;
    --theme-wrning: #ffdd98;
}

body{
  background-color: var(--color-background-body);
}

.scrollbar-default-styles{

  &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
      border-radius: 8px;
      background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
      background-color: #c8c8c8;
  }
}

.helpModalWrapper{
  
  .ant-modal{
    
    width: 800px!important;
  }
}

.createGraphModalWrapper{
  
  .ant-modal{
    
    width: 620px!important;
  }
}
`