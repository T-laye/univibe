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
