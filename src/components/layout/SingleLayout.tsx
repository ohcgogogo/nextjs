import styled, {ThemeContext} from "styled-components";
import Wrap from "src/components/layout/Wrap";
import Container from "src/components/layout/Container";
import Content from "src/components/layout/Content";
import Footer from "src/components/layout/Footer";

interface Props {
    children?: JSX.Element|JSX.Element[];
}

const StyledSpaLayout = styled.div`
  background : ${({ theme }) => theme.main.background};
  color: ${({ theme }) => theme.main.color};
`;

export default function SingleLayout({children} : Props) {
    return (
        <StyledSpaLayout>
            <Wrap>
                <Container>
                    <Content>
                        {children}
                    </Content>
                </Container>
                <Footer/>
            </Wrap>
        </StyledSpaLayout>
    );
}