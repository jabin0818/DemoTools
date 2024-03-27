import styled from "styled-components";

export const PianoWrapper = styled.div`
.component-autopiano {
  width: 100%;
  position: relative;
  color: #000;

  .piano-options {
    width: 90%;
    height: 50px;
    margin: 10px auto;
    padding: 0;
    position: relative;
    .option-item-wrap {
      display: flex;
      align-items: center;
      position: absolute;
      right: 1%;
      
      .option-item {
        display: flex;
        align-items: center;
        height: 50px;
        line-height: 50px;
        margin: 0 15px;
        
        .label{
          font-size: 18px;
          color: var(--color-piano-char);
        }
        .text{
          font-size: 18px;
          color: var(--theme);

          &>span{
            margin-left: 5px;
            cursor: pointer;    
            &.active{
              transition: transform .5s;
              transform: rotate(360deg);
            }
          }
        }
      }
    }
  }

  .piano-scroll-wrap {
    width: 100%;
  }

  .piano-wrap.visible {
    opacity: 1;
  }
  .piano-wrap {
    width: 90%;
    min-width: 1160px;
    margin: 10px auto 20px;
    box-shadow: 5px 5px 20px 5px #888;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    opacity: 0;
    user-select: none;
    .piano-band {
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: #000;
      box-shadow: inset 0px -1px 2px rgba(255, 255, 255, 0.4),
        0 2px 3px rgba(0, 0, 0, 0.4);
      border-width: 3px 2px 2px;
      border-style: solid;
      border-color: #555 #222 #111 #777;
      position: relative;
      .piano-band-img {
        width: 130px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }
      .piano-tip {
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        color: #fff;
        font-size: 14px;
      }
    }
    .piano-key-wrap {
      width: 100%;
      /* background: @c-black; */
      height: 12.5rem;
      background: #373737;
      overflow: hidden;
      position: relative;
      .piano-key {
        &:hover {
          cursor: pointer;
        }
      }

      .wkey {
        display: inline-block;
        width: 2.775%;
        height: 100%;
        margin: 0 auto;
        background: #fff;
        background: linear-gradient(-30deg, #f5f5f5, #fff);
        border: 1px solid #ccc;
        box-shadow: inset 0 1px 0px #fff, inset 0 -1px 0px #fff,
          inset 1px 0px 0px #fff, inset -1px 0px 0px #fff,
          0 4px 3px rgba(0, 0, 0, 0.7);
        border-radius: 0 0 5px 5px;
        position: relative;

        &:active {
          box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
          top: -1%;
          height: 99%;
          background: #efefef;
        }
        &:active:before {
          content: "";
          border-width: 250px 5px 0px;
          border-style: solid;
          border-color: transparent transparent transparent rgba(0, 0, 0, 0.1);
          position: absolute;
          left: 0;
          bottom: 0;
        }
        &:active:after {
          content: "";
          border-width: 250px 5px 0px;
          border-style: solid;
          border-color: transparent rgba(0, 0, 0, 0.1) transparent transparent;
          position: absolute;
          right: 0;
          bottom: 0;
        }

        .keytip {
          width: 100%;
          /* color: @c-black; */
          color: #373737;
          text-align: center;
          font-size: 14px;
          position: absolute;
          bottom: 5%;
          .keyname {
            margin-bottom: 5px;
          }
          .notename {
            /* color: @c-blue; */
            color: #1295DB;
            font-weight: bold;
          }

          .singname{
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-top: 4px;
            color: #373737;
            line-height: 20px;
            text-align: center;
            font-weight: 700;
            border-radius: 4px;
            background-color: #ccccd6;

            & span{
              position: relative;
              display: inline-block;

              .piano-notation-dot{
                height: 5px;
                line-height: 2px;
              }
  
              .piano-notation-num{
                line-height: 10px;
                font-size: 12px;
                font-weight: 700;
              }
            }
          }
        }

        &:nth-child(-n+7) .singname {
          background: #ccccd6;
        }

        &:nth-child(-n+14):nth-child(n+8) .singname {
          background: #93b5cf;
        }

        &:nth-child(-n+21):nth-child(n+15) .singname {
          background: #a4cab6;
        }

        &:nth-child(-n+28):nth-child(n+22) .singname {
          background: #fbb957;
        }

        &:nth-child(-n+35):nth-child(n+29) .singname {
          background: #ee8055;
        }

        &:nth-child(36) .singname {
          background: #f07c82;
        }

      }
      .wkey-active {
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
        top: -1%;
        height: 99%;
        background: #efefef;
        &:before {
          content: "";
          border-width: 250px 5px 0px;
          border-style: solid;
          border-color: transparent transparent transparent rgba(0, 0, 0, 0.1);
          position: absolute;
          left: 0;
          bottom: 0;
        }
        &:after {
          content: "";
          border-width: 250px 5px 0px;
          border-style: solid;
          border-color: transparent rgba(0, 0, 0, 0.1) transparent transparent;
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }

      .bkey {
        display: inline-block;
        width: 10%;
        height: 70%;
        background: linear-gradient(-20deg, #333, #000, #333);
        border-width: 1px 2px 7px;
        border-style: solid;
        border-color: #666 #222 #111 #555;
        border-radius: 0 0 2px 2px;
        box-shadow: inset 0px -1px 2px rgba(255, 255, 255, 0.4),
          0 2px 3px rgba(0, 0, 0, 0.4);
        position: absolute;
        top: 0;
        overflow: hidden;
        &:active {
          height: 69%;
          border-bottom-width: 2px;
          box-shadow: inset 0px -1px 1px rgba(255, 255, 255, 0.4),
            0 1px 0px rgba(0, 0, 0, 0.8), 0 2px 2px rgba(0, 0, 0, 0.4),
            0 -1px 0px #000;
        }
        .keytip {
          width: 100%;
          color: #fff;
          position: absolute;
          left: 0;
          bottom: 4%;
          font-size: 14px;
          overflow: hidden;
          .keyname {
            width: 100%;
            text-align: center;
          }
        }
      }
      .bkey-active {
        /* height: 101%; */
        border-bottom-width: 2px;
        box-shadow: inset 0px -1px 1px rgba(255, 255, 255, 0.4),
          0 1px 0px rgba(0, 0, 0, 0.8), 0 2px 2px rgba(0, 0, 0, 0.4),
          0 -1px 0px #000;
      }

      .wkey.auto-key-active {
        /* box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
        top: 0%;
        height: 100%;
        background: #FACC94 !important; */
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
        top: -1%;
        height: 99%;
        background: #efefef;

        &:before {
          /* content: "";
          border-width: 250px 5px 0px;
          border-style: solid;
          border-color: transparent transparent transparent rgba(0, 0, 0, 0.1);
          position: absolute;
          top: 0;
          left: 0; */
          content: "";
          border-width: 250px 5px 0px;
          border-style: solid;
          border-color: transparent transparent transparent rgba(0, 0, 0, 0.1);
          position: absolute;
          left: 0;
          bottom: 0;
        }
        &:after {
          /* content: "";
          border-width: 250px 5px 0px;
          border-style: solid;
          border-color: transparent rgba(0, 0, 0, 0.1) transparent transparent;
          position: absolute;
          right: 0;
          left: 0; */
          content: "";
          border-width: 250px 5px 0px;
          border-style: solid;
          border-color: transparent rgba(0, 0, 0, 0.1) transparent transparent;
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
      .bkey.auto-key-active {
        /* height: 101%;
        border-bottom-width: 2px;
        box-shadow: inset 0px -1px 1px rgba(255, 255, 255, 0.4),
          0 1px 0px rgba(0, 0, 0, 0.8), 0 2px 2px rgba(0, 0, 0, 0.4),
          0 -1px 0px #000;
        background: #FACC94 !important; */
        border-bottom-width: 2px;
        box-shadow: inset 0px -1px 1px rgba(255, 255, 255, 0.4),
          0 1px 0px rgba(0, 0, 0, 0.8), 0 2px 2px rgba(0, 0, 0, 0.4),
          0 -1px 0px #000;
      }

      .bkey:nth-child(1) {
        left: 9%;
      }
      .bkey:nth-child(2) {
        left: 23%;
      }
      .bkey:nth-child(3) {
        left: 50%;
      }
      .bkey:nth-child(4) {
        left: 65%;
      }
      .bkey:nth-child(5) {
        left: 79%;
      }

      .bkey-wrap {
        width: 20%;
        height: 10.625rem;
        position: absolute;
        top: 0;
      }
      .bkey-wrap1 {
        left: 0;
      }
      .bkey-wrap2 {
        left: 19.5%;
      }
      .bkey-wrap3 {
        left: 39%;
      }
      .bkey-wrap4 {
        left: 58.3%;
      }
      .bkey-wrap5 {
        left: 77.7%;
      }
    }
  }

  #audioEffectCanvas {
    display: none;
  }
  
  

  
}
`