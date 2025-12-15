import * as pdfjsLib from 'pdfjs-dist';
import { jsPDF } from 'jspdf';

// Configure worker - using the specific version requested or a compatible one.
// We'll use a specific version to match the types usually installed or just the one requested.
// Ideally this should match the installed version package.json, but for CDN usage we stick to a recent stable one.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

export interface PdfCompressionOptions {
  compressionLevel: 'extreme' | 'standard' | 'high'; // affects JPEG quality
  grayscale: boolean;
  onProgress?: (current: number, total: number) => void;
}

const QUALITY_MAP = {
  extreme: 0.4,
  standard: 0.6,
  high: 0.8
};

const SCALE_MAP = {
  extreme: 1.0,  // Lower resolution for extreme compression
  standard: 1.5, // Decent readability
  high: 2.0      // Better readability
};

export async function compressPDF(
  file: File, 
  options: PdfCompressionOptions
): Promise<Blob> {
  const quality = QUALITY_MAP[options.compressionLevel];
  const scale = SCALE_MAP[options.compressionLevel];
  
  // 1. Read PDF
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdfDoc = await loadingTask.promise;
  const totalPages = pdfDoc.numPages;

  // Initialize jsPDF
  // We don't know the orientation yet, we'll set it per page or init with first page dimensions
  let pdfResult: jsPDF | null = null;

  for (let i = 1; i <= totalPages; i++) {
    // Report progress
    if (options.onProgress) {
      options.onProgress(i, totalPages);
    }

    // 2. Get Page
    const page = await pdfDoc.getPage(i);
    const viewport = page.getViewport({ scale });

    // 3. Render to Canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) {
      throw new Error('Canvas context could not be created');
    }

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Apply grayscale if needed
    if (options.grayscale) {
      context.filter = 'grayscale(100%)';
    }

    // Render task
    await page.render({
      canvasContext: context,
      viewport: viewport,
      transform: options.grayscale ? undefined : undefined // filter is applied to context
    }).promise;

    // 4. Compress (to JPEG)
    const imgData = canvas.toDataURL('image/jpeg', quality);
    
    // 5. Add to PDF
    // Calculate dimensions for PDF (convert px to mm usually, or just use px if supported clearly)
    // jsPDF usually works in mm, pt etc.
    // simpler to match page aspect ratio.
    const imgProps = {
        width: viewport.width,
        height: viewport.height
    };
    
    // We want the PDF page to match the original aspect ratio. 
    // jsPDF default is A4 portrait.
    // We can maximize image on the page or set page size to image size.
    // Setting page size to image size is safest for mixed content.
    
    // Convert px to pt (72 DPI) roughly or just pass dimensions to jsPDF
    // 1px = 0.75pt approx at 96DPI
    const widthPt = viewport.width * 0.75;
    const heightPt = viewport.height * 0.75;

    const orientation = widthPt > heightPt ? 'l' : 'p';
    
    if (i === 1) {
      pdfResult = new jsPDF({
        orientation,
        unit: 'pt',
        format: [widthPt, heightPt]
      });
    } else {
      pdfResult!.addPage([widthPt, heightPt], orientation);
    }

    pdfResult!.addImage(
      imgData, 
      'JPEG', 
      0, 
      0, 
      widthPt, 
      heightPt, 
      undefined, 
      'FAST' // Compression method
    );
     
    // Cleanup to free memory
    canvas.width = 0;
    canvas.height = 0;
  }

  if (!pdfResult) {
      throw new Error("PDF processing failed: No pages processed");
  }

  // 6. Return Blob
  return pdfResult.output('blob');
}
