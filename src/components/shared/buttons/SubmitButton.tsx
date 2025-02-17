import styled from 'styled-components';
import React, {MouseEventHandler} from "react";

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
      &:hover {
        transform: scale(1.1);
      }
      &:active {
        transform: scale(1);
      }
      &:focus {
        box-shadow: 0px 0px 0px 3px rgba(0, 0, 0, 0.1);
      }  
`;
function SubmitButton({children, name, onClick} : Props) {
    return (
        <div>
            <StyledButton name={name} onClick={onClick} type="submit">
                {children}
            </StyledButton>
        </div>
    )
}

export default SubmitButton




