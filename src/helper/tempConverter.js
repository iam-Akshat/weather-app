const cToF = (tempInC) => `${((tempInC * (9 / 5)) + 32).toPrecision(4)} °F`;
const fToC = (tempInF) => `${((tempInF - 32) * (5 / 9)).toPrecision(4)} °C`;

export { cToF, fToC };