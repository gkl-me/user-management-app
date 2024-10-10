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
import EditUserDialog from "./EditUserDialog";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { deleteUser } from "@/redux/slices/adminApiSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface usersType {
  name:string,
  email:string,
  _id:string
}

const UserList= ({users}:{users:usersType[]}) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const { error } = useAppSelector(state => state.admin)

  const handleDelete = async (id:string) => {
    await dispatch(deleteUser({id}))

    if(error){
      toast.error(error)
      navigate('/admin/dashboard')
    }else{
      toast.success('User deleted successfully')
      navigate('/admin/dashboard')
    }
  }

  return (
    <div className="rounded-md flex justify-between items-center w-[90%] min-h-24 my-5 shadow-sm shadow-blue-500 p-5">
      <div className="w-full my-0 p-0 mx-auto">
        <Table className="dark">
          <TableHeader className="">
            <TableRow className="bg-[#070529]  text-white">
              <TableHead className="text-left w-[100px] font-semibold">Name</TableHead>
              <TableHead className="text-center font-semibold">Email</TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user,index) => (
                <TableRow key={index}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="text-center">{user.email}</TableCell>
              <TableCell className="text-right">
                <div className="">
                    <EditUserDialog user={user}>
                    <Button className="mr-3" variant={"light"} size={"icon"}>
                    <img src={edit_icon} className="w-4 h-4" alt="" />
                  </Button>
                    </EditUserDialog>
                  <Button 
                  onClick={() => handleDelete(user._id)}
                  variant={"blue"} size={"icon"}>
                    <img src={delete_icon} className="w-4 h-4" alt="" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
              
            ))}
            
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserList;
