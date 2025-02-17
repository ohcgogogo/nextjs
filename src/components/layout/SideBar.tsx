import styled from 'styled-components';
import { useRouter } from 'next/router'
import Button from "src/components/shared/buttons/Button";
import LanguageSwitchButton from "src/components/shared/buttons/LanguageSwitchButton";
import NavLink from "src/components/shared/links/NavLink";
import Link from 'next/link';
import { useTranslation } from 'next-i18next'

const StyledSideBar = styled.div`
    display : flex;
    min-width : 280px;
    width : 20%;
`;

const StyledSideBarContent = styled.div`
    display: flex;
    background : papayawhip;
    width:100%;
`;

function SideBar() {
    const router = useRouter();
    const { t } = useTranslation('common');

    const handleGoBack = () => {
        router.back();
    }
    const handleGoHome = () => {
        router.push("/").then(r => {});
    }
    return (
        <StyledSideBar>
            <StyledSideBarContent>
                <ul>
                    <li>
                        <Button name="back" onClick={handleGoBack}>뒤로</Button>
                        <Button name="go" onClick={handleGoHome}>홈으로</Button>
                        <LanguageSwitchButton/>
                    </li>
                    <li>
                        <NavLink href="/help/about">소개 {t('Hello')}</NavLink>
                    </li>
                    <li>
                        <Link href="/member/profile?username=velopert">velopert 프로필 {t('Hello')}</Link>
                    </li>
                    <li>
                        <Link href="/member/profile?username=gildong">gildong 프로필</Link>
                    </li>
                    <li>
                        <Link href="/axios/axiostest">Axios Test</Link>
                    </li>
                </ul>
            </StyledSideBarContent>
        </StyledSideBar>
    );
}

export default SideBar;