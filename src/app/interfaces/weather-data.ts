export interface WeatherData {
    DailyForecasts: DailyForcast[]
Headline: any
createdAt: number | Date
isFav?: boolean
key?: string
name?: string
}
export interface DailyForcast {
    Date: string | Date
    Day: any
    EpochDate: number
    Link: string
    MobileLink: string
    Night: any
    Sources: any
    Temperature: any
}
