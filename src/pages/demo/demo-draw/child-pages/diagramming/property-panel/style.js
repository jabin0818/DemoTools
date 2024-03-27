import styled from 'styled-components'

export const PropertyPanelWrapper = styled.div`

    .property-panel{
        width: 250px;
        height: 100%;
        position: absolute;
        right: 0;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        min-width: 0;
        background-color: var(--color-background-body);
        border-left: 1px solid var(--color-text-placeholder);
        transition: .2s;
        user-select: none;
                
        .property-header{
            position: relative;
            width: 250px;
            height: 40px;
            .property-tabbar{
                position: relative;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                height: 100%;
                border-bottom: 1px solid var(--color-text-placeholder);
        
                &::after{
                    content: "";
                    display: inline-block;
                    height: 2px;
                    width: 52px;
                    background: var(--theme);
                    bottom: 0;
                    position: absolute;
                    transition: left .2s ease;
                }
        
                &.graphic-active{
                    &::after{
                        left: 48px;
                    }
                }
                &.adjust-active{
                    &::after{
                        left: 149px;
                    }
                }
        
                .tabbar-item{
                    cursor: pointer;
                    height: 40px;
                    text-align: center;
                    border-bottom: 2px solid transparent;
                    line-height: 40px;
                    font-size: 13px;
        
                    &.active{
                        color: var(--theme);
                        font-weight: 700;
                    }
                }
                
            }
        }

        .property-main{
            position: relative;
            height: calc(100% - 40px);

            .property-style{
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                overflow: hidden;
                overflow-y: auto;

                .style-container{

                    .format-section{

                        .format-section-wrapper{
                            padding: 0 20px;
                        }
                        
                    }

                    .fast-swiper{
                        position: relative;
                        .btnLeft{
                            position: absolute;
                            top: 39%;
                            left: 5px;
                            color: #727272;
                            font-size: 16px;
                            z-index: 10;
                            cursor: pointer;
                        }

                        .btnRight {
                            position: absolute;
                            top: 39%;
                            right: 5px;
                            color: #727272;
                            font-size: 16px;
                            z-index: 10;
                            cursor: pointer;
                        }

                        .format-section-fastStyle{
                            height: 100px;
                        }

                        .slick-dots-override{
                            color: var(--theme);
                            background-color: #000;
                        }

                        .carousel-item{
                            padding: 0 32px;
                            .color-list{
                                width: 180px;
                                display: flex;
                                flex-wrap: wrap;
                                align-content: center;
                                justify-content: space-between;


                                .color-item{
                                    width: 36px;
                                    height: 24px;
                                    margin: 0px 4px 4px 0px;
                                    background-color: rgb(255, 255, 255);
                                    border: 1px solid rgb(24, 20, 29);
                                    border-radius: 0px;
                                    text-align: center;
                                    line-height: 24px;
                                    cursor: pointer;
                                    
                                    &:nth-child(4n) {
                                        margin: 0;
                                    }

                                    & > span{

                                        display: none;
                                    }

                                    /* &.short-color-active{

                                        & > span{
                                            display: inline-block;
                                        }
                                    } */
                                }
                            }
                        }
                    }

                    .fill-style{
                        margin-top: -16px;
                    }

                    .text-style{

                        .format-section-wrapper{

                            .edite-text{
                                & > button {
                                    width: 30px!important;
                                    height: 24px!important;
                                }
                                .boldBtn{
                                    border-radius: 4px 0 0 4px;

                                    &.active{
                                        color: #4db8ff;
                                        border-color: #4db8ff;
                                    }
                                }
                                .decorationBtn{
                                    border-radius: 0;

                                    &.active{
                                        color: #4db8ff;
                                        border-color: #4db8ff;
                                    }
                                }
                                .underlineBtn{
                                    border-radius: 0;

                                    &.active{
                                        color: #4db8ff;
                                        border-color: #4db8ff;
                                    }
                                }
                                .strikethroughBtn{
                                    border-radius: 0 4px 4px 0;

                                    &.active{
                                        color: #4db8ff;
                                        border-color: #4db8ff;
                                    }
                                }

                            }
                        }
                    }
                }
            }
        }
    }
    
    .property-panel-out{
        width: 0;
    }
    
`