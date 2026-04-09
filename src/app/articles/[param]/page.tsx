type ArticlePageProps = {
  params: Promise<{
    param: string;
  }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { param } = await params;

  return (
    <section className="container flex min-h-[60svh] flex-col justify-center gap-4 py-16">
      <p className="text-sm uppercase tracking-[0.2em] text-base-content/60">Article</p>
      <h1 className="text-4xl font-bold tracking-tight">Placeholder</h1>
      <p className="max-w-2xl text-base-content/70">
        Dynamic article page for <code>{param}</code>.
      </p>
    </section>
  );
}
