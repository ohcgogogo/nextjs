import styled from 'styled-components';

interface Props {
    children?: JSX.Element|JSX.Element[];
}

const StyledWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

export default function Wrap({children} : Props) {
    return (
        <StyledWrap>
            {children}
        </StyledWrap>
    );
}