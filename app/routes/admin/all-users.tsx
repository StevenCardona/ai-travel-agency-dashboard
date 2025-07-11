import { Header } from "components";

import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
} from "@syncfusion/ej2-react-grids";
import { getAllUsers } from "lib/appwrite/auth";
import { cn } from "lib/utils";
import { users_dummy } from "~/constants/data";
import type { Route } from "./+types/all-users";

// export const loader = async () => {
//   const { users, total } = await getAllUsers(10, 0);

//   return { users, total };
// };

const AllUsers = ({ loaderData }: Route.ComponentProps) => {
  // const { users } = loaderData; // Trae todos los usuarios de la bd

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Trips page`}
        description={"Check out our current users in real time"}
      />

      <GridComponent dataSource={users_dummy} gridLines="None">
        <ColumnsDirective>
          <ColumnDirective
            field="name"
            headerText="Name"
            width="200"
            textAlign="Left"
            template={(props: UserData) => (
              <div className="flex items-center gap-1.5 px-4">
                <img
                  src={props.imageUrl}
                  alt={props.email}
                  referrerPolicy="no-referrer"
                  className="rounded-full size-8 aspect-square"
                />
                <span>{props.name}</span>
              </div>
            )}
          />
          <ColumnDirective
            field="email"
            headerText="Email"
            width="150"
            textAlign="Left"
          />
          <ColumnDirective
            field="dateJoined"
            headerText="Date Joined"
            width="150"
            textAlign="Left"
          />
          <ColumnDirective
            field="itineraryCreated"
            headerText="Trips created"
            width="150"
            textAlign="Left"
          />
          <ColumnDirective
            field="status"
            headerText="Type"
            width="150"
            textAlign="Left"
            template={(props: UserData) => (
              <article
                className={cn(
                  "status-column",
                  props.status == "user" ? "bg-success-50" : "bg-light-300"
                )}
              >
                <div
                  className={cn(
                    "size-1.5 rounded-full",
                    props.status == "user" ? "bg-success-500" : "bg-gray-500"
                  )}
                ></div>
                <h3
                  className={cn(
                    "font-inter text-xs font-medium ",
                    props.status == "user"
                      ? "text-success-700"
                      : "text-gray-500"
                  )}
                >
                  {props.status}
                </h3>
              </article>
            )}
          />
        </ColumnsDirective>
      </GridComponent>
    </main>
  );
};

export default AllUsers;
