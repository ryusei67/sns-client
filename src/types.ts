export interface Profile {
  id:number,
  bio:string,
  profileImageUrl:string,
  user :UserType;
  }

export interface UserType {
id:number,
username:string,
email:string,
password: string,
posts:PostTypes[],
profile:Profile;
}
export interface PostTypes {
  id:number,
  content:string,
  createAt:string,
  authorId:number,
  author:UserType;
}