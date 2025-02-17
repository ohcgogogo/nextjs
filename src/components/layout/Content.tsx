import styled from 'styled-components';

interface Props {
    children?: JSX.Element|JSX.Element[];
}

const StyledContent = styled.div`
    display : flex;
    flex-grow: 1;
    width: 80%;
`;

function Content({children} : Props) {
    return (
        <StyledContent>
            {children}
        </StyledContent>
    );
}

export default Content;