import {invoke} from "@tauri-apps/api/tauri";

export async function setUser(name: string, id: number, email: string) {
    try {
        await invoke('set_user', {
            name: name,
            id: id,
            email: email,
        });
        console.log('User profile updated successfully!');
    } catch (error) {
        console.error('Failed to update user info:', error);
    }
}
