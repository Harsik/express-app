// import mongoose from "mongoose";

export interface IUser{
    username: string;
    password: string;
}

export interface IUserInputDTO {
    username: string;
    password: string;
}

export interface userUniqueSearchInput {
    username : string;
}