import generatePdf from '@/utils/generatePdf';

/**
 * This is server class for invoice service
 *
 *@class
 */
class InvoicePdfGenerationService {
  /**
   * This function creates a new invoice directory.
   *
   * @function
   * @param req Api request data
   * @returns new created invoice directory details
   */
  public async genrateInviocePdf() {
    const pdfName = await generatePdf();
    return `pdf ${pdfName} generated successfully`;
  }
}

export default InvoicePdfGenerationService;
