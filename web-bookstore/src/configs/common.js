const table = {
    ROWS_PER_PAGE_OPTION: [5, 10, 20, 30, 50],
    ROWS_PER_PAGE: 10
};
const commonConfigs = {
    CONNECTION_TIMEOUT: 300000
};
export const common = { ...table, ...commonConfigs };
