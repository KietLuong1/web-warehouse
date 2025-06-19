import { jsx as _jsx } from "react/jsx-runtime";
// import configs from '@app-config'
import { createTheme } from '@mui/material';
import { COLOR_CODE } from './color';
import { common } from './common';
import EmptyTable from '../components/EmptyTable';
/**
 *
 * define re-useable default table options for all tables in your app
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDefaultMRTOptions = (data) => ({
    enableGlobalFilter: false,
    enableFullScreenToggle: false,
    enableColumnFilters: false,
    enableColumnActions: false,
    enableColumnOrdering: true,
    positionActionsColumn: 'last',
    localization: { actions: '', rowsPerPage: 'Items per page' },
    manualFiltering: true,
    manualSorting: false,
    manualPagination: true,
    autoResetPageIndex: false,
    autoResetAll: false,
    paginationDisplayMode: 'pages',
    muiPaginationProps: {
        color: 'primary',
        shape: 'rounded',
        variant: 'outlined',
        size: 'small',
        rowsPerPageOptions: data.length ? common.ROWS_PER_PAGE_OPTION : [],
        showRowsPerPage: data.length > 0,
        className: 'table__bottom'
    },
    renderEmptyRowsFallback: () => {
        return _jsx(EmptyTable, {});
    }
});
export const getMRTTableTheme = () => createTheme({
    primary: {
        main: COLOR_CODE.PRIMARY,
        dark: COLOR_CODE.PRIMARY_DARK,
        light: COLOR_CODE.PRIMARY_LIGHT
    },
    secondary: {
        main: COLOR_CODE.SECONDARY
    },
    typography: {
        fontFamily: ['Poppins', 'sans-serif'].join(',')
    },
    shape: {
        borderRadius: 8
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                elevation4: {
                    boxShadow: 'none'
                }
            }
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    border: 'none'
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: '8px 16px'
                },
                body: {
                    fontSize: 14,
                    '&.MuiTableCell-root': {
                        padding: '8px 16px'
                    }
                },
                head: {
                    '&.MuiTableCell-root': {
                        backgroundColor: COLOR_CODE.GREY_200,
                        color: COLOR_CODE.GREY_800,
                        fontWeight: 'bold',
                        padding: '12px 16px'
                    },
                    '&.MuiTableCell-root span button': {
                        color: COLOR_CODE.GREY_800,
                        fontWeight: 'bold'
                    },
                    '&.MuiTableCell-root span button div, &.MuiTableCell-root span button div span svg': {
                        color: `${COLOR_CODE.GREY_800} !important`,
                        fontWeight: 'bold'
                    },
                    button: {
                        fontSize: 14
                    },
                    div: {
                        fontSize: 14
                    }
                },
                footer: {
                    '&.MuiTableCell-root': {
                        border: 'none',
                        padding: '6px 0'
                    }
                }
            }
        },
        MUIDataTableBodyRow: {
            styleOverrides: {
                root: {
                    backgroundColor: 'white'
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    border: '1px solid #808280',
                    marginLeft: '8px',
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: '14px',
                    color: '#808280',
                    borderRadius: '16px !important',
                    '&:hover': {
                        backgroundColor: '#DFEDF7'
                    }
                },
                deleteIcon: {
                    color: '#B3CFE5'
                }
            }
        },
        MUIDataTableFilterList: {
            styleOverrides: {
                root: {
                    margin: '0px !important',
                    marginBottom: '16px !important'
                }
            }
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    padding: '0 0px !important'
                }
            }
        },
        MUIDataTableToolbar: {
            styleOverrides: {
                filterPaper: {
                    minHeight: '344px !important'
                }
            }
        },
        MUIDataTableBodyCell: {
            styleOverrides: {
                root: {
                    span: {
                        wordBreak: 'break-word'
                    }
                }
            }
        },
        MUIDataTableHeadCell: {
            styleOverrides: {
                data: {
                    textAlign: 'left'
                }
            }
        }
    }
});
