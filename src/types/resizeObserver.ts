/**
 * The ResizeObserver interface is used to observe changes to Element's content
 * rect.
 *
 * It is modeled after MutationObserver and IntersectionObserver.
 */
export interface ResizeObserver {
	new (callback: ResizeObserverCallback): ResizeObserver;

	/**
	 * Adds target to the list of observed elements.
	 */
	observe: (target: Element) => void;

	/**
	 * Removes target from the list of observed elements.
	 */
	unobserve: (target: Element) => void;

	/**
	 * Clears both the observationTargets and activeTargets lists.
	 */
	disconnect: () => void;
}

/**
 * This callback delivers ResizeObserver's notifications. It is invoked by a
 * broadcast active observations algorithm.
 */
export interface ResizeObserverCallback {
	(entries: ResizeObserverEntry[], observer: ResizeObserver): void;
}

export interface ResizeObserverEntry {
	/**
	 * @param target The Element whose size has changed.
	 */
	new (target: Element): ResizeObserverEntry;

	/**
	 * The Element whose size has changed.
	 */
	readonly target: Element;

	/**
	 * Element's content rect when ResizeObserverCallback is invoked.
	 */
	readonly contentRect: DOMRectReadOnly;
}
