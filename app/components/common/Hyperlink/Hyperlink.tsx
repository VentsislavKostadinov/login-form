import Link from "next/link";
import "./Hyperlink.scss";

type HyperlinkProps = {
  text: string;
  path: string;
};

export default function Hyperlink({ text, path }: HyperlinkProps) {
  return (
    <div className="hyperlink-wrapper">
      <Link href={path}>{text}</Link>
    </div>
  );
}
