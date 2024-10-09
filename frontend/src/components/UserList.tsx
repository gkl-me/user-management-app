import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";

import edit_icon from "../assets/edit.svg";
import delete_icon from "../assets/delete.svg";
import AddUserDialog from "./AddUserDialog";

const UserList: React.FC = () => {
  return (
    <div className="rounded-md flex justify-between items-center w-[90%] min-h-24 my-5 shadow-sm shadow-blue-500 p-5">
      <div className="w-full my-0 p-0 mx-auto">
        <Table className="dark">
          <TableHeader className="">
            <TableRow className="bg-[#070529]  text-white">
              <TableHead className="w-[100px] font-semibold">Name</TableHead>
              <TableHead className="text-center font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Created At</TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell className="text-center">Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">
                <div className="">
                    <AddUserDialog>
                    <Button className="mr-3" variant={"light"} size={"icon"}>
                    <img src={edit_icon} className="w-4 h-4" alt="" />
                  </Button>
                    </AddUserDialog>
                  
                  <Button variant={"blue"} size={"icon"}>
                    <img src={delete_icon} className="w-4 h-4" alt="" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell className="text-center">Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">
                <div className="">
                  <Button className="mr-3" variant={"light"} size={"icon"}>
                    <img src={edit_icon} className="w-4 h-4" alt="" />
                  </Button>
                  <Button variant={"blue"} size={"icon"}>
                    <img src={delete_icon} className="w-4 h-4" alt="" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserList;
