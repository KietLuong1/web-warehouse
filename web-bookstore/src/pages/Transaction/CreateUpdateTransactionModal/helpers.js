import { TransactionKey } from '../../../queries';
import yup from '../../../../yupGlobal';
export const TransactionInitValues = {
    [TransactionKey.TRANSACTION_TYPE]: 'SALE',
    [TransactionKey.TOTAL_PRICE]: 0,
    [TransactionKey.TOTAL_PRODUCTS]: 0,
    [TransactionKey.STATUS]: 'PENDING',
    [TransactionKey.DESCRIPTION]: '',
    [TransactionKey.CREATED_AT]: new Date().toISOString(),
    [TransactionKey.PRODUCT]: {
        id: '',
        name: '',
        price: 0,
        description: '',
        stockQuantity: 0,
        categoryId: '',
        createdAt: '',
        expiryDate: '',
        sku: '',
        productId: '',
        supplierId: '',
        imageUrl: '',
        batchNumber: '',
        warehouseId: '',
        binLocation: ''
    }
};
export const TransactionValidationSchema = yup.object({
    [TransactionKey.TRANSACTION_TYPE]: yup.string().required('Transaction type is required'),
    [TransactionKey.TOTAL_PRICE]: yup.number().required('Total price is required').min(0, 'Total price must be positive'),
    [TransactionKey.TOTAL_PRODUCTS]: yup
        .number()
        .required('Total products is required')
        .positive('Total products must be positive')
        .integer('Total products must be a whole number'),
    [TransactionKey.STATUS]: yup.string().required('Status is required'),
    product: yup
        .object({
        name: yup.string().required('Product name is required')
    })
        .required('Product is required')
});
