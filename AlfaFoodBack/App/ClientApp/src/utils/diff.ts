export let days = [
    "Пн",
    "Вт",
    "Ср",
    "Чт",
    "Пт",
    "Сб",
    "Вс",
]



export const getISOHoursMinutsTime = (time : string) => {
    let date = new Date()
    date.setHours(Number(time.slice(0,2)));
    date.setMinutes(Number(time.slice(3,5)));
    return date instanceof Date ? date.toISOString() : null
}
