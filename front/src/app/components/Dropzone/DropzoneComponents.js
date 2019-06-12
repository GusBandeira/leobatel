import styled from 'styled-components'

export const getColor = (props) => {
    if (props.isDragReject) {
        return '#c66';
    }
    if (props.isDragActive) {
        return '#6c6';
    }
    return '#666';
};

export const ThumbsContainer = styled.aside`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 16px;
    margin-bottom: 12px;
  `;

export const Action = styled.div`
  text-align: center;
  font-size: 14px;
  opacity: 0.8;
  cursor: pointer;
  margin: 10px 0;

  svg.red{
    color: red;
  }
  svg.green{
    color: green;
  }
  span{
    font-weight: 700;
    margin-left: 5px;
  }
  :hover{
    opacity: 1;
  }
`
export const ImageTitle = styled.div`
  text-align: center;
  font-size: 14px;
  opacity: 0.8;
  margin: 10px 0;
  font-weight: 700;
  padding-left: 5px;
  width: 200px;
`

export const Thumb = styled.div`
    display: block;
    border-radius: 2px;
    border: ${props => props.noBorder ? "" : "1px solid #eaeaea"};
    padding: 4px;
    box-sizing: border-box;
    margin: ${props => props.multi ? '10px 5px auto' : '10px auto'};
  `;

export const ThumbInner = styled.div`
    display: flex;
    overflow: hidden;
    min-width: 100px;
    max-width: 200px;
    min-height: 100px;
    max-height: 200px;
  `

export const ThumbImg = styled.img`
    display: block;
    width: auto;
    border-radius: ${props => props.profile ? '100px' : '0'};
  `;

export const DropzoneContainer = styled.div`
    width: 100%;
    height: 200px;
    border-width: 2px;
    border-radius: 5px;
    border-color: ${props => getColor(props)};
    border-style: ${props => props.isDragReject || props.isDragActive ? 'solid' : 'dashed'};
    background-color: ${props => props.isDragReject || props.isDragActive ? '#eee' : ''};
    outline: none;
    margin-top: 5px;
    display: flex;
  `;

export const PhotoContainer = styled.div`
    text-align: center
`

export const InfoMessage = styled.span`
    margin: auto;
    display: grid;
    text-align: center;
    font-size: 14px;

    span{
        font-size: 12px;
        margin-top: 10px;
    }
  `

export const ThumbClose = styled.span`
    position: absolute;
    width: 65px;
    height: 65px;
    top: 44%;
    left: 38%;
    background-color: lightgrey;
    border-radius: 50px;
    cursor: pointer;
    z-index: 100;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    :hover{
        color: red;
        background-color: darkgrey;
    }
    ::before{
        content: '\0d7';
        position: absolute;
        top: -4%;
        color: black;
        left: 0;
        right: 0;
        font-size: 65px;
        text-align: center;
        font-family: Arial,sans-serif;
    }
  `