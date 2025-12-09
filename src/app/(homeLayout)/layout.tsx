import Navbar from "@/components/Navbar/Navbar"
import { getUserInfo } from "@/lib/getUserInfo";



const HomeLayout = async({ children } : { children: React.ReactNode }) => {
 const userInfo = await getUserInfo();
       const user = userInfo?.data;
  return (
     <>
     
     <Navbar user={user}>
     </Navbar>
     {children}
     </>
  )
}

export default HomeLayout;