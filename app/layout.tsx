import "@/src/app/styles";
import { AuthProvider } from "@/src/app/providers";
import { metadata } from "@/src/app/config";
import NextNProgress from "nextjs-toploader";
import { Toaster } from "sonner";
import type { Viewport } from "next";
import { JsonLd } from "@/src/shared/seo/JsonLd";
import { academySchema, websiteSchema, organizationSchema } from "@/src/app/config/schemas";

export { metadata };

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <JsonLd data={academySchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
      </head>
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