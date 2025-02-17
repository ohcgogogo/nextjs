import styled, {ThemeContext} from "styled-components";
import Wrap from "src/components/layout/Wrap";
import Header from "src/components/layout/Header";
import Container from "src/components/layout/Container";
import SideBar from "src/components/layout/SideBar";
import Content from "src/components/layout/Content";
import Footer from "src/components/layout/Footer";
import React, {useContext} from "react";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";


interface Props {
    children?: JSX.Element|JSX.Element[];
}

const StyledSpaLayout = styled.div`
  background : ${({ theme }) => theme.main.background};
  color: ${({ theme }) => theme.main.color};
`;

// Dynamic Import를 사용한 CSR 구현
// AuthGuard에 불러온 컴포넌트는 서버단에서 Pre-Rendering 하지 않고 클라이언트에서 렌더링 시키겠다는 의미.
const AuthGuard = dynamic<{readonly children?: JSX.Element|JSX.Element[], readonly customText: React.ReactNode}>(() =>
    import('@/components/features/AuthGuard').then(mod => mod.AuthGuard),
)

export default function MainLayout({children} : Props) {
    const router = useRouter();

    return (
        <AuthGuard customText={
            <p>
                <span onClick={() => router.push('/signin')}>Go To Login</span>
            </p>
        }>
            <StyledSpaLayout>
                <Wrap>
                    <Header/>
                    <Container>
                        <SideBar/>
                        <Content>
                            {children}
                        </Content>
                    </Container>
                    <Footer/>
                </Wrap>
            </StyledSpaLayout>
        </AuthGuard>
    );
}