export function validateImage(file: File) {
	const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

	if (!allowedTypes.includes(file.type)) {
		throw new Error("Only JPG, JPEG, PNG allowed");
	}

	if (file.size > 5 * 1024 * 1024) {
		throw new Error("Max file size is 5MB");
	}

	return true;
}

export function formatEventParts(dateString: string) {
	const date = new Date(dateString);

	return {
		date: date.toLocaleDateString("en-US", {
			day: "numeric",
			month: "short",
			year: "numeric",
		}),
		time: date.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
		}),
	};
}