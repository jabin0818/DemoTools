import styled from 'styled-components'

export const ErrorPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    margin: 0;
    .fof{
        h1{
            padding-right: 24px;
            letter-spacing: -4px;
            font-size: 160px;
            color: var(--theme);
            animation: glitch 1s linear infinite,type .5s alternate infinite;
            user-select: none;
            cursor: default;

            &:hover{
                animation-play-state:paused;
                
                &::before,&::after{
                    animation-play-state:paused;
                }
            }
        }

        @keyframes glitch{
            2%,64%{
                transform: translate(2px,0) skew(0deg);
            }
            4%,60%{
                transform: translate(-2px,0) skew(0deg);
            }
            62%{
                transform: translate(0,0) skew(5deg); 
            }
        }

        @keyframes type{
            from{box-shadow: inset -3px 0px 0px #888;}
            to{box-shadow: inset -3px 0px 0px transparent;}
        }

        h1:before,
        h1:after{
            content: attr(data-title);
            position: absolute;
            left: 0;
        }

        h1:before{
            animation: glitchTop 1s linear infinite;
            clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
            -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
        }

        @keyframes glitchTop{
            2%,64%{
                transform: translate(2px,-2px);
            }
            4%,60%{
                transform: translate(-2px,2px);
            }
            62%{
                transform: translate(13px,-1px) skew(-13deg); 
            }
        }

        h1:after{
            animation: glitchBotom 1.5s linear infinite;
            clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
            -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
        }

        @keyframes glitchBotom{
            2%,64%{
                transform: translate(-2px,0);
            }
            4%,60%{
                transform: translate(-2px,0);
            }
            62%{
                transform: translate(-22px,5px) skew(21deg); 
            }
        }
    }

    .tip{
        font-size: 34px;
        color: #afafaf;
    }
    
`