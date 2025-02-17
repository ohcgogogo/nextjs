import React, {MouseEventHandler} from "react";
import styled, { css, keyframes } from 'styled-components';
import PolishedChildrenButton from "src/components/shared/buttons/PolishedChildrenButton";

interface Props {
    onClick : MouseEventHandler
}

const Title = styled.div`
        color: darkolivegreen;
        h1 {
          font-size: 30px;
          margin: 0 0 10px 0;
        }
    `;
const NoticeX = styled.div`
        padding: 20px;
        border: 2px solid #aaa;
        
        ${Title}:hover {
          color: crimson;
        }
    `;
const Button = styled.button<{bgColor? : string, special? : boolean}>`
        display: inline-block;
        padding: 6px 10px;
        color: #fff;
        font-size: 18px;
        border-radius: 3px;
        background-color: ${({bgColor}) => bgColor || 'crimson' };
        border: 0;
        &:hover {
          background-color: teal;
        }
        ${({special}) => special && css`  
          opacity: .8;
          transition: opacity .2s ease;
        `};
    `;
const animation = keyframes`
      50% {
        transform: scale(1.3);
      }
    `;
const FullButton = styled(Button)`
        width: 50%;
        border-radius: 4px;
        animation: ${animation} 1s infinite;
    `;
const ButtonGird = styled.div`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      width: 100%;
      min-width: 32rem;
      max-width: 48rem;
      margin: 4rem auto;
      column-gap: 1.4rem;
      row-gap: 1.4rem;
    `;

function Notice({onClick} : Props) {
    const bankList = [
        { name: 'type1', text: '우리은행', disabled: false, event: true, eventInfo: { name: '할인', date: '12/31' } },
        { name: 'type2', text: '국민은행', disabled: false, event: false, eventInfo: { name: '', date: '' } },
        { name: 'type3', text: '하나은행', disabled: false, event: false, eventInfo: { name: '', date: '' } },
        { name: '', text: '피씽은행', disabled: false, event: false, eventInfo: { name: '', date: '' } },
        { name: '', text: '파산은행', disabled: true, event: false, eventInfo: { name: '', date: '' } },
    ]
    return (
        <div>
            <NoticeX>
                <Title>
                    <h1>아아 공지를 읽으세요 📢</h1>
                    <h2>작성자: 아무개</h2>
                </Title>
                <Button>확인</Button>
                <Button bgColor="skyblue" special>취소</Button>
                <Button as="span">span태그입니다.</Button>
                <FullButton bgColor="pink" special>확장버튼</FullButton>
                <ButtonGird>
                    {bankList.map((bank) => {
                        return (
                            <PolishedChildrenButton name={bank.name} disabled={bank.disabled} event={bank.event} onClick={onClick}>
                                <span>{bank.text}</span>
                                {bank.event ? (
                                    <i>{bank.eventInfo.name} 이벤트 (~{bank.eventInfo.date})</i>
                                ) : <></>}
                            </PolishedChildrenButton>
                        );
                    })}
                </ButtonGird>
            </NoticeX>
        </div>
    )
}

export default Notice