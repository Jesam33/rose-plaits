import "./globals.css";

export const metadata = {
  title: "Rose Plaits | Premium Braid & Hair Artistry",
  description: "Exquisite plaits, flawless parting, and luxury hair designs tailored to bring out your inner queen. Seamlessly book your appointment via WhatsApp.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  );
}
