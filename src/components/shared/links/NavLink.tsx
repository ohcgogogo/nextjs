import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import {DefaultTFuncReturn} from "i18next";

interface Props {
    // children?: JSX.Element|JSX.Element[]|string;
    children?: any;
    href : string;
}

const StyledLink = styled.span<{pathName: string, routerPathName: string}>`
  color: ${(props) => (props.pathName === props.routerPathName ? "#a37600" : "#eaaa00")};
  text-decoration: none;
  padding-top: 20px;
  font-size: 1.3rem;
  :hover {
    text-decoration: underline;
    color: #a37600;
  }
`;



export default function NavLink({ href, children, ...props } : Props) {
    const router = useRouter();
    return (
        <Link href={href} passHref>
            <StyledLink {...props} pathName={href} routerPathName={router.pathname}>
                {children}
            </StyledLink>
        </Link>
    );
}

