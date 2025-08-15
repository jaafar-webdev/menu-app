import Link from "next/link";

const AuthLink = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="font-medium text-indigo-600 hover:text-indigo-500"
    >
      {children}
    </Link>
  );
};

export default AuthLink;
