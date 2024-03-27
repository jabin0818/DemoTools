import styled from 'styled-components'

export const ChinaMapWrapper = styled.div`
    position: relative;
    max-width: 64rem;
    min-height: 100vh;
    margin: 0 auto;
    box-sizing: border-box;
    /* padding: 0 1.5625rem 0; */

    .mapHeader-container{
        position: sticky;
        top: 0;
        z-index: 100;
        padding-top: 1rem;
        .mapHeader-list{
            display: flex;
            justify-content: space-around;
            align-items: center;

            .mapHeader-btn{
                display: flex;

                .btn{
                    color: #fff;
                    background-color: var(--color-background-tag);
                    backface-visibility: hidden;
                    border-radius: .5rem;
                    border-style: none;
                    box-shadow: 0 8px 10px rgb(36 159 253 / 30%);
                    box-sizing: border-box;
                    cursor: pointer;
                    display: inline-block;
                    font-family: Inter,-apple-system,system-ui,Segoe UI,Helvetica,Arial,sans-serif;
                    font-size: 14.4px;
                    font-weight: 600;
                    letter-spacing: normal;
                    line-height: 1.5;
                    outline: none;
                    overflow: hidden;
                    padding: .6rem 1.6rem;
                    position: relative;
                    text-align: center;
                    text-decoration: none;
                    touch-action: manipulation;
                    -webkit-transform: translateZ(0);
                    transform: translateZ(0);
                    transition: all .3s;
                    user-select: none;
                    -webkit-user-select: none;
                    vertical-align: top;
                    white-space: nowrap;
                }

                .empty-btn{
                    /* padding: .6rem 1.6rem; */
                    width: 6.6875rem;
                    height: 2.8125rem;
                }

                .mapHeader-startBtn{
                    margin-right: 2.5rem;
                }

                .mapHeader-setBtn{

                }
            }

            .mapHeader-left{
                display: flex;
                align-items: center;
                flex-grow: 1;
                gap: 0;
                justify-content: space-between;
                .btn{

                    .leftIcon , .rightIcon{
                        font-size: 20px;
                    }

                    .rightIcon{
                        margin-right: 3px;
                        position: relative;
                        top: 2px;
                    }
                }

                & > span{
                    color: var(--color-level-color);
                    font-size: 40px;
                    line-height: 30px;
                }

                .mapHeader-startBtn{
                    
                }
            }

            .mapHeader-labelBox{
                align-items: center;
                display: flex;
                flex-direction: column;
                flex-grow: 1;

                .label-box-label{
                    color: #777;
                    font-size: small;
                    font-weight: 700;
                }

                .label-box-text{
                    font-size: 1.8rem;
                    line-height: 1.875rem;
                    min-height: 1.875rem;
                    color: var(--color-level-color);

                    .score{
                        color: #158d69;
                        font-size: 1.86rem;
                    }

                    .sum{
                    }

                    &.label-text-model{
                        /* transform: scale(.6); */
                        font-size: 1.5rem;
                    }
                }
            }
        }
    }

    .goBackBtn{
        display: inline-block;
        margin-bottom: 0;
        text-align: center;
        touch-action: manipulation;
        cursor: pointer;
        white-space: nowrap;
        line-height: 35px;
        font-size: 12px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        position: relative;
        color: rgba(0, 0, 0, 0.65);
        background-color: #fff;
        height: 35px;
        color: #293f52;
        background-image: linear-gradient(-225deg, #00d3f1 0, #12b3ff 100%);
        border: none;
        border-radius: 0;
        padding: 0 30px;
        font-weight: normal;
        &:hover{
            color: #293f52;
            background-image: linear-gradient(-225deg, #00d3f1 0, #12b3ff 100%);
            box-shadow: 0 0 15px 0 rgba(0, 193, 220, 0.37);
        }
    }

    .mapMain-container{
        padding: 0 1.5625rem 0;
        max-width: 62.5rem;
        min-height: 960px;
        /* height: calc(100%)!important; */
    }
`

export const TextHistory = styled.div`
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 380px;
    display: flex;

    .history-handle{
        border-radius: 20px 0 0 20px;
        background-color: #9ad5ff;
        width: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .icons{
            width: 2px;
            height: 20px;
            background-color: #fff;
            opacity: .6;
            border-radius: 20px;
        }
    }

    .history{
        flex-grow: 1;
        width: 400px;
        background-color: #fff;
        transition: all .5s;
        &.hidden{
            width: 0;
            flex-grow: 0;
        }
    }
`