import dayjs from 'dayjs';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmpty = (value) => value instanceof Date
    ? !dayjs(value).isValid()
    : !value ||
        value === undefined ||
        value === null ||
        Number.isNaN(value) ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value === '') ||
        (Array.isArray(value) && value.length === 0);
