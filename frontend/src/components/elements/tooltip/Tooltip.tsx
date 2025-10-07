import {PlacesType, Tooltip as ReactTooltip} from "react-tooltip";
import * as React from "react";

export const Tooltip: React.FC<{
    id: string;
    text: string;
    place: PlacesType;
    element: JSX.Element;
    noArrow?: boolean;
    offset?: number;
    delay?: number;
}> = ({
    id,
    text,
    place,
    element,
    noArrow,
    offset,
    delay,
}) => {
    return (
        <React.Fragment>
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
        </React.Fragment>
    );
};