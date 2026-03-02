export const FALLBACK_THUMBNAIL = "https://picsum.photos/seed/bestie-related/900/700";

export const toSimpleTitle = (index: number): string =>
    `관련 글 제목 ${String(index + 1).padStart(2, "0")}`;
