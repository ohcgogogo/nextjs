import styled from 'styled-components';

interface Props {
    children?: JSX.Element|JSX.Element[];
}

const StyledContainer = styled.div`
    display : flex;
    flex-grow: 1;
    width:100%;
`;

export default function Container({children} : Props) {
    return (
        <StyledContainer>
            {children}
        </StyledContainer>
    );
}