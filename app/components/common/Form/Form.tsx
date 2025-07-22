import { ReactNode } from "react";
import "./Form.scss";

type FormProps = {
  children: ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function Form({ children, handleSubmit }: FormProps) {
  return (
    <div className="form-page-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Welcome to login form</h2>
        {children}
      </form>
    </div>
  );
}
