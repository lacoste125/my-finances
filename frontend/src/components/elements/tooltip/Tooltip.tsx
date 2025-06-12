import * as React from "react";

import {PlacesType, Tooltip as ReactTooltip} from "react-tooltip";

type Props = {
    id: string,
    text: string,
    place: PlacesType,
    element: JSX.Element,
    noArrow?: boolean,
    offset?: number,
    delay?: number
}

export const Tooltip = (props: Props) => {
    return (
        <>
            <a
                data-tooltip-id={props.id}
                data-tooltip-content={props.text}
                data-tooltip-place={props.place}
                data-tooltip-offset={props.offset}
            >
                {props.element}
            </a>
            <ReactTooltip
                id={props.id}
                className={"own_tooltip"}
                noArrow={props.noArrow}
                delayShow={props.delay}
            />
        </>
    );
};