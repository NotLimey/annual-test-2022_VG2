
import { InvoicePDFData, TInvoice } from '../../types/Limeyfy';
// @ts-ignore
import InvoicePDF from './InvoicePDF';

const RenderInvoicePDF = (props: InvoicePDFData) => <InvoicePDF {...props} />;

export default RenderInvoicePDF;