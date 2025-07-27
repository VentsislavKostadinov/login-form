# 🔐 Login Form App (Next.js)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).  
It implements a simple login and password recovery flow using local credentials and multi-language support.

---

## ✨ Features

-   🔐 **Login Page**

    -   Email and password fields
    -   Displays error message on login failure
    -   Redirects to a success screen upon successful login

-   🔑 **Forgot Password Page**

    -   Email input field
    -   Reset password flow with confirmation screen

-   🌐 **Internationalization (i18n)**

    -   Implemented using [`next-intl`](https://next-intl-docs.vercel.app/)
    -   Supports **English** and **Bulgarian** languages
    -   Language files:

        ```
        public/locales/en.json
        public/locales/bg.json
        ```

📂 **Local Credential Validation**

-   Credentials are validated against a local JSON file located at:
    ```
    public/credentials/credentials.json
    ```
-   Credentials data:

    ```json
    {
        "email": "john.doe@mail.com",
        "password": "test456654"
    }
    ```

-   🌍 **Global State Management**

    -   Uses React Context API for authentication state

-   🎨 **Styling**
    -   Styled using SCSS (CSS pre-processor)

---

## 🛠 Getting Started

To run the development server locally:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then open http://localhost:3000 in your browser to view the app.

## 🚀 Live Demo

This app is deployed on Vercel:
🔗 https://login-form-jau3.vercel.app
