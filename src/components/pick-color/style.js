import styled from 'styled-components'

export const PickColorWrapper = styled.div`

    .pickColor-wrapper{
        .pickColor-swatch{
            display: inline-block;
            padding: 5px;
            background-color: #fff;
            border-radius: 1px;
            box-shadow: 0 0 0 1px rgba(0,0,0,.1);
            cursor: pointer;

            .pickColor{
                width: 36px;
                height: 16px;
                border-radius: 2px;
            }
        }
    }
    .pickColor-popover{
        position: absolute;
        z-index: 100;

        .pickColor-close{
            position: absolute;
            top: 2px;
            right: 5px;
            cursor: pointer;
            
            & > span {
                font-size: 12px;
                color: #000;
            }
        }

        .sketch-picker {
            padding-top: 20px!important;
        }
    }

    .pickColor-popover-proPanel{
        right: 50%;
        transform: translate(50%, 0);
    }


        
` 