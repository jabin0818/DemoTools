import styled from 'styled-components'

export const DiagrammingWrapper = styled.div`
    
    .diagramming-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 90px;
        padding: 6px 16px 6px 78px;
        background-color: var(--color-background-body);
        border-bottom: 0.0625rem solid var(--color-text-placeholder);
        transition: .2s;

        .diagramming-header-left{
            display: flex;
            align-items: center;

            .back{
                display: flex;
                align-items: center;
                margin-right: 28px;
                color: var(--color-text);
                cursor: pointer;
                span{
                    font-size: 20px;
                    &:first-child{
                        margin-right: 4px;
                    }
    
                    &:nth-child(2) {
                    }
                }

            }

            .title-menu{

                .title{
                    min-width: 320px;
                    margin-bottom: 8px;
                    input{
                        width: 100%;
                        border: none;
                        outline: none;
                        font-size: 22px;
                        padding-left: 4px;
                        background-color: transparent;
                        border-bottom: 1px solid var(--border-color);
                        padding-bottom: 4px;
                        flex-grow: 1;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap; /* 确保文本不换行 */
                    }
                }
                .menu{
                    &:first-child .menu-button{
                        padding-left: 0;
                    }

                    .menu-button{
                        padding: 4px 6px;
                        border-radius: 4px;
                        

                        &:hover{
                            background-color: var(--color-background-primary);
                        }
                    }

                }

            }
        }

        .diagramming-header-right{

            .download-btn{
                display: flex;
                justify-content: center;
                align-items: center;
                height: 40px;
                padding: 0 16px;
                background-color: var(--theme);
                color: #fff;
                font-size: 15px;
                border-radius: 6px;
                text-align: center;
                cursor: pointer;
                transition: .2s;

                &.save{
                    &:hover{
                        opacity: .8;
                    }
                }

                &.asTemp, &.exportTo{
                    border: 1px solid var(--theme);
                    background-color: transparent;
                    color: var(--theme);
                    &:hover{
                        background-color: rgba(36,159,253,.1);
                    }
                }

                &.exportTo{
                    font-size: 20px;
                }
                
            }

            
        }
    }

    .diagramming-header-out{
        height: 0;
        padding: 0;
        opacity: 0;
    }

    .diagramming-toolbar{
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 38px;
        background-color: #fff;
        padding: 0 16px 0 25px;
        background-color: var(--color-background-body);
        border-bottom: 1px solid var(--color-text-placeholder);
        transition: .2s;
        
        .diagramming-toolbar-left{

            .toolbar-item{
                .toolbar-item-wrapper{
                    .toolIcon{
                        color: #000;
                        border-radius: 4px;
                        padding: 4px;
                        font-size: 18px;
                        cursor: pointer;
        
                        &:hover{
                            background-color: var(--color-background-primary);
                        }
                    }

                    &.disabled{
                        pointer-events: auto;
                        opacity: .4;
                    }

                    &.selected{
                        background-color: var(--color-background-primary);
                    }
                }
            }

            .toolbar-item-zoom{
                width: 58px;
            }

            .toolbar-item-bgc{
                .toolbar-item-wrapper{

                    .whole-bgc-icon{
                        display: flex;
                        flex-direction: column;
                        align-items: center;

                        .toolIcon{
                            font-size: 17px;
                            padding-bottom: 1px;
                        }
                        .backgroundColor-line{
                            width: 76%;
                            height: 1px;
                            border-bottom: 2px solid #fff;
                        }
                    }
                }
            }
            
        }

        .diagramming-toolbar-right{

            .toolbar-item{
                .toolIcon{
                    color: #000;
                    border-radius: 4px;
                    padding: 4px;
                    font-size: 18px;
    
                    &:hover{
                        background-color: var(--color-background-primary);
                    }
                }

                &.disabled{
                    pointer-events: auto;
                    opacity: .4;
                }
            }
        }
    }

    .diagramming-toolbar-moveRight{
        padding: 0 16px 0 88px;
    }

    .diagramming-designer{
        width: 100%;
        /* height: calc(100vh - 128px); */
        flex-shrink: 0;
        position: relative;
        display: flex;
        overflow: hidden;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        transition: .2s;

        .designer-sidebar{
            max-width: 680px;
            height: 100%;
            position: relative;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            min-width: 0;
            background-color: var(--color-background-body);
            border-right: 1px solid var(--color-text-placeholder);
            transition: .2s;
            user-select: none;

            .designer-tabbar{
                position: relative;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                min-width: 80px;
                height: 40px;
                border-bottom: 1px solid var(--color-text-placeholder);

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
                        border-bottom: 2px solid var(--theme);
                    }
                }
            }

            .designer-panel{
                position: relative;
                height:calc(100% - 40px);
                .shape-panel{
                    position:absolute;
                    left:0;
                    top:0;
                    right:0;
                    bottom:0;
                    overflow: hidden;
                    overflow-y: auto;
                    .shape-search{
                        padding: 10px;
                    }

                    .shape-main{

                        .shape-classify-panel{

                            &:hover{
                                background-color: rgba(0, 0, 0, 0.08)!important;
                            }

                            .node-list{
                                display: flex;
                                align-items: center;
                                flex-wrap: wrap;

                                .node-item {
                                    display: flex;
                                    justify-content: center;
                                    width: 35px;
                                    height: 35px;
                                    margin-right: 5px;
                                    margin-bottom: 5px;
                                    display: inline-block;
                                    & > svg{
                                        left: 1px;
                                        top: 1px;
                                        width: 32px;
                                        height: 30px;
                                        display: block;
                                        position: relative;
                                        overflow: hidden;
                                    }
                                }
                            }

                            
                        }
                    }
                }

                .themes-panel{

                }
            }
        }

        .designer-split{
            flex-basis: 8px;
            position: relative;
            z-index: 2;
            margin: 0;
            padding: 0;
            background-color: var(--color-background-body);
            box-sizing: border-box;
            box-shadow: -2px 0 4px rgb(121 111 111 / 63%) inset;
            cursor: col-resize;
        }

        .designer-viewport{
            flex-basis: 0;
            flex-grow: 1;
            min-width: 0;
            background-color: #fff;
            height: 100%;
            flex-direction: row;
            position: relative;
            display: flex;
            margin: 0;
            padding: 0;
            overflow: hidden;
            position: relative;
            z-index: 0;
            background: #eaecee;
            .canvas-container{
                /* width: 1869.6px; */
                /* height: 608.8px; */
                /* padding: 500px; */
                /* cursor: default; */
                position: relative;
                overflow: visible;
                z-index: 0;

                .designer-grids{
                    width: calc(100vw - 16px);
                    /* height: 608.8px; */
                    height: 100vh;

                    .lf-mini-map{
                        border-radius: 6px;
                        padding-top: 30px;
                        .lf-mini-map-graph{

                        }

                        .lf-mini-map-header{
                            height: 30px;
                            font-size: 14px;
                            font-weight: 600;
                            padding: 4px 10px;
                            background-color: var(--color-background-body);
                            color: var(--color-text);
                            background-image: none;
                        }

                        .lf-mini-map-close{
                            right: 4px;
                            top: 5px;
                        }
                    }

                    .lf-drag-able{
                        cursor:inherit!important;
                    }
                }
            }
        }
    }
`