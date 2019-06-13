import { AxiosError } from "axios";

export function formatErrorMessage(error?: AxiosError | Error): string {
	let errorMessage: string = "An unknown error occured.";

	if (error && "response" in error && error.response) {
		errorMessage = error.response.data.details;

		// nonFieldErrors: indicates errors that aren't specific to
		// a field. Strip this before displaying the error message
		errorMessage = errorMessage.replace("nonFieldErrors: ", "");
	}
	return errorMessage;
}
