"use client";

import Form from "../components/common/Form/Form";
import Button from "../components/common/Button/Button";
import Input from "../components/common/input/Input";
import Hyperlink from "../components/common/Hyperlink/Hyperlink";

export default function ForgotPasswordPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Form handleSubmit={handleSubmit} title="Welcome to Forgot Password page">
      <Input
        id="email-address"
        label="Email address"
        type="email"
        placeholder="enter your email"
      />
      <Button text="Login" type="submit" />
      <Hyperlink text="Back to Login" path="/login" />
    </Form>
  );
}
