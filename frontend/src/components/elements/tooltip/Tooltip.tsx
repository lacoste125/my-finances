import {PlacesType, Tooltip as ReactTooltip} from "react-tooltip";
import * as React from "react";
import styles from "./Tooltip.module.css"

export const Tooltip: React.FC<{
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
    delay,
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