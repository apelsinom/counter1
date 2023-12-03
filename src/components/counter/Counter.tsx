import React from 'react';

type PropsType = {
    counter: number
    anyClass:string
}
export const Counter = (props:PropsType) => {

    return (
            <p className={props.anyClass}>{props.counter}</p>
    );
};

