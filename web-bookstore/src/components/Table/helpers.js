import { isEmpty } from 'lodash';
export var TableQueryParams;
(function (TableQueryParams) {
    TableQueryParams["SEARCH"] = "keywords";
    TableQueryParams["ROWS_PER_PAGE"] = "rowsPerPage";
    TableQueryParams["PAGE"] = "page";
    TableQueryParams["SORT"] = "sort";
    TableQueryParams["FILTER"] = "filter";
})(TableQueryParams || (TableQueryParams = {}));
export const getAdditionalParams = (filterList, query) => {
    if (isEmpty(filterList))
        return {};
    return filterList.reduce((state, key) => {
        const value = query.getAll(key);
        if (value) {
            return {
                ...state,
                [key]: value?.filter((item) => !!item)
            };
        }
        return state;
    }, {});
};
