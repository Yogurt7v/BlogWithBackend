import styled from "styled-components"
import Button from "../button/button";
import { useSelector } from "react-redux";
import {selectModalIsOpen, selectModalText, selectModalOnConform, selectModalOnCancel} from "../../selectors"


const ModalContainer = ({className}) => {

    const isOpen = useSelector(selectModalIsOpen)
    const text = useSelector(selectModalText)
    const onConform = useSelector(selectModalOnConform)
    const onCancel = useSelector(selectModalOnCancel)

    if (!isOpen) {
        return null
    }

    return (
        <div className={className}>
            <div className="overlay"></div>
            <div className="box">
                <h3>{text}</h3>
                <div className="buttons">
                    <Button width={"100px"} onClick={onConform}>Ок</Button>
                    <Button width={"100px"} onClick={onCancel}>Отмена</Button>
                </div>
            </div>
        </div>
    )
}


export const Modal = styled(ModalContainer)`
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    & .overlay{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
    }

    & .box{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        padding: 0 20px 20px 20px;
        background-color: #fff;
        border-radius: 10px;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        z-index: 30;
    }

    & .buttons{
        display: flex;
        justify-content: center;
        gap: 30px;
    }


`;
