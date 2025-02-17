import React, {MouseEventHandler} from 'react';
import styled from 'styled-components';
import { hideVisually } from 'polished';

interface Props {
    children?: JSX.Element|JSX.Element[];
    title : string;
    cancelButton : string;
    confirmButton : string;
    visible : boolean;
    onConfirm : MouseEventHandler;
    onCancel : MouseEventHandler;
}

LayerPopup.defaultProps = {
    title: '안녕하세요',
    children: 'Lorem Ipsum Dolor Sit Amet?',
    cancelButton: '취소',
    confirmButton: '확인'
};

const Popup = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Dim = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index:10000;
`;

const PopupContents = styled.div`
    position: relative;
    width: 30rem;
    background-color: #fff;
    padding: 3.6rem;
    border-radius: 0.3rem;
    strong {
      display: block;
      font-size: 3rem;
      margin-bottom: 1.6rem;
    }
    p {
      line-height: 160%;
      font-size: 1.6rem;
    }
    .buttonGroup {
      display: flex;
      justify-content: space-between;
      margin-top: 3rem;
    }
    z-index:10001;
`;

const PopupCloseBtn = styled.button`
    position: absolute;
    top: 2.4rem;
    right: 2.4rem;
    width: 1.8rem;
    height: 1.8rem;
    border: 0;
    span {
      ${hideVisually()};
    }
    path {
      stroke: #666;
    }
    &:hover path {
      stroke: #000;
    }	  
`;
function LayerPopup({ visible, onConfirm, onCancel, title, children, cancelButton, confirmButton } : Props) {
    if (!visible) return null;
    return (
        <Popup>
            <PopupContents>
                <strong>{title}</strong>
                <p>{children}</p>
                <div className="buttonGroup">
                    <button onClick={onCancel}>{cancelButton}</button>
                    <button onClick={onConfirm}>{confirmButton}</button>
                </div>
                <PopupCloseBtn>팝업 닫기</PopupCloseBtn>
            </PopupContents>
            <Dim/>
        </Popup>
    );
}

export default LayerPopup;