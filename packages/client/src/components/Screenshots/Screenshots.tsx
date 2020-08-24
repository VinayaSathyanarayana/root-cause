import * as React from "react";
import { useRef } from 'react';
import type { StepResult } from "@testim/root-cause-types";
import styles from './styles.module.css';
import { useBackgroundHighlight, ImageStretchBehavior } from "../../hooks/useBackgroundHighlight";
import classNames from "classnames";
import { useExternalResourceUrl } from "../../stores/ExternalResourceUrlContext";

export function Screenshot({ step, apiUrl, className, screenshotClassName, showHighlightRect = false, imageStretchBehavior = 'content-fit' }: {  step: StepResult, apiUrl: string, className?: string, imageStretchBehavior?: ImageStretchBehavior, screenshotClassName?: string, showHighlightRect?: boolean }) {

    const image = useRef<HTMLImageElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const getExternalResourceUrl = useExternalResourceUrl();
    const screenshotResource = getExternalResourceUrl(step.screenshot);

    const [screenshotDimensions, highlightCoordinates, imageOffset] = useBackgroundHighlight(step, image, container, imageStretchBehavior);

    //TODO(Benji) when navigating to a page without a highlight - don't show the highlight
    return <div  className={className}>
        <div ref={container} style={{...screenshotDimensions, ...getBackgroundStyle(imageOffset)}} className={classNames(styles.screenshot, screenshotClassName)} >
                    <img
                        ref={image}
                        loading='lazy'
                        alt={step?.screenshot ?? ""}
                        src={screenshotResource}
                    />
                    { highlightCoordinates && <div className={styles.screenshotHighlight} style={highlightCoordinates}></div> }
                    { showHighlightRect && <div className={styles.highlightRect} style={highlightCoordinates ? adjustHighlightToHighlightRect(highlightCoordinates): {}}></div>}
            </div></div>;
}

function getBackgroundStyle(imageOffset: { left: number; top: number } | undefined) {
    if (imageOffset === undefined) {
        return {};
    }
    return { ...imageOffset, position: 'relative' };
}

function adjustHighlightToHighlightRect({top, left, width, height }: { top: number, left: number, width: number; height: number}) {
    return {
        top: top,
        left: left,
        width: width,
        height: height,
        position: 'absolute'
    } as const;
}