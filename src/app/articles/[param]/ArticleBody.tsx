import "server-only";

import { Fragment, type ReactNode } from "react";
import type { Article, ArticleContentBlock } from "@/types/api";
import Image from "next/image";

export function ArticleBody({ article }: { article: Article }) {
  return (
    <article className="container py-10 sm:py-12 lg:py-16">
      <div className="w-full max-w-4xl mx-auto prose prose-lg">
        {article.content.map((block, index) => {
          return renderArticleBlock(block, article.title, index);
        })}
      </div>
    </article>
  );
}

export function ArticleBodySkeleton() {
  return (
    <section aria-hidden="true" className="container py-10 sm:py-12 lg:py-16">
      <div className="flex flex-col gap-5 max-w-4xl mx-auto">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className={`${index % 3 === 2 ? "w-4/5" : "w-full"} h-5 rounded-field skeleton`}
          />
        ))}
        <div className="w-3/4 h-8 sm:h-10 md:h-12 mt-12 mb-8 rounded-field skeleton" />
        <div className="sm:hidden w-1/2 h-8 rounded-field skeleton" />
        {Array.from({ length: 12 }, (_, index) => (
          <div
            key={index}
            className={`${index % 3 === 2 ? "w-4/5" : "w-full"} h-5 rounded-field skeleton`}
          />
        ))}
      </div>
    </section>
  );
}

const inlineMarkupPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|\*\*([^*]+)\*\*|`([^`\n]+)`/g;

function getCodeParagraphContent(text: string) {
  const trimmedText = text.trim();

  if (trimmedText.length >= 2 && trimmedText.startsWith("`") && trimmedText.endsWith("`")) {
    return trimmedText.slice(1, -1);
  }

  return null;
}

function renderInlineMarkup(text: string) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(inlineMarkupPattern)) {
    const [matchedText, label, href, emphasizedText, inlineCodeText] = match;
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex));
    }

    if (label && href) {
      nodes.push(
        <a key={`${href}-${matchIndex}`} href={href} target="_blank" rel="noreferrer">
          {label}
        </a>,
      );
    } else if (emphasizedText) {
      nodes.push(<strong key={`strong-${matchIndex}`}>{emphasizedText}</strong>);
    } else if (inlineCodeText) {
      nodes.push(<code key={`code-${matchIndex}`}>{inlineCodeText}</code>);
    } else {
      nodes.push(matchedText);
    }

    lastIndex = matchIndex + matchedText.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderArticleBlock(block: ArticleContentBlock, articleTitle: string, index: number) {
  switch (block.type) {
    case "paragraph": {
      const codeParagraphContent = getCodeParagraphContent(block.text);

      if (codeParagraphContent !== null) {
        return (
          <div key={`${block.type}-${index}`} className="mockup-code w-full">
            <pre className="not-prose">
              <code>{codeParagraphContent}</code>
            </pre>
          </div>
        );
      }

      return <p key={`${block.type}-${index}`}>{renderInlineMarkup(block.text)}</p>;
    }
    case "heading": {
      const HeadingTag = block.level === 2 ? "h2" : "h3";

      return (
        <HeadingTag key={`${block.type}-${index}`}>{renderInlineMarkup(block.text)}</HeadingTag>
      );
    }
    case "blockquote":
      return (
        <blockquote key={`${block.type}-${index}`}>
          <p>{renderInlineMarkup(block.text)}</p>
        </blockquote>
      );
    case "unordered-list":
      return (
        <ul key={`${block.type}-${index}`}>
          {block.items.map((item, itemIndex) => (
            <li key={`${index}-${itemIndex}`}>{renderInlineMarkup(item)}</li>
          ))}
        </ul>
      );
    case "ordered-list":
      return (
        <ol key={`${block.type}-${index}`}>
          {block.items.map((item, itemIndex) => (
            <li key={`${index}-${itemIndex}`}>{renderInlineMarkup(item)}</li>
          ))}
        </ol>
      );
    case "image":
      return (
        <Fragment key={`${block.type}-${index}`}>
          {block?.src ? (
            <figure key={`${block.type}-${index}`}>
              <div className="not-prose relative aspect-16/9 w-full overflow-hidden rounded-box bg-base-300">
                <Image
                  src={block.src}
                  alt={block.alt || articleTitle}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 896px, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2rem)"
                  className="object-cover object-center"
                />
              </div>
              {block.caption ? <figcaption>{renderInlineMarkup(block.caption)}</figcaption> : null}
            </figure>
          ) : null}
        </Fragment>
      );
    default:
      return null;
  }
}
