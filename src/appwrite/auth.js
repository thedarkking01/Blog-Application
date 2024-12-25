import conf from "../conf/conf";
import {Client,Account,ID} from "appwrite";


export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }

    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(ID.unique(),email, password, name);
            if (userAccount){
                //call another method 
                return this.login({email,password})
            }else{
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser::error",error);
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout::error",error);
        }
    }

    // async updateProfile({name, email}){
    //     try {
    //         await this.account.update(name, email);
    //     } catch (error) {
    //         console.log("Appwrite service :: updateProfile::error",error);
    //     }
    // }

    // async deleteAccount(){
    //     try {
    //         await this.account.delete();
    //     } catch (error) {
    //         console.log("Appwrite service :: deleteAccount::error",error);
    //     }
    // }

    // async resetPassword({email}){
    //     try {
    //         await this.account.sendResetPasswordEmail(email);
    //     } catch (error) {
    //         console.log("Appwrite service :: resetPassword::error",error);
    //     }
    // }
}
const authservice=new AuthService();
export default authservice;