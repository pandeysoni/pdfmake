import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  'Roboto': {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-Italic.ttf'
  }
};

/**
 * @desc pdf content
 * @param {Array} sections
 * @param {Number} pageWidth Width in inches
 * @param {Number} pageHeight Width in inches
 * @return title, pageSize, content, pageMargin
 * */
const pdfContent = (sections, pageWidth, pageHeight) => {
  const pageSize = {
    width: pageWidth * 72,
    height: pageHeight * 72
  };
  const imageWidth = 1.0;
  const imagePercentage = 70;
  const pageMargins = [40, 60, 40, 60];
  let content = [];
  sections.forEach((section, si) => {
    content.push({
      text: section.heading || `Section ${si + 1}`,
      fontSize: 20,
      alignment: 'center',
      margin: [15, 15],
      // If it is the first section, do not insert a pageBreak.
      pageBreak: si === 0 ? null : 'before'
    });
    section.images.forEach((image, j) => {
      content.push({
        image,
        alignment: 'center',
        width: (pageSize.width * imageWidth) * imagePercentage / 100,
        pageBreak: j !== 0 ? 'before' : null
      });
    });
  });
  return {
    pageSize,
    content,
    pageMargins
  }
};

/**
 * @desc Print pdf for the puzzles
 * @param {Array} sections
 * @param {Number} pageWidth Width in inches
 * @param {Number} pageHeight Width in inches
 * @param {String} font e.g. 'Helvetica' One of PDFMakeFonts
 * */
const PrintPdf = (sections, pageWidth, pageHeight) => {
  const {pageSize, content, pageMargins} = pdfContent(sections, pageWidth, pageHeight);
  const docDefinition = {
    pageSize,
    content: content,
    pageMargins,
    footer: function (currentPage, pageCount) {
      return {
        text: "Page " + currentPage.toString() + ' of ' + pageCount,
        alignment: currentPage % 2 === 0 ? 'left' : 'right',
        style: 'normalText',
        margin: [10, 10, 10, 10]
      };
    },
  };

  // console.log(docDefinition);
  pdfMake.createPdf(docDefinition).download(`pdf-${+new Date()}.pdf`);
};

export default PrintPdf;