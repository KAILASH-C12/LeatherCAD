import PDFDocument from 'pdfkit';

export const generateTechPack = (design, res) => {
    const doc = new PDFDocument({ margin: 50 });

    // Stream to response
    doc.pipe(res);

    // --- Header ---
    doc.fontSize(20).text('PRODUCTION TECH PACK', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Design Ref: ${design._id}`, { align: 'right' });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: 'right' });

    doc.moveDown(2);

    // --- Product Info ---
    doc.fontSize(14).text(`Product: ${design.product.name} (${design.product.category})`);
    doc.fontSize(12).text(`Designer: ${design.user.name}`);
    doc.text(`Design Name: ${design.name}`);

    doc.moveDown(2);

    // --- Mock Image Placeholder ---
    // In real app, we would fetch the image from design.previewImageUrl (S3 url)
    // doc.image('path/to/image.png', { width: 300 });
    doc.rect(50, doc.y, 300, 200).stroke();
    doc.text('3D Preview Image', 60, doc.y + 90, { width: 280, align: 'center' });
    doc.moveDown(15);

    // --- Configuration / BOM ---
    doc.fontSize(14).text('Bill of Materials (BOM)', { underline: true });
    doc.moveDown();

    const config = design.configuration instanceof Map ? Object.fromEntries(design.configuration) : design.configuration;

    // Table Header
    const tableTop = doc.y;
    doc.font('Helvetica-Bold');
    doc.text('Zone / Component', 50, tableTop);
    doc.text('Selection', 250, tableTop);
    doc.text('SKU / Code', 400, tableTop);
    doc.font('Helvetica');

    doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

    let y = tableTop + 25;

    // Iterate config
    Object.entries(config).forEach(([key, value]) => {
        doc.text(key.toUpperCase(), 50, y);
        doc.text(String(value), 250, y);
        doc.text('STD-MAT-01', 400, y); // Mock SKU
        y += 20;
    });

    // --- Footer ---
    doc.fontSize(10).text('LeatherCAD Platform - Generated Report', 50, 700, { align: 'center', width: 500 });

    doc.end();
};
