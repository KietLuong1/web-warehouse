import { AccountKey } from '../../../queries/Account';
import yup from '../../../../yupGlobal';
// Initial form values
export const AccountInitValues = {
    [AccountKey.NAME]: '',
    [AccountKey.USERNAME]: '',
    [AccountKey.EMAIL]: '',
    [AccountKey.ROLE]: 'STAFF',
    [AccountKey.PASSWORD]: ''
};
export const AccountValidationSchema = yup.object().shape({
    [AccountKey.NAME]: yup
        .string()
        .required('Name is required')
        .matches(/^[a-zA-Z\s.\-']+$/, "Name must contain only letters, spaces, and characters like .-'"),
    [AccountKey.USERNAME]: yup.string().required('Username is required'),
    // .matches(/^[a-zA-Z0-9_]*$/, 'Username must be alphanumeric and can contain underscores only'),
    [AccountKey.EMAIL]: yup.string().required('Email is required').email('Invalid email address'),
    [AccountKey.ROLE]: yup
        .string()
        .oneOf(['ADMIN', 'MANAGER', 'STAFF'], 'Role must be ADMIN, MANAGER, or STAFF')
        .required('Role is required'),
    [AccountKey.PASSWORD]: yup
        .string()
        // password is required when creating (isEdit=false), optional when editing
        .when('$isEdit', {
        is: true,
        then: (schema) => schema.notRequired(),
        otherwise: (schema) => schema.required('Password is required').min(6, 'Password must be at least 6 characters')
    })
});
