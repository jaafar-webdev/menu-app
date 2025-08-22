import CartMobileBar from "@/features/public/cart/CartMobileBar";
import Header from "@/features/public/header/Header";

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <CartMobileBar />
    </>
  );
}
