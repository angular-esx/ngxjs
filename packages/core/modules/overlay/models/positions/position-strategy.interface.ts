/**
 * Strategy for setting the position on an overlay.
 */
interface INgxPositionStrategy {
  /**
   * Updates the position of the overlay element.
   */
  apply (overlay: Element): void;
  /**
   * Cleans up any DOM modifications made by the position strategy, if necessary.
   */
  dispose (): void;
}


export { INgxPositionStrategy };
