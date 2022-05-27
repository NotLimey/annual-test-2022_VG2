
import { TInvoice } from '../../types/Limeyfy';
// @ts-ignore
import InvoicePDF from './InvoicePDF';

const RenderInvoicePDF = (props: TInvoice) => <InvoicePDF {...props} />;

export default RenderInvoicePDF;