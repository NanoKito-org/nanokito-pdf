// Ghostscript Web Worker
// Uses "One-Shot" pattern: Spawns, runs once, and should be terminated.

self.onmessage = async (e) => {
  const { id, fileArrayBuffer, quality } = e.data;

  try {
    // 1. Fetch WASM manually
    const response = await fetch('/gs/gs.wasm');
    if (!response.ok) throw new Error(`Failed to fetch gs.wasm: ${response.statusText}`);
    const buffer = await response.arrayBuffer();

    // Map quality
    let pdfSettings = '/ebook';
    if (quality === 'screen') pdfSettings = '/screen';
    if (quality === 'printer') pdfSettings = '/printer';

    const inputFilename = 'input.pdf';
    const outputFilename = 'output.pdf';

    // 2. Setup Module
    self.Module = {
      wasmBinary: buffer,
      print: (text) => {
        console.log('[GS stdout]', text);

        // Parse progress: "Page 1", "Page 2", etc.
        const pageMatch = text.match(/Page (\d+)/);
        if (pageMatch) {
          const currentPage = parseInt(pageMatch[1], 10);
          self.postMessage({
            id,
            type: 'progress',
            current: currentPage
          });
        }
      },
      printErr: (text) => console.error('[GS stderr]', text),
      arguments: [
        '-sDEVICE=pdfwrite',
        `-dPDFSETTINGS=${pdfSettings}`,
        '-dCompatibilityLevel=1.4',
        '-dNOPAUSE',
        '-dQUIET',
        '-dBATCH',
        `-sOutputFile=${outputFilename}`,
        inputFilename
      ],
      preRun: [
        () => {
          console.log('Writing input file...');
          // FS should be available on Module or global
          const fs = self.FS || self.Module.FS;
          if (!fs) throw new Error('FS not found in preRun');
          fs.writeFile(inputFilename, new Uint8Array(fileArrayBuffer));
        }
      ],
      postRun: [
        () => {
          console.log('Ghostscript finished. Reading output...');
          try {
            const fs = self.FS || self.Module.FS;
            const data = fs.readFile(outputFilename);
            const blob = new Blob([data], { type: 'application/pdf' });
            self.postMessage({ id, success: true, blob });
          } catch (err) {
            console.error('Error reading output:', err);
            self.postMessage({ id, success: false, error: 'Failed to generate output PDF' });
          }
        }
      ],
      quit: (status, toThrow) => {
        if (status !== 0) {
          console.error('Ghostscript quit with status:', status);
          self.postMessage({ id, success: false, error: `Ghostscript exited with status ${status}` });
        }
      }
    };

    // 3. Import Script to Start
    // This will trigger the run sequence: preRun -> main -> postRun
    importScripts('/gs/Ghostscript.js');

  } catch (error) {
    console.error('Worker Init Error:', error);
    self.postMessage({ id, success: false, error: error.message || error.toString() });
  }
};
