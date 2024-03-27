import styled from "styled-components"

export const DictCardWrapper = styled.div`
    
    --c-gray-100: #fbf8f2;
	--c-gray-200: #fcfdfe;
	--c-gray-300: #e9ebec;
	--c-gray-400: #e3e4ea;
	--c-gray-500: #5f5f5f;
	--c-gray-900: #1d1d1d;
	--c-blue-300: #a8dee2;
	--c-blue-500: #2ab3c0;
	--c-green-500: #80b895;
	--c-green-300: #bad5ca;
	--c-red-500: #ea605e;
	--c-yellow-300: #f8e0b1;
	--c-yellow-500: #f9bc73;

    .phone {
        width: 860px;
        border-radius: 25px;
        height: 100vh;
        padding: 1rem 2rem;
        position: relative;
        z-index: 1;
        margin-left: auto;
        margin-right: auto;
    }

    .search {
        position: relative;
        display: flex;
        justify-content: center;
        z-index: 1;
        transition: 0.15s ease;
        &:hover,
        &:focus-within {
            transform: translatey(-2px);
        }
    }

    .search-inner {
        display: flex;
        align-items: center;
        border: 2px solid var(--color-level-color);
        border-radius: 18px;
        height: 60px;
        font-size: 1rem;
        width: 80%;
        background-color: #fff;
        position: relative;
        

        &:after {
            content: "";
            display: block;
            position: absolute;
            z-index: -1;
            width: 96%;
            height: 100%;
            bottom: -9px;
            left: calc(50% - 48%);
            border-radius: 20px;
            border: 2px solid var(--color-level-color);
            background-color: var(--c-gray-100);
            transition: 0.15s ease;
        }

        &:hover,
        &:focus-within {
            input::placeholder {
                color: #787878;
            }
            &:after {
                transform: translatey(2px);
            }
        }
    }

    .search-button {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 15px 0 0 15px;
        border: 0;
        background-color: var(--c-gray-100);
        position: relative;
        height: 100%;
        border-right: 2px solid var(--color-level-color);
        width: 70px;
        transition: 0.15s ease;
        cursor: pointer;
        i {
            font-size: 1.25em;
        }

        &:focus,
        &:hover {
            background-color: var(--c-yellow-300);
            outline: 0;
        }
    }

    .search-input {
        border: 0;
        border-radius: 0 15px 15px 0;
        height: 100%;
        background-color: var(--color-background);
        width: 100%;
        padding-left: 1em;
        padding-right: 1em;
        color: var(--color-text);
        &:focus {
            outline: 0;
        }
        &::placeholder {
            font-weight: 600;
            color: var(--color-text);
            transition: 0.15s ease;
        }
    }

    

    .playlists {
        margin-top: 1.5rem;
        display: flex;
        padding: 2rem 0.5rem;
    }

    

    .menu{
        position: fixed;
        left: 50%;
        bottom: 20px;
        transform: translateX(-50%);
        z-index: -1;
        
        .menu-inner {
            margin-top: 2rem;
            display: flex;
            justify-content: center;
            border-radius: 15px;
            border: 2px solid var(--color-level-color);
            justify-content: space-between;
            padding: .75rem;
            background-color: var(--theme);
            position: relative;
        }

        .menu-item {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            color: #fff;
            width: 80px;
            border-radius: 15px;
            padding-top: .25rem;
            padding-bottom: .25rem;
            text-decoration: none;
            background-color: transparent;
            border: 2px solid transparent;
            &:hover,
            &:focus, &.active {
                border-color: var(--c-gray-900);
                background-color: var(--c-yellow-500);
                color: var(--c-gray-900);
            }
        }
    }
`

