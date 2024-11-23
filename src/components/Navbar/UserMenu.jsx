import React from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

const getInitials = (name) => {
    return name
        .split(" ")
        .map((part) => part[0]?.toUpperCase() || "")
        .join("");
};
const UserMenu = ({ user, onLogout }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.profile}/>
                        <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                    <div className="text-sm font-semibold">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;
