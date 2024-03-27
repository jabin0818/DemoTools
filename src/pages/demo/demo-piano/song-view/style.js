import styled from 'styled-components'

export const SongViewWrapper = styled.div`
    height: 90%;
    height: 240px;
    overflow: hidden;
    /* position: absolute; */
    width: 100%;
    margin: 4vh auto 1vh;
    .songView-inner{
        font-size: 18px;
        padding: 5px 8px;
        /* opacity: 0.6; */
        // transition: all .5s ease;
        height: 240px;
        max-width: 60vw;
        margin: 0 auto;
        border: 1px solid var(--theme);
        background-color: var(--color-background);
        border-radius: 8px;
        
        .songView-header{
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;

            .header-left{
                width: 8.75rem;
                color: var(--theme);
                font-size: 14px;
                
                span{
                    cursor: pointer;
                }
            }

            .header-center{
                
                .tabs {
                    background: rgb(216 223 231 / 50%);
                    width: 300px;
                    height: 40px;
                    padding: 0;
                    position: relative;
                    border-radius: 40px;
                    box-shadow: 0 10px 30px rgba(#414856, 0.05);
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    padding: 0 15px;
                    box-sizing: border-box;
                    overflow: hidden;

                    label {
                        width: 70px;
                        height: 26px;
                        cursor: pointer;
                        position: relative;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        transform-origin: center bottom;
                        font-size: 14px;
                        border-radius: 6px;
                        /* border: 1px solid var(--theme); */
                        overflow: hidden;
                        &::before {
                            content: "";
                            height: 4px;
                            width: 4px;
                            border-radius: 0% 100% 50% 50% / 0% 50% 50% 100%;
                            transform: scale(1, 1) rotate(45deg);
                            transform-origin: 50% 50%;
                            background: #2AC8DD;
                            display: block;
                            position: absolute;
                            top: -30px;
                        }

                        .wave {
                            height: 27px;
                            width: 101%;
                            position: absolute;
                            overflow: hidden;
                            
                            &::before,
                            &::after {
                                content: "";
                                position: absolute;
                                left: 0;
                                bottom: -27px;
                                right: 0;
                                background-repeat: repeat;
                                height: 27px;
                                /* width: 88px; */
                                background-size: 12px 12px;
                                /* animation: wave-animation 3s linear infinite; */
                                transition: bottom .5s ease-out .35s;
                            }

                            &::before {
                                /* background-image: radial-gradient(circle at 6px -3px, transparent 6px, var(--theme) 6px); */
                                background-color: var(--theme);
                                animation-duration: 2s;
                                /* opacity: .5; */
                            }

                            &::after {
                                /* background-image: radial-gradient(circle at 6px -3px, transparent 6px, var(--theme) 6px); */
                                background-color: var(--theme);
                                animation-duration: 3s;
                            }
                        }

                        span{
                            z-index: 10;
                            transition: color .5s;
                        }

                    }

                    input {
                        display: none;

                        &:checked {
                            +label {
                                animation: wiggle-animation 1s ease .3s;

                                &::before {
                                    animation: drop-animation .35s ease-in both;
                                }

                                .wave {
                                    &:before {
                                        bottom: 0;
                                    }

                                    &:after {
                                        bottom: -4px;
                                    }
                                }

                                span{
                                    color: #fff;
                                }
                            }
                        }
                    }
                }

                @keyframes wiggle-animation {
                    0% {
                        transform: rotate(0deg);
                    }

                    20% {
                        transform: rotate(-4deg);
                    }

                    60% {
                        transform: rotate(4deg);
                    }

                    90% {
                        transform: rotate(-1deg);
                    }

                    100% {
                        transform: rotate(0deg);
                    }
                }

                @keyframes wave-animation {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }

                @keyframes drop-animation {
                    70% {
                        transform: scale(.8, 3) rotate(45deg);
                        top: -7px;
                    }

                    100% {
                        transform: scale(1.5, .5) rotate(45deg);
                        top: 19px;
                    }
                }

            }

            .header-right{
                display: flex;
                justify-content: flex-end;
                align-items: flex-start;
                width: 8.75rem;
                cursor: pointer;
                span{
                    font-weight: 600;
                    &:first-child{
                        vertical-align: top;
                        font-size: 16px;
                        color: var(--theme);
                        margin-right: 5px;
                        
                    }

                    &:last-child{
                        color: #248ddd;
                    }
                }
            }
        }

        .songView-words{
            display: flex;
            flex-wrap: wrap;
            font-size: 18px;
            padding: 18px 0;
            opacity: 0.8;
            height: 140px;
            user-select: none;
            overflow: hidden auto;
            /* overflow: hidden scroll ;
            scroll-behavior: smooth; */

            .songView-word{
                /* height: 68px; */
                scroll-snap-align: center;
                display: inline-block;
                margin: 0 4px;
                color: #747474;
                transition: color .5s ease;
                font-size: 22px;
                margin: 6px 5px;
                font-weight: 600;
                

                span{
                    color: var(--color-piano-char);
                    border-left: 1px solid transparent;
                    border-right: 1px solid transparent;
                }

                .caret-char-left{
                    border-left: 1px solid #0091ff;
                    border-right: 1px solid transparent;
                }
                .caret-char-right-correct{
                    color: var(--color-piano-char-actived);
                    border-right: 1px solid rgb(61, 90, 254);
                    border-left: 1px solid transparent;
                }

                .char{
                    /* border-left: 1px solid transparent;
                    border-right: 1px solid transparent; */
                    /* color: var(--color-piano-char); */
                }

                .error-char, .caret-char-right-error, .caret-extra-char-right-error{
                    color: #ce1d29;
                }

                .caret-char-right-error, .caret-extra-char-right-error{
                    border-right: 1px solid rgb(206,29,41);
                    border-left: 1px solid transparent;
                }

                .actived{
                    /* color: #0091ff; */
                    color: var(--color-piano-char-actived);
                }
            }

            & > div{
                color: var(--color-piano-char);
                .chinese-word-key{
                    margin: 4px 4px;
                    background-color: none;
                    display: flex;
                    justify-content: center;
                    font-size: 20px;
                    scroll-margin: 4px;
                    text-align: center;
                }
                .chinese-word{
                    margin: 0 12px 14px 12px;
                    display: flex;
                    padding-right: 2px;
                    border-bottom: 1px solid transparent;
                    border-top: 1px solid transparent;
                }
                
                
            }
            .active-word{
                color: var(--theme);
            }
            .actived-word{
                color: var(--color-piano-char-actived);
            }
            .error-word{
                color: #ce1d29;
            }
        }

        .freeModel-words{
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            width: 100%;
            height: 140px;
            padding: 16px 0;
            font-size: 22px;
            font-weight: 600;
            opacity: 0.8;
            letter-spacing:10px;
            user-select: none;
            overflow: hidden;

            textarea{
                width: 100%;
                height: 140px;
                line-height: 30px;
                letter-spacing: 10px;
            }
        }

        .hidden-input{
            opacity:0;
            filter:alpha(opacity=0);
        }
    }
`