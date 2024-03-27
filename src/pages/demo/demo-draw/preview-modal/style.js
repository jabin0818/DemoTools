import styled from 'styled-components'

export const PreviewModalWrapper = styled.div`

    overflow: hidden;

    .preview-info{
        display: flex;
        align-items: center;
        justify-content: space-between;

        .preivew-info-left{
            display: flex;
            align-items: center;
            
            .title{
                margin-right: 10px;
            }

            .score{

            }
        }

        .preivew-info-right{

            .update-template-btn{

            }

            .use-template-btn{

            }
        }
    }

    .preview-graph{
        width: 100%;
        height: 540px;
        border: 1px solid var(--border-color);
        overflow: hidden;
        margin-top: 20px
    }
`