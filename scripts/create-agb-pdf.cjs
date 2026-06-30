const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '..', 'public', 'agb-fv-webseiten.pdf');

const lines = [
  'Allgemeine Geschäftsbedingungen',
  'F&V Webseiten',
  '',
  'Diese Allgemeinen Geschäftsbedingungen gelten für die Zusammenarbeit zwischen F&V Webseiten und Kund:innen.',
  'Der Leistungsumfang wird in jedem Projektangebot beschrieben.',
  'Zahlungen sind, sofern nichts anderes vereinbart ist, innerhalb von 14 Tagen fällig.',
  'Bei Fragen oder Abweichungen wird die jeweilige individuelle Vereinbarung herangezogen.',
];

function escapePdfText(value) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

let stream = 'BT\n/F1 12 Tf\n72 740 Td\n';
stream += `(AGB - F&V Webseiten) Tj\n`;
stream += '0 -20 Td\n';

lines.slice(1).forEach((line, index) => {
  const text = index === 0 ? line : line;
  stream += `(${escapePdfText(text)}) Tj\n`;
  if (index < lines.slice(1).length - 1) {
    stream += '0 -14 Td\n';
  }
});

stream += 'ET';

const objects = [];
objects.push('1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj');
objects.push('2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj');
objects.push(
  '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj',
);
objects.push(`4 0 obj << /Length ${Buffer.byteLength(stream, 'utf8')} >> stream\n${stream}\nendstream endobj`);
objects.push('5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj');

const pdfParts = ['%PDF-1.4'];
const offsets = [0];
let pdfBody = '';
objects.forEach((obj) => {
  const entry = `${obj}\n`;
  offsets.push(Buffer.byteLength(pdfBody + entry, 'utf8'));
  pdfBody += entry;
});

const xrefOffset = Buffer.byteLength(pdfParts.join('\n') + '\n', 'utf8');
const xrefLines = ['xref', '0 6'];
xrefLines.push('0000000000 65535 f ');
for (let i = 1; i < 6; i += 1) {
  xrefLines.push(String(offsets[i]).padStart(10, '0') + ' 00000 n ');
}

const trailer = `trailer << /Root 1 0 R /Size 6 >>\nstartxref\n${xrefOffset + Buffer.byteLength(pdfBody, 'utf8')}\n%%EOF`;
const pdf = [pdfParts.join('\n') + '\n', pdfBody, xrefLines.join('\n') + '\n', trailer].join('');

fs.writeFileSync(outputPath, pdf, 'utf8');
console.log(`Created ${path.relative(process.cwd(), outputPath)}`);
