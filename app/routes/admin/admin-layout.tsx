import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import MobileSidebar from "components/MobileSidebar";
import NavItems from "components/NavItems";
import { getExistingUser, storeUserData } from "lib/appwrite/auth";
import { account } from "lib/appwrite/client";
import { Outlet, redirect } from "react-router";

// export async function clientLoader() {
//   try {
//     const user = await account.get();
//     if (!user.$id) return redirect("/sign-in");

//     const existingUser = await getExistingUser(user.$id);

//     if (existingUser?.status == "user") {
//       return redirect("/");
//     }

//     return existingUser?.$id ? existingUser : await storeUserData();
//   } catch (e) {
//     console.log("error in clientLoader user", e);
//     return redirect("/sign-in");
//   }
// }

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <MobileSidebar />

      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width={270} enableGestures={false}>
          <NavItems />
        </SidebarComponent>
      </aside>

      <aside className="children">
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
