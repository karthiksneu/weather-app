export function convertKelvinToCelcius(temp : number) : number {
    const tempInCelcius = temp - 273.15;
    return Math.floor(tempInCelcius);
}