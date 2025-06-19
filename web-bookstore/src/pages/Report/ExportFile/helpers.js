import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
const orderDataByHeaders = (data, columns) => {
    if (!columns?.length)
        return data;
    return data.map((row) => {
        const orderedRow = {};
        columns
            .filter((col) => col.accessorKey && col.header && col.accessorKey !== 'mrt-row-actions' && col.accessorKey !== 'mrt-row-select')
            .forEach((column) => {
            if (column.header && column.accessorKey) {
                orderedRow[column.header] = row[column.accessorKey];
            }
        });
        return orderedRow;
    });
};
const getHeadersAndData = (data, columns) => {
    const headers = columns
        ?.filter((col) => col.accessorKey && col.header && col.accessorKey !== 'mrt-row-actions' && col.accessorKey !== 'mrt-row-select')
        .map((col) => col.header) || [];
    const orderedData = orderDataByHeaders(data, columns);
    return {
        headers,
        rows: orderedData.map((row) => headers.map((header) => row[header]))
    };
};
export const exportToPDF = (data, filename, columns) => {
    try {
        const { headers, rows } = getHeadersAndData(data, columns);
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(filename, 14, 15);
        doc.autoTable({
            head: [headers],
            body: rows,
            startY: 25,
            styles: {
                fontSize: 8,
                cellPadding: 2,
                overflow: 'linebreak'
            },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontStyle: 'bold',
                align: 'center'
            },
            columnStyles: {
                0: { cellWidth: 20 },
                description: { cellWidth: 'auto' }
            },
            margin: { top: 25 }
        });
        doc.save(`${filename}.pdf`);
    }
    catch (error) {
        console.error('Error exporting to PDF:', error);
        throw new Error('Failed to export PDF file');
    }
};
export const exportToExcel = (data, filename, columns) => {
    try {
        const orderedData = orderDataByHeaders(data, columns);
        const ws = XLSX.utils.json_to_sheet(orderedData, {
            header: columns
                ?.filter((col) => col.accessorKey &&
                col.header &&
                col.accessorKey !== 'mrt-row-actions' &&
                col.accessorKey !== 'mrt-row-select')
                .map((col) => col.header)
        });
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${filename}.xlsx`);
    }
    catch (error) {
        console.error('Error exporting to Excel:', error);
        throw new Error('Failed to export Excel file');
    }
};
export const getExportMenuItems = (data, filename, columns, selectedRows) => {
    const dataToExport = selectedRows?.length ? selectedRows : data;
    return [
        {
            key: '1',
            label: 'Export to Excel',
            onClick: () => exportToExcel(dataToExport, filename, columns)
        },
        {
            key: '2',
            label: 'Export to PDF',
            onClick: () => exportToPDF(dataToExport, filename, columns)
        }
    ];
};
