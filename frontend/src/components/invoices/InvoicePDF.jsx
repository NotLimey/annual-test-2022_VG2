
import pdf from '@react-pdf/renderer';
const { Page, PDFViewer, StyleSheet, Text, Document, View } = pdf;

const styles = StyleSheet.create({
    page: { backgroundColor: '#f1f1f1', fontFamily: 'Helvetica' },
    section: { color: '#212121', margin: 30 },
    header: { fontSize: '25px', marginBottom: "20px", fontWeight: 'bold' },
    alignRight: { textAlign: 'right' },
    defaultBorderBottom: { borderBottomColor: '#000', borderBottomWidth: 2 },
    AddPaddingBottom: { paddingBottom: 40, },
    AddPaddingTop: { paddingTop: "20px" },
    marginLeftRight: { margin: "0 30px" },
    flexbox: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', fontSize: 12, fontWeight: 'bold', fontFamily: 'Helvetica', gap: "5px" },
    bottomSection: { margin: "0 30px" },
    smallText: { fontSize: 11, fontWeight: 'bold' },
});

const InvoicePDF = (invoice) => {
    return <>
        {invoice && <PDFViewer style={{ width: "1200px", maxWidth: "100%", height: "100%", maxHeight: "100%", marginTop: "40px" }}>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={styles.header}>Limeyfy Myhre</Text>
                    </View>
                    <View style={[styles.flexbox, styles.AddPaddingBottom, styles.marginLeftRight]}>
                        <View>
                            <Text>{invoice.company.name}</Text>
                            <Text>{invoice.company.streetAddress}</Text>
                            <Text>{`${invoice.company.zipCode} ${invoice.company.city}`}</Text>
                        </View>
                        <View style={styles.alignRight}>
                            <Text>Faktura {invoice.invoiceNumber} / 2021</Text>
                            <Text>Orgnr: {`${invoice.organizationId.toString().slice(0, 3)} ${invoice.organizationId.toString().slice(3, 6)} ${invoice.organizationId.toString().slice(6, 9)}`}</Text>
                            <Text>Bankkonto: {`${invoice.bankAccount.toString().slice(0, 4)} ${invoice.bankAccount.toString().slice(4, 6)} ${invoice.bankAccount.toString().slice(6, 11)}`}</Text>
                        </View>
                    </View>

                    <View style={[styles.flexbox, styles.AddPaddingTop, styles.marginLeftRight, styles.smallText, { borderBottom: "1px solid #000", paddingBottom: "5px" }]}>
                        <Text style={{ width: "50%", textAlign: "left" }}>Oppgave</Text>
                        <Text style={{ width: "14%", textAlign: "right" }}>Timer</Text>
                        <Text style={{ width: "14%", textAlign: "right" }}>Timepris</Text>
                        <Text style={{ width: "22%", textAlign: "right" }}>Pris i NOK</Text>
                    </View>
                    {invoice.invoiceLines.map((line, idx) => (
                        <View key={idx} style={[styles.flexbox, styles.AddPaddingTop, styles.marginLeftRight]}>
                            <Text style={{ width: "50%", textAlign: "left" }}>{line.description}</Text>
                            <Text style={{ width: "14%", textAlign: "right" }}>{line.hours}</Text>
                            <Text style={{ width: "14%", textAlign: "right" }}>{line.rate},-</Text>
                            <Text style={{ width: "22%", textAlign: "right" }}>Kr {line.price},- </Text>
                        </View>
                    )
                    )}
                    <View style={[styles.bottomSection, { paddingTop: 70 }]}>
                        {invoice.useMva && (
                            <>
                                <View style={[styles.flexbox, styles.smallText]}>
                                    <Text>Del sum</Text>
                                    <Text style={{ fontFamily: 'Helvetica' }}>Kr {invoice.amount},- </Text>
                                </View>
                                <View style={[styles.flexbox, { paddingTop: 10 }, styles.smallText]}>
                                    <Text>Mva</Text>
                                    <Text style={{ fontFamily: 'Helvetica' }}>Kr {invoice.mva},- </Text>
                                </View>
                            </>
                        )}
                        <View style={[styles.flexbox, { paddingTop: 10 }, styles.smallText]}>
                            <Text>Totalt</Text>
                            <Text style={{ fontFamily: 'Helvetica' }}>Kr {invoice.total},- </Text>
                        </View>
                        {!invoice.useMva && <Text style={{ fontSize: 11, paddingTop: 30 }}>Jeg er ikke registrert for merverdiavgift</Text>}
                        <Text style={{ fontSize: 11, paddingTop: 10 }}>Forfalls dato: {new Date(`${invoice.dueDate}`).toLocaleDateString()}</Text>
                    </View>
                </Page>
            </Document>
        </PDFViewer>}
    </>
}

export default InvoicePDF;