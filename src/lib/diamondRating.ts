const DIAMOND_PATH = 'M10 1 L19 10 L10 19 L1 10 Z';

export function diamondRatingHTML(
  rating: number,
  options: { max?: number; size?: number; label?: string; idPrefix?: string } = {}
): string {
  const { max = 5, size = 14, label = 'Rating', idPrefix = 'dr' } = options;
  const uid = Math.random().toString(36).slice(2, 8);

  const svgs = Array.from({ length: max }, (_, i) => {
    const fill = Math.min(Math.max(rating - i, 0), 1);
    const clipId = `${idPrefix}-${uid}-${i}`;
    const defs = fill > 0 && fill < 1
      ? `<defs><clipPath id="${clipId}"><rect x="0" y="0" width="${fill * 20}" height="20"/></clipPath></defs>`
      : '';
    const bg = `<path d="${DIAMOND_PATH}" fill="#5a4818"/>`;
    const fg = fill > 0
      ? `<path d="${DIAMOND_PATH}" fill="#c9a767"${fill < 1 ? ` clip-path="url(#${clipId})"` : ''}/>`
      : '';
    return `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">${defs}${bg}${fg}</svg>`;
  });

  return `<span class="diamond-rating" aria-label="${label} rating: ${rating} out of ${max}" style="display:inline-flex;align-items:center;gap:2px;line-height:1;vertical-align:middle">${svgs.join('')}</span>`;
}
