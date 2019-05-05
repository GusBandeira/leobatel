import styled from 'styled-components'

export const LoadingImage = styled.img`
    display:block;
    margin: auto;
    opacity: 0;
    height: 300px;
    
    -webkit-animation: Fade-in 2.5s ease infinite;
    -moz-animation: Fade-in 2.5s ease infinite;
    -o-animation: Fade-in 2.5s ease infinite;
    animation: Fade-in 2.5s ease infinite;

    @-webkit-keyframes Fade-in {
        0%{opacity: 0}
        6.25%{opacity: 0.125}
        12.5%{opacity: 0.25}
        18.75%{opacity: 0.375}
        25%{opacity: 0.5}
        31.25%{opacity: 0.625}
        37.5%{opacity: 0.75}
        43.75%{opacity: 0.875}
        50%{opacity: 1}
        56.25%{opacity: 0.875}
        62.5%{opacity: 0.75}
        68.75%{opacity: 0.625}
        75%{opacity: 0.5}
        81.25%{opacity: 0.375}
        87.5%{opacity: 0.25}
        93.75%{opacity: 0.125}
        100%{opacity: 0}
    }
    @-moz-keyframes Fade-in {
        0%{opacity: 0}
        6.25%{opacity: 0.125}
        12.5%{opacity: 0.25}
        18.75%{opacity: 0.375}
        25%{opacity: 0.5}
        31.25%{opacity: 0.625}
        37.5%{opacity: 0.75}
        43.75%{opacity: 0.875}
        50%{opacity: 1}
        56.25%{opacity: 0.875}
        62.5%{opacity: 0.75}
        68.75%{opacity: 0.625}
        75%{opacity: 0.5}
        81.25%{opacity: 0.375}
        87.5%{opacity: 0.25}
        93.75%{opacity: 0.125}
        100%{opacity: 0}
    }
    @-o-keyframes Fade-in {
        0%{opacity: 0}
        6.25%{opacity: 0.125}
        12.5%{opacity: 0.25}
        18.75%{opacity: 0.375}
        25%{opacity: 0.5}
        31.25%{opacity: 0.625}
        37.5%{opacity: 0.75}
        43.75%{opacity: 0.875}
        50%{opacity: 1}
        56.25%{opacity: 0.875}
        62.5%{opacity: 0.75}
        68.75%{opacity: 0.625}
        75%{opacity: 0.5}
        81.25%{opacity: 0.375}
        87.5%{opacity: 0.25}
        93.75%{opacity: 0.125}
        100%{opacity: 0}
    }
    @keyframes Fade-in { 
        0%{opacity: 0}
        6.25%{opacity: 0.125}
        12.5%{opacity: 0.25}
        18.75%{opacity: 0.375}
        25%{opacity: 0.5}
        31.25%{opacity: 0.625}
        37.5%{opacity: 0.75}
        43.75%{opacity: 0.875}
        50%{opacity: 1}
        56.25%{opacity: 0.875}
        62.5%{opacity: 0.75}
        68.75%{opacity: 0.625}
        75%{opacity: 0.5}
        81.25%{opacity: 0.375}
        87.5%{opacity: 0.25}
        93.75%{opacity: 0.125}
        100%{opacity: 0}
    }

    @media screen and (max-width: 576px){
        height: 200px;
    }
`