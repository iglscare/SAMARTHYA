// ============================================================================
// SAMARTHYA SCREEN READER DOM CONTENT EXTRACTOR
// ============================================================================

/**
 * Intelligent Content Extractor for the Screen Reader
 * Gathers page heading, active context, and key narrative content
 * ignoring noisy navigation links and buttons.
 */
export const extractPageContentForScreenReader = (): { title: string; speechNarrative: string } => {
  if (typeof document === 'undefined') {
    return { title: 'Samarthya', speechNarrative: 'Welcome to Samarthya.' };
  }

  // Check if user has explicitly selected text with mouse/keyboard
  const userSelection = window.getSelection()?.toString().trim();
  if (userSelection && userSelection.length > 3) {
    return {
      title: 'Selected Content',
      speechNarrative: `Reading your selected text: ${userSelection}`,
    };
  }

  // 1. Get main page title
  const h1 = document.querySelector('main h1') || document.querySelector('h1');
  const pageTitle = h1?.textContent?.trim() || document.title.replace(/[-|].*$/, '').trim() || 'Portal';

  // 2. Locate main content container
  const main = document.querySelector('main') || document.querySelector('article') || document.body;

  // 3. Find key descriptive paragraphs or headings
  const textBlocks: string[] = [];

  // Add page announcement
  textBlocks.push(`Samarthya Screen Reader. Active Page: ${pageTitle}.`);

  // Extract primary heading subtitles or hero descriptions
  const subtitles = main.querySelectorAll('p.text-sm, p.text-slate-500, p.text-slate-600, h2, h3');
  let count = 0;
  subtitles.forEach((el) => {
    // Avoid reading menus, buttons, or hidden elements
    if (
      count < 6 &&
      el.textContent &&
      !el.closest('nav') &&
      !el.closest('header') &&
      !el.closest('button') &&
      el.textContent.trim().length > 15
    ) {
      textBlocks.push(el.textContent.trim());
      count++;
    }
  });

  // If no subtitles found, grab main body text
  if (textBlocks.length <= 1) {
    const paragraphs = main.querySelectorAll('p');
    paragraphs.forEach((p) => {
      if (count < 4 && p.textContent && p.textContent.trim().length > 20) {
        textBlocks.push(p.textContent.trim());
        count++;
      }
    });
  }

  return {
    title: pageTitle,
    speechNarrative: textBlocks.join('. '),
  };
};
