import {PlacesType, Tooltip as ReactTooltip} from "react-tooltip";
import * as React from "react";
import styles from "./TooltipProvider.module.css"

export const TooltipProvider: React.FC<{
    id: string;
    text: string;
    place: PlacesType;
    noArrow?: boolean;
    offset?: number;
    delay?: number;
    children: React.ReactNode;
}> = ({
    id,
    text,
    place,
    noArrow,
    offset,
    delay = 1000,
    children,
}) => {
    return (
        <React.Fragment>
            <a
                data-tooltip-id={id}
                data-tooltip-content={text}
                data-tooltip-place={place}
                data-tooltip-offset={offset}
            >
                {children}
            </a>
            <ReactTooltip
                id={id}
                className={styles.own_tooltip}
                noArrow={noArrow}
                delayShow={delay}
            />
        </React.Fragment>
    );
};