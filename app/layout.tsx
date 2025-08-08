import "@/src/app/styles";
import { AuthProvider } from "@/src/app/providers";
import { metadata } from "@/src/app/config";
import NextNProgress from "nextjs-toploader";
import { Toaster } from "sonner";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextNProgress color={"#1d4ed8"} height={5} shadow={false} />
          <AuthProvider>
            {children}
          </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
