export interface Pagination {
    total: number,
    current: number,
    perPage: number,
    rangeBefore: number,
    rangeAfter: number,
    order: string,
    size: string,
    isSimple: boolean,
    isRounded: boolean,
    prevIcon: "chevron-left",
    nextIcon: "chevron-right"
}