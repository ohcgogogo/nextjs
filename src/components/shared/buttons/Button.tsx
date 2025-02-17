import styled from 'styled-components';
import {MouseEventHandler} from "react";

interface Props {
    children?: JSX.Element|JSX.Element[]|string;
    name : string,
    onClick : MouseEventHandler
}

const StyledButton = styled.button`
      display: block;
      padding: 6px 4px;	  
      color: #fff;	  
      font-size: 11px;	  
      border-radius: 3px;	  
      background-color: crimson;	  
      border: 0;
    `;
function Button(props : Props) {
    return (
        <div>
            <StyledButton name={props.name} onClick={props.onClick}>
                {props.children}
            </StyledButton>
        </div>
    )
}

export default Button




