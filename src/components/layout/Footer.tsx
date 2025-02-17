import styled from 'styled-components';
import oc from "open-color";

const StyledFooter = styled.div`
  display: flex;
`;

const StyledFooterContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 100%;
    z-index: 5;

    /* 색상 */
    background: ${oc.indigo[6]};
    color: white;
    border-bottom: 1px solid ${oc.indigo[7]};
    box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.20);

    /* 폰트 */
    font-size: 2.5rem;
`;

function Footer() {
    return (
        <StyledFooter>
            <StyledFooterContent>
                Copylight...
            </StyledFooterContent>
        </StyledFooter>
    );
}

export default Footer;