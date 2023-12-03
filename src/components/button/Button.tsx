import React from 'react';
import styled from "styled-components";

type PropsType = {
    title:string
    onClick: ()=>void
    disabled: boolean
    anyClass:string
}
export const Button = (props:PropsType) => {
    return (
            <button className={props.anyClass} onClick={props.onClick} disabled={props.disabled}>{props.title}</button>
    );
};
const ButtonStyle = styled.div`

`
