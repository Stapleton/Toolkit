/** @format */

export default function ElementTransformer(input: any[]) {
	switch (input.length) {
		case 5 || 11:
			return [null, null, null, null, ...input];

		case 7 || 13:
			return [null, null, ...input];

		case 9:
		case 15:
		default:
			return input;
	}
}

//https://docs.google.com/spreadsheets/d/19WPv7zVyA8XqmZLR6VdMF4XepK8DL07b3dCsfpvLRIQ/edit?usp=sharing
