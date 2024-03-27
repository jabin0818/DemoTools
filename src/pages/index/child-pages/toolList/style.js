import styled from 'styled-components'

export const ToolListWrapper = styled.div`

    position: relative;
    padding: 1.5625rem 0;
    margin-top: 1.125rem;
    margin-bottom: 3.125rem;
    /* box-shadow: 0.5rem 0.875rem 2.375rem rgb(39 44 49 / 6%), 0.0625rem 0.1875rem 0.5rem rgb(39 44 49 / 3%); */
    border: none;
    /* border-radius: 0.5rem; */

    .toolList{
        display: grid;
        grid-template-columns: repeat(4, 25%);
        flex-wrap: wrap;
        gap: 14px 10px;
        align-items: center;
        justify-items: center;
        grid-template-columns: repeat(auto-fill,minmax(24%,1fr));

        
        .toolItem{
            width: 100%;
            height: 100px;
            background-color: var(--color-background);
            padding: 0.625rem 0.9375rem;
            border-radius: 0.25rem;
            box-shadow: 0 0.125rem 0.125rem 0 rgb(8 11 14 / 10%);
            cursor: pointer;
            /* width: calc(25% - 0.875rem); */
            /* margin-right: .8rem; */

            &:hover{
                color: #fff;
                transform: translateY(-0.125rem);
                box-shadow: 0 0 0.0625rem 0 rgb(8 11 14 / 6%), 0 0.375rem 0.375rem -0.0625rem rgb(8 11 14 / 10%);
                background-color: var(--theme);
                transition: transform .1s ease,background-color .1s ease,color .05s ease-out;

                .title, .desc, .actions .actionItem{
                    color: #fff;
                }
            }

            .title{
                margin-bottom: 10px;
                font-size: 1.125rem;
                font-weight: 700;
                color: var(--color-text);
                display: -webkit-box;
                text-overflow: ellipsis;
                overflow: hidden;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
            }

            .desc{
                min-height: 24px;
                font-size: .76rem;
                color: #7e7e7e;
            }

            .actions{
                display: flex;
                align-items: center;

                .actionItem + .actionItem{
                    margin-left: 1rem;
                }
                .actionItem{
                    /* color: var(--color-text); */
                    color: #7e7e7e;
                    cursor: pointer;
                    .icon{
                        font-size: .8rem;
                        
                    }
                }
            }
        }

    }
`