import "./globals.css";

import { Alegreya } from "next/font/google";

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "To Do List",
  description:
    "Effortlessly manage your tasks and boost productivity with our intuitive ToDoList app built on Next.js. Organize, prioritize, and complete tasks with ease, whether you're at home or on the go. Stay on top of your commitments and goals with our sleek and user-friendly interface. Try it now to experience a new level of task management efficiency.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={alegreya.className}>{children}</body>
    </html>
  );
}
