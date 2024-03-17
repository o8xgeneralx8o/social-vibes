import PaginationPreferences from '@/types/paginationPreferences-type';

const paginationPrefrences = (cursorId: string, take: number = 20): PaginationPreferences => {
    return {
        skip: 1,
        take,
        cursor: cursorId ? {
            id: cursorId,
        } : undefined,
    }
}

export default paginationPrefrences;