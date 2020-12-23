import React, {useState, useRef, useEffect} from 'react';

import {classNames} from '../../utilities/css';

import styles from './Collapsible.scss';

interface Transition {
  /** Assign a transition duration to the collapsible animation. */
  duration?: string;
  /** Assign a transition timing function to the collapsible animation */
  timingFunction?: string;
}

export interface CollapsibleProps {
  /** Assign a unique ID to the collapsible. For accessibility, pass this ID as the value of the triggering component’s aria-controls prop. */
  id: string;
  /** Option to show collapsible content when printing */
  expandOnPrint?: boolean;
  /** Toggle whether the collapsible is expanded or not. */
  open: boolean;
  /** Assign transition properties to the collapsible */
  transition?: Transition;
  /** The content to display inside the collapsible. */
  children?: React.ReactNode;
}

export function Collapsible({
  id,
  expandOnPrint,
  open,
  transition,
  children,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(open);
  const [height, setHeight] = useState(0);
  const collapisbleContainer = useRef<HTMLDivElement>(null);

  const isClosing = !open;
  const isPartiallyOpen = open || isOpen;
  const isFullyClosed = !open && !isOpen;
  const isFullyOpen = open && isOpen;

  const wrapperClassName = classNames(
    styles.Collapsible,
    expandOnPrint && styles.expandOnPrint,
    (isPartiallyOpen || isFullyOpen) && styles.open,
  );

  const collapsibleStyles = {
    ...(transition && {
      transitionDuration: `${transition.duration}`,
      transitionTimingFunction: `${transition.timingFunction}`,
    }),
    ...(isFullyOpen && {
      height: 'auto',
      overflow: 'visible',
    }),
    ...(isPartiallyOpen &&
      !isFullyOpen && {
        height: `${height}px`,
        overflow: 'hidden',
      }),
  };

  const handleCompleteAnimation = () => {
    setIsOpen(open);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!collapisbleContainer.current) return;

      setHeight(isClosing ? 0 : collapisbleContainer.current.scrollHeight);
    });
  }, [isClosing, isOpen, open]);

  return (
    <div
      id={id}
      style={collapsibleStyles}
      className={wrapperClassName}
      onTransitionEnd={() => handleCompleteAnimation()}
      ref={collapisbleContainer}
      aria-hidden={isFullyClosed}
    >
      {children}
    </div>
  );
}
