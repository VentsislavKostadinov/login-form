"use client"

import Form from "../components/common/Form/Form";
import Input from "../components/common/input/Input";
import Button from "../components/common/Button/Button";

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  return (
    <Form handleSubmit={handleSubmit}>
      <Input
        id="email-address"
        label="Email address"
        type="email"
        placeholder="enter your email"
      />
      <Input
        id="password"
        label="Passwrod"
        type="password"
        placeholder="type your password"
      />
      <Button text="Login" type="submit" />
    </Form>
  );
}
