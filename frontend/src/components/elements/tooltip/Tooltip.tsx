import {PlacesType, Tooltip as ReactTooltip} from "react-tooltip";
import * as React from "react";

type Props = {
    id: string,
    text: string,
    place: PlacesType,
    element: JSX.Element,
    noArrow?: boolean,
    offset?: number,
    delay?: number
}

export const Tooltip:React.FC<Props> = ({
    id,
    text,
    place,
    element,
    noArrow,
    offset,
    delay
}: Props) => {
    return (
        <>
            <a
                data-tooltip-id={id}
                data-tooltip-content={text}
                data-tooltip-place={place}
                data-tooltip-offset={offset}
            >
                {element}
            </a>
            <ReactTooltip
                id={id}
                className={"own_tooltip"}
                noArrow={noArrow}
                delayShow={delay}
            />
        </>
    );
};