import styled from 'styled-components'

export const DemoDrawWrapper = styled.div`
    display: flex;
    height: 100vh;

    .gallery-menu{
        width: 260px;
        user-select: none;
        transition: all.2s;
        &:hover .menu-container .menu-close-btn{
            display: block;
            z-index: 100;
        }

        .menu-container{
            position: relative;
            height: 100%;
            background-color: #fff;
            color: #000;
            border-right: 1px solid #f6f6f6;

            .menu-close-btn{
                display: none;
                position: absolute;
                top: 50%;
                right: -8px;
                width: 20px;
                height: 28px;
                background-color: #fff;
                text-align: center;
                line-height: 26px;
                border-radius: 28px;
                transition: .2s;
                border: 1px solid #f6f6f6;
                cursor: pointer;
                
                span{
                    color: #000;
                    font-size: 13px;
                }

                &:hover{
                    /* background-color: var(--theme); */
                    background: #f3f5f9;
                    color: #fff;
                }
            }

            .menu-header{
                width: 100%;
                height: 86px;
                padding: 30px 0 0 92px;
            }
    
            .menu-list{
                position: relative;
                width: 100%;
                .menu-list-wrapper{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    .menu-itme{
                        display: flex;
                        align-items: center;
                        height: 68px;
                        padding-left: 32px;
                        color: var(--text);
                        cursor: pointer;
                        transition: .2s;
    
                        .menu-icon{
                            font-size: 26px;
                        }
                        .menu-text{
                            font-size: 18px;
                            padding-left: 30px;
                            white-space: nowrap;
                        }
    
                        &.active{
                            color: var(--theme);
                            background-color: #f2f4f7;
                            border-right: 4px solid var(--theme);
                        }
                        
                        &:hover{
                            color: var(--theme);
                            background-color: #f2f4f7;
                        }
                    }

                    .menu-itme-divider{
                        height: 1px;
                        width: 100%;
                        border-bottom: 1px solid var(--border-color);
                    }
                }
                
            }
        }
    }

    .gallery-menu-close{
        width: 90px;
        /* overflow: hidden; */
        .menu-text{
            opacity: 0!important;
        }

    }

    .gallery-main{
        position: relative;
        flex: 1;
        padding-top: 62px;
        .gallery-container{

            .gallery-sh-query{
                display: flex;
                justify-content: space-between;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 62px;
                text-align: right;
                z-index: 10;
                background: #FFF;
                border-bottom: 1px solid #f6f6f6;
                box-shadow: 0 1px 2px #0000001f;
                padding: 15px 48px;
                .search{

                }

                .query{

                }
                
            }

            .gallery{
                width: 100%;
                height: 100%;
                scroll-behavior: smooth;
                padding-left: 30px;
                padding-bottom: 80px;
                overflow: auto;
                position: absolute;

                .gallery-list{

                    .template-header{
                        display: flex;
                        justify-content: space-between;
                        height: 76px;
                        padding-right: 80px;
                        border-bottom: 1px dashed #e1dfdf;

                        .sub-title{
                            display: flex;
                            align-items: center;
                            h2{
                                margin-bottom: 0;
                            }
    
                            h4{
                                margin-left: 10px;
                                color: #b9b9b9;
                                margin-bottom: 0;
                            }
                        }
                        
                        .batch-delete{
                            display: flex;
                            justify-content: space-between;

                            .delete-btn{
                                color: var(--theme);
                                cursor: pointer;

                                .delete-icon{
                                    margin-right: 6px;
                                }
                            }
                        }
                    }

                    .case-wrap{
                        display: flex;
                        flex-wrap: wrap;
                        padding-bottom: 25px;

                        .case-item{
                            width: 240px;
                            margin: 18px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            transition: .3s;
                            cursor: pointer;

                            &:hover{
                                transform: translateY(-0.125rem);
                                .case-thumbnail{
                                    box-shadow: 0 0 0.0625rem 0 rgb(8 11 14 / 6%), 0 0.375rem 0.375rem -0.0625rem rgb(8 11 14 / 10%);
                                }
                            }
                            
                            .case-thumbnail{
                                transition: .3s;
                                border: 1px solid #efefef;
                                border-radius: 5px;
                                display: flex;
                                align-items: center;
                                padding: 2px;
                                width: 240px;
                                height: 160px;
                                box-shadow: 0 0 20px #0000000d;
                                background: #fff center no-repeat;
                                background-size: contain;

                                img{
                                    width: 100%;
                                }
                            }

                            .case-name{
                                width: 100%;
                                height: 22px;
                                margin-top: 10px;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;

                                .name{
                                    color: var(--color-text);
                                    .title{
                                        display: -webkit-box;
                                        text-overflow: ellipsis;
                                        overflow: hidden;
                                        -webkit-box-orient: vertical;
                                        -webkit-line-clamp: 1;
                                    }
                                }

                                .type{
                                    color: var(--color-text-gray);
                                    font-size: 13px;
                                    flex-shrink: 0;
                                    margin-left: auto;
                                }                                
                            }
                        }
                    }
                }
            }
        }
    }
`