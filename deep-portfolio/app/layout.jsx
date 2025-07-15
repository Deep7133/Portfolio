import "./globals.css"

export const metadata = {
  title: "Deep Menpara - Data Science Portfolio",
  description:
    "Deep Menpara's portfolio showcasing machine learning projects, data analytics, and web development skills.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
