export interface PostTypes {
    _id: string;
    title: string;
    description?: string;
    owner: { username: string, profilePic: string, _id: string };
    mediaUrl?: string;
    createdAt: Date;
    likes?: Array<any>;
    comments?: Array<any>;
}
