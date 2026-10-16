import { useLayoutEffect, useState, type RefObject } from "react";

export const FALLBACK_NAV_HEIGHT = 80;

const MEASURE_DELAY_MS = 300;

const BAR_MAX_HEIGHT_RATIO = 0.4;

export interface NavMetrics {
  height: number;
  floating: boolean;
}

/**
 * A child looks like a floating navigation bar when it is taken out of
 * normal flow (fixed/absolute) and has a non-zero height that is still a
 * small fraction of the viewport, which rules out full-screen overlays.
 */
export const isFixedBar = (element: Element): boolean => {
  const position = getComputedStyle(element).position;

  const rect = element.getBoundingClientRect();

  return (
    (position === "fixed" || position === "absolute") &&
    rect.height > 0 &&
    rect.height < window.innerHeight * BAR_MAX_HEIGHT_RATIO
  );
};

/**
 * Largest bottom edge among the wrapper's bar-like children, or 0 when the
 * wrapper holds no such element.
 */
export const getFloatingBarBottom = (wrapper: Element): number =>
  Array.from(wrapper.children).reduce(
    (bottom, element) =>
      isFixedBar(element)
        ? Math.max(bottom, element.getBoundingClientRect().bottom)
        : bottom,
    0,
  );

/**
 * Measures the rendered height of a navbar wrapper so that layouts can
 * reserve space for a floating/fixed header.
 *
 * The wrapper's own offsetHeight is preferred; if it collapses to zero
 * (e.g. all children are absolutely/fixed positioned) we fall back to
 * scanning the children for a bar-like element and use its bottom edge.
 */
export const useNavHeight = (
  navRef: RefObject<HTMLElement | null>,
): NavMetrics => {
  const [nav, setNav] = useState<NavMetrics>({
    height: FALLBACK_NAV_HEIGHT,
    floating: false,
  });

  useLayoutEffect(() => {
    const wrapper = navRef.current;

    if (!wrapper) return;

    let active = true;

    // Escape hatch for the deferred timeout and resize listeners: state updates
    // must never land after unmount or on a node that has left the DOM.
    const isMounted = () => active && wrapper.isConnected;

    const measure = () => {
      if (!isMounted()) return;

      if (wrapper.offsetHeight > 0) {
        if (!isMounted()) return;

        setNav({
          height: Math.round(wrapper.offsetHeight),
          floating: false,
        });

        return;
      }

      const bar = getFloatingBarBottom(wrapper);

      if (!isMounted()) return;

      setNav({
        height: Math.round(bar) || FALLBACK_NAV_HEIGHT,
        floating: true,
      });
    };

    measure();

    const timeout = window.setTimeout(measure, MEASURE_DELAY_MS);

    window.addEventListener("resize", measure);

    return () => {
      active = false;
      window.clearTimeout(timeout);
      window.removeEventListener("resize", measure);
    };
  }, [navRef]);

  return nav;
};
