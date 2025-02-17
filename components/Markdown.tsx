import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
}
const Markdown = ({ children, className }: MarkdownProps) => {
  return (
    <ReactMarkdown
      className={cn("space-y-3", className)}
      components={{
        ul: (props) => <ul className="list-inside list-disc" {...props} />,
        a: (props) => (
          <a className="text-green-500 underline" target="_blank" {...props} />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
