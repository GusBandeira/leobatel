import styled from 'styled-components'

export const BannerImage = styled.img`
  object-fit: cover;
  object-position: ${props => props.cover || "30% 30%"};
  height: 600px;
  width: 100vw;
`
export const BannerShadow = styled.div`
  width: 100%;
  height: 600px;
  position: absolute;
  bottom: 0;
  color: transparent;

  -webkit-box-shadow: inset 0px -225px 300px -100px rgba(30, 30, 30, 0.9);
  -moz-box-shadow: inset 0px -225px 300px -100px rgba(30, 30, 30, 0.9);
  box-shadow: inset 0px -225px 300px -100px rgba(30, 30, 30, 0.9);
`
export const BannerTitle = styled.div`
  height: 300px !important;
  position: absolute;
  top: 50% !important;
  color: white;
  padding-top: 150px;
  display: inline-grid;
  left: 10%;
  right: 10%;

  span {
    text-align: center;
    width: 960px;
    margin: 0 auto;
  }
  span:first-child{
    font-size: 36px;
    margin: auto;
    
  }
  span:nth-child(2){
    font-size: 22px;
  }
  @media screen and (max-width: 576px) {
    span:first-child{
      font-size: 22px;
    }
    span:nth-child(2){
      font-size: 16px;
    }
  }
`
export const CarousselContainer = styled.div`
  height: 600px;
`