export const ModelWrapper = styled.div`
    .navigation {
        margin-top: 2rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid var(--color-text-gray);
        display: flex;
        justify-content: space-between;
    }

    .navigation-item {
        font-size: 1.125rem;
        display: inline-block;
        padding: 0 0.5rem;
        text-decoration: none;
        color: inherit;
        position: relative;
        font-weight: 500;
        color: var(--color-level-color);
        &.active {
            font-weight: 800;
            &:before {
                background-color: var(--c-yellow-500);
            }
        }

        &:before {
            content: "";
            display: block;
            position: absolute;
            width: 100%;
            height: 14px;
            background-color: transparent;
            z-index: -1;
            bottom: -2px;
            left: 0;
            transition: 0.15s ease;
        }

        & + & {
            margin-left: 1.25rem;
        }

        &:hover:before,
        &:focus {
            background-color: var(--c-yellow-500);
        }

        .drop-menu{
            display: none;
            position: absolute;
            top: 100%;
            left: -56%;
            width: 125px;
            
            .drop-menu-wrapper{
                margin-top: 20px;
                flex-direction: column;
                align-items: center;
                border-radius: 20px;
                background: #fff;
                padding: 10px;
                border: 2px solid var(--color-level-color);
                z-index: 1;

                .drop-menu-item{
                    display: block;
                    margin: 10px 0;
                    color: #000;
                }
            }
        }
    }

    .navigation-item-other{
        position: relative;

        &:hover .drop-menu, &:focus-within .drop-menu{
            display: flex;
        }
    }
    .currently-playing {

        padding: 4rem 0.5rem;
        .currently-playing{

        }
        .container {
            position: relative;
            margin: 0 auto;
            height: 325px;
            perspective:100rem;

            .progress{
                position:absolute;
                top: -20px;
                left: 5px;
                color: #5264AE;
                font-size: 14px;

            }
        }
        
        @keyframes lastcard {
            from {
                z-index: 2;
                transform: scale(.8);
            }
            
            50% {
                z-index: 2;
            }
            
            51% {
                z-index: 10;
                transform: scale(0.95) translateY(-300px) translateX(30px) rotate(15deg)
            }

            to {
                z-index: 10
            }
        }

        @keyframes nextcard {
            from {
                z-index: 10 /* make sure the new card-1 does not show above the card sliding up */
            }
            
            50% {
                z-index: 10; /* maintain z-index */
                transform: scale(0.95) translateY(-300px) translateX(30px) rotate(15deg) 
            }
            
            51% { 
                z-index: 2 /*transition to lower z-index ~instantly instead of step-wise */
            }

            to {
                z-index: 2;
                transform: scale(.8);
            }
        }

        @keyframes card3 {
            from {
                transform: scale(.8)
            }
            to {
                
            }
            to {
                z-index: 3;
                transform: scale(.8) translateY(4rem) rotate(-1deg)
            }
        }

        .card {
            width: 100%;
            position: absolute;
            transition: transform 500ms, width 0.25s, height 0.25s;
            border: 2px solid var(--color-level-color);
            border-radius: 20px;

            .card-external{
                
                .card-pin {
                    display: none;
                    position: absolute;
                    left: 10px;
                    top: 10px;
                    width: 12px;
                    height: 12px;
                    background-color: var(--c-gray-900);
                    border-radius: 50%;
                    box-shadow: 0 0 0 2px #fff, 0 0 0 3px var(--c-gray-900);
                    transform: rotate(-45deg);
                    z-index: 1;
                    &:before,
                    &:after {
                        content: "";
                        display: block;
                        border-radius: 50%;
                        position: absolute;
                        transition: 0.15s ease-out;
                    }

                    &:before {
                        width: 12px;
                        height: 12px;
                        background-color: var(--c-gray-900);
                        border-radius: 50%;
                        left: calc(50% - 6px);
                        top: -44px;
                    }

                    &:after {
                        width: 6px;
                        background-color: #fff;
                        border: 1px solid;
                        border-radius: 99em;
                        height: 50px;
                        left: calc(50% - 3px);
                        bottom: 3px;
                    }

                    &.simple {
                        &:nth-of-type(odd) {
                            left: 10px;
                            top: 10px;
                            transform: rotate(-45deg);
                        }

                        &:nth-of-type(even) {
                            left: calc(100% - 20px);
                            top: calc(100% - 20px);
                            transform: rotate(120deg);
                        }
                    }
                }

                .card-more{
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    span{
                        font-size: 22px;
                        color: #fff;
                        cursor: pointer;
                    }

                    .multi-button { 
                        z-index: -1;
                        position: absolute;
                        top: 16px;
                        right: -20px;
                        border-radius:100%;
                        width:0rem;
                        height:0rem;
                        transform: translate(50%,-50%);
                        transition: width .25s cubic-bezier(0.25, 0, 0, 1), height .25s cubic-bezier(0.25, 0, 0, 1), opacity .25s cubic-bezier(0.25, 0, 0, 1);
                        opacity: 0;
                        button {
                            display: grid;
                            place-items: center;
                            position: absolute;
                            width:2rem;
                            height:2rem;
                            border:none;
                            border-radius:100%;
                            transform: translate(-50%, -50%);
                            cursor: pointer;
                            transition: .25s cubic-bezier(0.25, 0, 0, 1);
                            &:hover {
                                background: #fff;
                            }
                            & > span {
                                color: #fff;
                            }

                            
                            &:first-child:nth-last-child(4), //If there are 4 children, if first child is also 4th item from bottom get self, and
                            &:first-child:nth-last-child(4) ~ * { //If there are 4 children, if first child is also 4th item from bottom get siblings
                                &:nth-child(1) {
                                    /* left:62.5%;
                                    top:18.75%; */
                                    right:18.75%;
                                    top:62.5%;
                                }
                                &:nth-child(2) {
                                    /* left:37.5%;
                                    top:18.75%; */
                                    right:18.75%;
                                    top:37.5%;
                                }
                                &:nth-child(3) {
                                    /* left:18.75%;
                                    top:37.5%; */
                                    right:37.5%;
                                    top:18.75%;
                                }
                                &:nth-child(4) {
                                    /* left:18.75%;
                                    top:62.5%; */
                                    right:62.5%;
                                    top:18.75%;
                                }
                            }

                            &.fas.dictCard-wubi-stared{
                                background-color: #fff;
                                & > span{
                                    color: var(--color-warning);
                                }
                            }
                        }
                    }

                    .card-1-button{
                        button{
                            background: #7DAC9A;
                            box-shadow:0 0 0rem -.25rem #7DAC9A;

                            &:hover {
                                color:#7DAC9A;
                                box-shadow:0 0 1rem -.25rem #7DAC9A;
                                & > span {
                                    color: #7DAC9A;
                                }
                            }
                        }
                    }
                    .card-2-button{
                        button{
                            background: #D9A739;
                            box-shadow:0 0 0rem -.25rem #D9A739;

                            &:hover {
                                color:#D9A739;
                                box-shadow:0 0 1rem -.25rem #D9A739;
                                & > span {
                                    color: #D9A739;
                                }
                            }
                        }
                    }
                    .card-3-button{
                        button{
                            background: #EA5C2A;
                            box-shadow:0 0 0rem -.25rem #EA5C2A;

                            &:hover {
                                color:#EA5C2A;
                                box-shadow:0 0 1rem -.25rem #EA5C2A;
                                & > span {
                                    color: #EA5C2A;
                                }
                            }
                        }
                    }
                    .card-4-button{
                        button{
                            background: #317EF6;
                            box-shadow:0 0 0rem -.25rem #317EF6;

                            &:hover {
                                color:#317EF6;
                                box-shadow:0 0 1rem -.25rem #317EF6;
                                & > span {
                                    color: #317EF6;
                                }
                            }
                        }
                    }

                    /* &:hover .multi-button, .multi-button:focus-within {
                        width:10rem;
                        height:10rem;
                    } */
                    &:hover .multi-button {
                        width:10rem;
                        height:10rem;
                        z-index: 100;
                        opacity: 1;
                    }
                }

                
            }
        }

        .card-1 {
            box-shadow: 0 0 40px rgb(0 0 0 / 10%);
            z-index: 5;
            /* animation-duration: 600ms;
            animation-name: lastcard;
            animation-fill-mode: forwards;
            animation-timing-function: ease-out; */
            
            .card-external {
                .card-pin{
                    display: inline-block;
                }
            }

            .x{

                .codeBox{
                    display: block;
                }

                .nullData{
                    font-size: 40px;
                    .nullData-text{
                        margin-right: 10px;
                    }
                }
            }
        }

        .card-1:hover {
            transform: rotateY(10deg);
        }

        .card-2 {
            z-index: 4;
            transform: scale(.9) translateY(2rem) rotate(2deg);
        }

        .card-3 {
            transform: scale(.8);
            animation-duration: 300ms;
            animation-delay: 500ms;
            animation-name: card3;
            animation-fill-mode: forwards;
            animation-timing-function: ease-out;
        }

        .card-4 {
            animation-duration: 600ms;
            animation-name: nextcard;
            animation-fill-mode: forwards;
            animation-timing-function: ease-out;
        }

        .x {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            vertical-align: middle;
            box-sizing: border-box;
            box-shadow: 3px 3px 18px rgba(0,0,0,0.1);
            width: 100%;
            height: 250px;
            padding: 17px 0;
            border-radius: 1rem;
            color: white;

            .tipBox{
                & > span{
                    font-size: 28px;
                }
            }

            .wordBox{
                user-select: none;
                & > span{
                    font-size: 120px;
                }
            }

            .codeBox{
                display: none;
                .codeBox-input{
                    position: relative;
                    width: 60%;
                    margin: 0 auto;
                    input{
                        font-size: 18px;
                        padding: 15px 0 8px;
                        display: block;
                        width: 100%;
                        border: none;
                        text-align: center;
                        background: transparent;
                        border-bottom: 1px solid #1d1d1d;
                        
                        &:focus {
                            outline: none;
                        }

                        /* &:focus~label,
                        &:valid~label {
                            top: -20px;
                            font-size: 14px;
                            color: #fff;
                        } */
                        &:focus~label {
                            left: -24px;
                            font-size: 14px;
                            color: #fff;
                        }
                    }

                    label {
                        color: #1d1d1d;
                        font-size: 18px;
                        font-weight: normal;
                        position: absolute;
                        pointer-events: none;
                        left: 50%;
                        top: 16px;
                        transform: translate(-50%);
                        transition: 0.2s ease all;
                        -moz-transition: 0.2s ease all;
                        -webkit-transition: 0.2s ease all;
                    }

                    

                    .bar {
                        position: relative;
                        display: block;
                        width: 100%;
                    }

                    .bar:before,
                    .bar:after {
                        content: '';
                        height: 2px;
                        width: 0;
                        bottom: 0;
                        position: absolute;
                        background: #fff;
                        transition: 0.2s ease all;
                        -moz-transition: 0.2s ease all;
                        -webkit-transition: 0.2s ease all;
                    }

                    .bar:before {
                        left: 50%;
                    }

                    .bar:after {
                        right: 50%;
                    }

                    /* active state */
                    input:focus~.bar:before,
                    input:focus~.bar:after {
                        width: 50%;
                    }
                }
            }
        }

        .content-1 {
            background-color: #7DAC9A;
        }

        .content-2 {
            background-color: #D9A739;
        }

        .content-3 {
            background-color: #EA5C2A;
        }

        .content-4 {
            background-color: #317EF6;
        }
    }

    .cardBox {
        width: 200px;
        transform: rotate(var(--rotation));
        transition: 0.15s ease-out;

        &:nth-child(2) {
            margin-top: 1rem;
            --rotation: 5deg;
            .card-inner:after {
                background-color: var(--c-green-300);
            }

            .card-pin {
                top: 20px;
                left: 20px;
                transform: rotate(-5deg);
            }
        }

        & + & {
            margin-left: 2rem;
        }
        &:hover,
        &:focus-within {
            transform: translateY(4px) rotate(var(--rotation));

            .card-inner {
                background-color: var(--c-gray-100);
            }
            .card-pin:after {
                height: 54px;
            }

            .card-pin:before {
                transform: translatey(-4px);
            }
        }

        &.horizontal {
            width: 100%;
            /* transform: rotate(3deg); */
            .card-inner {
                flex-direction: row;
                align-items: center;
                padding: 1rem;
                &:after {
                    background-color: var(--c-green-500);
                }
            }

            .card-image {
                width: 60px;
                height: 60px;
                flex-shrink: 0;
            }

            .card-content {
                width: 100%;
                margin-top: 0;
                margin-left: 0.5rem;
            }

            .card-meta-artist {
                font-weight: 700;
            }

            .card-title {
                font-weight: 500;
                color: var(--c-gray-500);
                font-size: 1.125em;
                margin-top: 0.125em;
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                justify-content: space-between;
            }

            .card-time {
                font-weight: 600;
            }

            &:hover,
            &:focus-within {
                .card-pin.simple:before,
                .card-pin.simple:after {
                    transform: none;
                }

                .card-pin.simple:after {
                    height: 50px;
                }
            }
        }
    }

    .card-inner {
        display: flex;
        flex-direction: column;
        border: 2px solid var(--color-level-color);
        border-radius: 20px;
        padding: 0.5rem;
        background-color: #fff;
        position: relative;
        &:after {
            content: "";
            display: block;
            position: absolute;
            z-index: -1;
            width: 95%;
            height: 100%;
            bottom: -9px;
            left: calc(50% - 47.5%);
            border-radius: 20px;
            border: 2px solid var(--color-level-color);
            background-color: var(--c-yellow-300);
        }
    }

    .card-pin {
        width: 12px;
        height: 12px;
        background-color: var(--c-gray-900);
        position: absolute;
        top: 20px;
        left: calc(50% - 6px);
        border-radius: 50%;
        box-shadow: 0 0 0 2px #fff, 0 0 0 3px var(--c-gray-900);
        transform: rotate(3deg);
        z-index: 1;
        &:before,
        &:after {
            content: "";
            display: block;
            border-radius: 50%;
            position: absolute;
            transition: 0.15s ease-out;
        }

        &:before {
            width: 12px;
            height: 12px;
            background-color: var(--c-gray-900);
            border-radius: 50%;
            left: calc(50% - 6px);
            top: -44px;
        }

        &:after {
            width: 6px;
            background-color: #fff;
            border: 1px solid;
            border-radius: 99em;
            height: 50px;
            left: calc(50% - 3px);
            bottom: 3px;
        }

        &.simple {
            box-shadow: none;
            &:nth-of-type(odd) {
                left: 10px;
                top: 10px;
                transform: rotate(-45deg);
            }

            &:nth-of-type(even) {
                left: calc(100% - 20px);
                top: calc(100% - 20px);
                transform: rotate(120deg);
            }
        }
    }

    .card-image {
        border-radius: 15px;
        overflow: hidden;
        aspect-ratio: 4 / 3;
        position: relative;
        img {
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .card-meta,
    .card-title {
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }

    .card-meta {
        padding-top: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .card-meta-number {
        color: var(--c-gray-500);
        font-size: 0.875rem;
        font-weight: 500;
    }

    .card-meta-button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        color: var(--c-gray-900);
        flex-shrink: 0;
        cursor: pointer;
        padding: 0;
        line-height: 0;
        border-radius: 50%;
        background-color: transparent;
        i {
            font-size: 1.75rem;
        }
        &:after {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }

    .card-title {
        margin-top: 0.25rem;
        font-size: 1rem;
        font-weight: 600;
        padding-bottom: 0.5rem;
    }
`