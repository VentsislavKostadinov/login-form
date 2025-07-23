import { ReactNode } from "react";
import "./Form.scss";

type FormProps = {
  children: ReactNode;
  title: string,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function Form({ children, title, handleSubmit }: FormProps) {
  return (
    <div className="form-page-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>{title}</h2>
        {children}
      </form>
    </div>
  );
}
