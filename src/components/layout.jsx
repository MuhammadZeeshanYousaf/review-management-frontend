import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";

export default function Layout({ children }) {
  const auth = useAuth();

  return (
    <div>
      {auth.isAuthenticated() && (
        <Header
          name={auth.user.name}
          email={auth.user.email}
          logoutHandler={auth.logout}
        />
      )}
      <main className="container mx-auto py-8">{children}</main>
    </div>
  );
}
