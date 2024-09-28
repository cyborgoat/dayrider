import {invoke} from "@tauri-apps/api/tauri";

export async function addUser() {
    try {
        await invoke('create_user', {
            name: 'John Doe',
            id: 1,
            email: 'john@example.com',
        });
        console.log('User created successfully!');
    } catch (error) {
        console.error('Failed to create user:', error);
    }
}