import styled from 'styled-components';
import oc from 'open-color';
import SignoutButton from "@/components/shared/buttons/SignoutButton";

const StyledHeader = styled.div`
    display: flex;
    padding-top: 60px; /* 헤더 높이 */
    width:100%;
`;

const StyledHeaderContent = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  top: 0px;
  z-index: 5;

  /* 색상 */
  background: ${oc.indigo[6]};
  color: white;
  border-bottom: 1px solid ${oc.indigo[7]};
  box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.20);

  /* 폰트 */
  font-size: 2.5rem;
`;

export default function Header() {
    return (
        <StyledHeader>
            <StyledHeaderContent>
                menu
                <SignoutButton/>
            </StyledHeaderContent>
        </StyledHeader>
    );
}

