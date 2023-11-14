export interface PagedAPIResponse<T> {
    currentPage: number;
    totalPages: number;
    data: T[];
}
