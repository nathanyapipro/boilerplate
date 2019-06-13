import { Actions } from "../states";

export interface ReduxMessageEvent extends MessageEvent {
	data: Actions;
}

export interface ReduxBroadcastChannel extends BroadcastChannel {
	postMessage: (message: Actions) => void;
	onmessage:
		| ((this: ReduxBroadcastChannel, ev: ReduxMessageEvent) => any)
		| null;
}

export enum BroadcastChannelName {
	DEFAULT = "default"
}

export function createBroadcastChannel(
	name: string = BroadcastChannelName.DEFAULT
): ReduxBroadcastChannel | undefined {
	if (!window.BroadcastChannel) {
		return;
	}

	return new BroadcastChannel(name);
}
