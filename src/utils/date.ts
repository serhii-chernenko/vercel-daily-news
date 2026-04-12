const publishedDateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "long",
  timeZone: "UTC",
});

export function formatPublishedDate(publishedAt: string) {
  return publishedDateFormatter.format(new Date(publishedAt));
}
