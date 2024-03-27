import styled from 'styled-components'

export const TestResultsWrapper = styled.div`

    padding-top: 1rem;
    padding-bottom: .625rem;
    .testResults-top{
        display : flex;
        margin-bottom: .375rem;
        .testResults-col{

            .testResults-row{
                font-size: 15px;
                margin-bottom: .625rem;

                span{
                    &:first-child{
                        font-weight: 600;
                    }

                    &:last-child{
                        color: #606266;
                        font-weight: 500;
                    }
                }

                i {
                    margin-left: 2px;
                    font-size: 12px;
                    font-weight: 500;
                    color: #606266;
                }   
            }
        }
    }

    .testResults-bottom{
        font-size: 15px;

        .tag{

            .tag-label{
                
                margin-bottom: .3125rem;

                .tag-label-text{
                    font-weight: 600;
                }

                .right-num ,.wrong-num{
                    font-size: 12px;
                    color: #606266;
                }
            }
        }

        .right-tag{
            margin-bottom: 1rem;
        }

        .wrong-tag{
            margin-bottom: 1rem;
        }
    }
`