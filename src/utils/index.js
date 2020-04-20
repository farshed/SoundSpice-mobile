export function getRandomNumber(min, max) {
	let random = Math.round(Math.random() * (max - min) + min);
	// to make sure max is not inclusive
	return random >= max ? random - 1 : random;
}
