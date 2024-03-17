type PaginationPrefrences = {
    skip: number,
    take: number,
    cursor: {
        id: string,
    } | undefined,
}

export default PaginationPrefrences;