import styled from 'styled-components'


export const NavbarWrapper = styled.div`

`
export const SidebarBtnWrapper = styled.div`
    position: fixed;
    z-index: 1;
    top: 1.25rem;
    left: 1.25rem;
    display: flex;

    .sidebarBtn{
        cursor: pointer;
        background-color: var(--color-background);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.625rem;
        border-radius: 100%;
        box-shadow: 0 0.1875rem 0.6875rem -0.125rem rgb(0 8 16 / 8%);
        border: 0.0625rem solid var(--color-text-placeholder);

        span{
            color: var(--color-text);
            font-size: 1.1rem;
        }
    }

    .weatherPanel{
        cursor: pointer;

        span{
            color: var(--color-text);
            font-size: 1.1rem;
        }

        i{
            color: var(--color-text);
            font-size: 1.1rem;
            margin: 0 .375rem;
        }
    }
`

export const SidebarWrapper = styled.div`
    
`

export const SidebarTop = styled.div`
    padding: 0.2rem 1.5625rem 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .Login{
        margin-bottom: 0.625rem;
        margin-top: 0;

        h1{
            color: var(--color-text);
            font-weight: 700;
            user-select: none;
            cursor: pointer;
        }
    }

    .dark-theme{
        width: 2.1875rem;
        height: 2.1875rem;
        font-size: 1.25rem;
        border-radius: 50%;
        border: 0.0625rem solid #c0c4cc;
        cursor: pointer;
        transition: all .1s linear;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
            font-size: 1rem;
            color: var(--color-text);
            
        }
    }
`
export const SidebarMenu = styled.div`
    
    ul{
        padding: 0.625rem 0;
        margin: 0;
        border-bottom: 0.0625rem solid var(--color-text-placeholder);
        &:last-child {
            border-bottom: none;
        }

        li{
            padding: 1rem 1.6rem;
            display: flex;
            align-items: center;
            cursor: pointer;
            a{
                color: var(--color-text);

                .NavIcon{
                    margin-right: 0.625rem;
                    font-size: 1rem;
                    opacity: .95;
                }

                .NavText{
                    font-size: 1rem;
                }
            }

            &:hover{
                background-color: var(--color-background-primary);
            }
        }
    }
`

export const SidebarFooter = styled.div`
    /* height: 35px;
    background-color: #c20c0c;
    overflow: hidden; */
`

export const WeatherPopover = styled.div`
    display: flex;
    flex-direction: column;
    width: 16.25rem;
    height: 11.25rem;

    .weather-header{
        display: flex;
        justify-content: space-between;

        .weather-header-city{
            color: var(--color-text);
        }
        .weather-header-sources{
            color: var(--color-text);
        }
    }

    .weather-center{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        height: 6.875rem;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: .625rem;
        
        .weather-center-left{
            

            .weather-center-temp{
                font-size: 60px;
                color: var(--color-level-color);
                line-height: 80px;
            }

            .weather-center-time{
                font-size: 12px;
                color: #7e7e7e;
            }
        }

        .weather-center-right{
            font-size: 12px;
            color: var(--color-text);
            .wcr-text{
                i{
                    font-size: 10px;
                    margin-right: .25rem;
                }
            }

        }
    }

    .weather-footer{

        .weather-footer-ul{
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 3.75rem;
            margin-bottom: 0;
            .footer-li{

                .content{
                    color: var(--color-level-color);
                    font-size: 16px;
                }

                .title{
                    color: var(--color-text);
                    font-size: 12px;
                }
            }
        }
    }
`