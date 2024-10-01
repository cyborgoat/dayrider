import {User} from "@/types/user";
import {invoke} from "@tauri-apps/api/tauri";

export async function setUser(name: string, id: string, email: string): Promise<User | undefined> {
    try {
        const u = await invoke("set_user", {
            name: name,
            id: id,
            email: email,
        })
        console.log(`User profile updated successfully: ${JSON.stringify(u)}`);
        return u as User;
    } catch (error) {
        console.error("Failed to update user info:", error);
    }
}

export async function getUser(): Promise<User | undefined> {
    try {
        const u = await invoke("get_user", {});
        console.log(`User profile fetched successfully: ${JSON.stringify(u)}`);
        return u as User;
    } catch (error) {
        console.error("Failed to fetch user info:", error);
    }
}
