import ReactMarkdown from "react-markdown";

interface ArticleViewerProps {
  content: string;
}

export function ArticleViewer({ content }: ArticleViewerProps) {
  return (
    <article className="prose prose-p:text-type-body-lg prose-p:text-ink-900 dark:prose-p:text-white prose-p:leading-relaxed prose-headings:text-ink-900 dark:prose-headings:text-white prose-headings:font-semibold prose-a:text-aurora-sea prose-a:no-underline hover:prose-a:underline prose-ul:text-type-body-lg prose-ul:text-ink-900 dark:prose-ul:text-white max-w-none">
      <ReactMarkdown
        components={{
          h1: ({ ...props }) => <h1 className="text-type-display font-fraunces mb-space-8 mt-space-12" {...props} />,
          h2: ({ ...props }) => <h2 className="text-type-title-xl mb-space-6 mt-space-10" {...props} />,
          h3: ({ ...props }) => <h3 className="text-type-title-lg mb-space-4 mt-space-8" {...props} />,
          p: ({ ...props }) => <p className="mb-space-6 text-type-body-lg" {...props} />,
          ul: ({ ...props }) => <ul className="list-disc pl-space-6 mb-space-6 space-y-space-2 text-type-body-lg" {...props} />,
          li: ({ ...props }) => <li className="pl-space-2" {...props} />,
          blockquote: ({ ...props }) => (
            <blockquote className="border-l-4 border-aurora-sea pl-space-4 italic text-ink-600 dark:text-ink-300 mb-space-6" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
