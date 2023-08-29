export function getVerseReference(verseId) {
	const oldString = verseId;

	const strCut = oldString.slice(5);

	const index = strCut.indexOf('.');

	const final = strCut.slice(index + 1);

	return final;
}

export const showPreview = (event, elementId) => {
	const target = event.target;
	const files = target.files;
	console.log(files);
	if (files.length > 0) {
		const src = URL.createObjectURL(files[0]);
		const preview = document.getElementById(elementId);
		preview.src = src;
	}
};
