import styled from "styled-components"

export const ModalDetailWrapper = styled.div`

#modal-container {
  position:fixed;
  display:table;
  height:100%;
  width:100%;
  top:0;
  left:0;
  transform:scale(0);
  z-index:1;
  &.four {
    z-index:0;
    transform:scale(1);
    .modal-background {
      background:rgba(0,0,0,.7);
      .modal {
        animation: blowUpModal .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
      }
    }
    &.out {
        animation: fadeOut .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
      .modal-background {
        .modal {
          animation: blowUpModalTwo .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
        }
      }
    }
  }
  &.seven {
    transform:scale(1);
     /* animation: scaleIn .3s ease forwards; */
    .modal-background {
      background:rgba(0,0,0,.0);
      /* animation: fadeIn .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards; */
      animation: fadeIn .3s ease forwards;
      .modal {
        height:75px;
        width:75px;
        border-radius:75px;
        overflow:hidden;
        /* animation: bondJamesBond 1.5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards; */
        animation: bondJamesBond .3s ease 0s forwards;
         .card-detail{
          opacity:0;
          position:relative;
          animation: modalContentFadeIn .5s 1.4s linear forwards;
        }
      }
    }
    &.out {
      animation: slowFade .5s 1.5s linear forwards;
      .modal-background {
        background-color:rgba(0,0,0,.7);
        animation: fadeToRed 2s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
        .modal {
          border-radius:3px;
          height:162px;
          width:227px;
          animation: killShot 1s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
          h2,p {
            animation:modalContentFadeOut .5s .5 cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
          }
        }
      }
    }
  }
  .modal-background {
    display:table-cell;
    background:rgba(0,0,0,.8);
    text-align:center;
    vertical-align:middle;
    .modal{
        max-width: 850px;
        position: relative;
        /* transition: transform 500ms, width 0.25s, height 0.25s; */
        border: 2px solid var(--c-gray-900);
        border-radius: 20px;
        padding: 30px;
        background:white;
        display:inline-block;
        font-weight:300;
        .card-external{          
            .exit-detail{
                position: absolute;
                top: 10px;
                right: 10px;
                span{
                    font-size: 22px;
                    color: #626675;
                    cursor: pointer;
                    transition: color 0.25s;

                    &:hover{
                        color: var(--theme);
                    }
                }
            }
        }

        .card-detail{

            .card-detail-header{
                display: flex;
                margin-bottom: 10px;

                .cd-header-left{
                    position: relative;
                    width: 150px;
                    height: 150px;
                    margin-right: 20px;
                    border-radius: 10px;
                    border: 1px solid var(--theme);
                    overflow: hidden;

                    .char-text{
                        font-size: 130px;
                        font-family: cursive;
                    }
                    
                    .char-background{
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        z-index: -1;
                        opacity: 0.6;

                        .dashed{
                            position: absolute;
                            top: 50%;
                            width: 100%;
                            border-top: 1px dashed #bbb;

                            &.dashed-topLeft{
                                transform: rotate(45deg) scale(1.5);
                            }
                            &.dashed-topCenter{
                                transform: rotate(90deg) scale(1.5);
                            }
                            &.dashed-topRight{
                                transform: rotate(135deg) scale(1.5);
                            }
                            &.dashed-center{
                                /* transform: rotate(45deg); */
                            }
                        }

                    }
                }

                .cd-header-right{
                    
                    .pinyin-info{
                        width: 116px;
                        position: relative;
                        margin-bottom: 26px;

                        .pinyin-info-text{
                            font-size: 25px;
                            color: #000;
                            font-weight: 500;
                        }

                        .soundIcon{
                            margin-left: 10px;
                            color: var(--theme);
                            cursor: pointer;
                        }
                        .pinyin-background{
                            position: absolute;
                            top: 0;
                            right: 0;
                            bottom: 0;
                            left: 0;
                            z-index: -1;
                            .line{
                                position: absolute;
                                width: 100%;

                                &.solidOne{
                                    border-top: 1px solid var(--theme);

                                }
                                &.solidTwo{
                                    top: 12px;
                                    border-top: 1px dashed var(--theme);

                                }
                                &.solidThree{
                                    top: 24px;
                                    border-top: 1px dashed var(--theme);

                                }
                                &.solidFour{
                                    top: 36px;
                                    border-top: 1px solid var(--theme);
                                }
                            }
                        }
                    }

                    .other-info{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .line-list{
                            margin-right: 40px;
                            font-size: 16px;

                            .line-item{
                                display: flex;
                                align-items: center;
                                margin-bottom: 10px;

                                .line-label{
                                    color: #626675;
                                    margin-right: 5px;
                                }
                                
                                .line-text{
                                    color: #000;
                                    font-weight: 400;
                                }
                            }
                        }
                    }
                }
            }

            .card-detail-footer{
                display: flex;
                font-size: 16px;
                .cd-footer-label{
                    width: 5%;
                    color: #626675;
                    margin-right: 5px;
                }
                
                .cd-footer-text{
                    width: 95%;
                    color: #000;
                }
            }
        }
    }
  }
}

@keyframes zoomOut {
  0% {
    transform:scale(1);
  }
  100% {
    transform:scale(0);
  }
}


@keyframes scaleIn {
  0% {
    transform:scale(0);
  }
  100% {
    transform:scale(1);
  }
}
@keyframes fadeIn {
  0% {
    background:rgba(0,0,0,.0);
  }
  100% {
    background:rgba(0,0,0,.7);
  }
}

@keyframes fadeOut {
  0% {
    background:rgba(0,0,0,.7);
  }
  100% {
    background:rgba(0,0,0,.0);
    opacity:0;
  }
}

@keyframes blowUpModal {
  0% {
    transform:scale(0);
  }
  100% {
    transform:scale(1);
  }
}

@keyframes blowUpModalTwo {
  0% {
    transform:scale(1);
    opacity:1;
  }
  100% {
    transform:scale(0);
    opacity:0;
  }
}

@keyframes modalContentFadeIn {
  0% {
    opacity:0;
    top:-20px;
  }
  100% {
    opacity:1;
    top:0;
  }
}

@keyframes modalContentFadeOut {
  0% {
    opacity:1;
    top:0px;
  }
  100% {
    opacity:0;
    top:-20px;
  }
}

@keyframes bondJamesBond {
  0% {
    /* transform:translateX(1000px); */
    height:0px;
    width:0px;
  }
  20% {
    /* transform:translateX(1000px); */
    height:60px;
    width:60px;
  }

  90% {
    border-radius:3px;
    height:182px;
    width:247px;
  }
  100% {
    border-radius:3px;
    height:162px;
    width:227px;
  }
}

@keyframes killShot {
  0% {
    transform:translateY(0) rotate(0deg);
    opacity:1;
  }
  100% {
    transform:translateY(300px) rotate(45deg);
    opacity:0;
  }
}

@keyframes fadeToRed {
  0% {
    background-color:rgba(black,.6);
  }
  100% {
    background-color:rgba(red,.8);
  }
}

@keyframes slowFade {
  0% {
    opacity:1;
  }
  99.9% {
    opacity:0;
    transform:scale(1);
  }
  100% {
    transform:scale(0);
  }
}
`