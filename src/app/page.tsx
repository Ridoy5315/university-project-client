
import LogoutButton from "@/components/shared/LogoutButton";
import { Button } from "@/components/ui/button";
import { getCookie } from "@/services/auth/tokenHandlers";
import Link from "next/link";

const Home = async () => {

  const accessToken = await getCookie("accessToken");
  return (
    <div>
      {accessToken ? (
        <LogoutButton></LogoutButton>
      ) : (
        <>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
