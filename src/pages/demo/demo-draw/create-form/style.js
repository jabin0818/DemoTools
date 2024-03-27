import styled from 'styled-components'

export const CreateFormWrapper = styled.div`
    height: 30rem;
    padding-top: 1.25rem;

    .graph-input{
        display: flex;
        align-items: center;
        height: 32px;
        margin-bottom: 20px;
        .input{
            display: flex;
            align-items: center;
            width: 50%;

            & > span {
                margin-right: 10px;
            }
        }
    }

    .graph-type{
        display: flex;
        height: calc(100% - 52px);
        border-radius: 4px;
        border: 1px solid var(--border-color);

        .graph-type-left{
            margin-right: 10px;
            padding: 10px 0 0 10px;
            .search{

            }

            .classify{
                padding-top: 10px;

                .classify-item{
                    height: 32px;
                    line-height: 32px;
                    font-size: 15px;
                    color: var(--color-text);
                    border-radius: 6px;
                    padding-left: 8px;
                    /* transition: color .25s, background-color .25s; */
                    cursor: pointer;

                    &:hover{
                        background-color: var(--theme);
                        color: #fff;
                    }

                    &.active{
                        background-color: var(--theme);
                        color: #fff;
                    }
                }
            }
        }

        .graph-type-right{
            padding: 10px;
            width: calc(144px * 3);

            .template-list{
                display: flex;
                flex-wrap: wrap;

                .template-item{
                    position: relative;
                    width: 114px;
                    height: 114px;
                    margin-right: 10px;
                    margin-bottom: 10px;
                    cursor: pointer;

                    &:hover {
                        .template-item-mask{
                            border: 1px solid var(--theme);
                        }
                    }

                    &:nth-child(3n) {
                        margin-right: 0;
                    }

                    &.active {
                       .template-item-mask{
                            border: 1px solid var(--theme);
                        } 
                    }

                    .template-item-mask{
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        /* left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%); */
                        text-align: center;
                        line-height: 114px;
                        font-size: 18px;
                        color: #000;
                        background-color: rgba(255, 255, 255, 0.5);
                        border-radius: 6px;
                        border: 1px solid var(--border-color);

                        & > span{
                            background-color: #fff;
                        }
                    }

                    .template-item-img{
                        width: 100%;
                        height: 100%;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
    }
`