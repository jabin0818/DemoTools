import styled from 'styled-components'

export const IndexWrapper = styled.div`
    position: relative;
    max-width: 62.5rem;
    min-height: 100vh;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 1.5625rem 10rem;

    .index-header{
        padding: 2.4rem 0 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: auto;
        font-size: 18px;
        background: none;
        .title{
            
            display: flex;
            align-items: center;
            cursor: pointer;
            position: relative;
            margin: 0.1em 0 0.6rem;
            text-shadow: 0.0625rem 0.0625rem 0.0625rem rgb(0 0 0 / 15%);
            font-family: initial;
            color: var(--color-text);
            font-size: 1.6rem;
            font-weight: 700;
        }

        .userName{
            text-align: center;
            /* color: var(--theme); */
            color: var(--theme-danger);
            font-size: .9rem;
            line-height: initial;
            cursor: pointer;
            margin-bottom: 1.8em;

            span{
                margin-right: .4rem;
            }
        }
    }

    .search-component{

        .search{
            margin: 1.125rem 0 3rem;
            width: 100%;
            padding: 1rem;
            display: flex;
            align-items: center;
            background-color: var(--color-background);
            box-shadow: 0.5rem 0.875rem 2.375rem rgb(39 44 49 / 6%), 0.0625rem 0.1875rem 0.5rem rgb(39 44 49 / 3%);
            box-sizing: border-box;
            border-radius: 0.5rem;
            transition: all .3s ease;

            & > span{
                font-size: 1.5625rem;
                margin-right: 0.9375rem;
            }

            input{
                width: 100%;
                outline: none;
                border: none;
                box-shadow: none;
                background-color: transparent;
                color: var(--color-text);
                font-size: 1rem;
            }

            &.focus{
                background-color: var(--theme)!important;
                color: #fff;
                transform: scale(1.02) translateZ(0);
                box-shadow: 0 0.5rem 0.625rem rgb(36 159 253 / 30%);

                input{
                    color: #fff;

                    &::-webkit-input-placeholder{
                        color: #fff;
                    }
                }
            }
        }
    }

    .tag-component{

        .tag-list{
            display: flex;
            align-items: center;

            a + a {
                margin-left: 0.6rem;
            }

            a{
                position: relative;
                display: flex;
                align-items: center;
                padding: 0.5rem 0.9375rem;
                /* width: 80px;
                height: 40px; */
                font-weight: 700;
                font-size: 1rem;
                color: var(--theme);
                box-shadow: 0 0.5rem 0.625rem rgb(36 159 253 / 30%);
                border-radius: 0.5rem;
                cursor: pointer;
                overflow: hidden;

                span{
                    position: relative;
                }

                .tagIcon{
                    margin-right: 0.4rem;
                }

                &::before{
                    content: "";
                    width: 0px;
                    height: 0px;
                    /* 绝对定位 */
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    border-radius: 50%;
                    transition: all 0.4s;
                }

                &.active::before {
                    width: 150%;
                    height: 150%;
                    background-color: var(--color-background-tag);
                    color: #fff;
                    border-radius: 50%;
                }

                &.active {
                    /* background-color: var(--theme); */
                    color: #fff;
                }
            }

            
        }
    }

    .toolList-component{

    }

`