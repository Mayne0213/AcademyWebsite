export interface UserInfo {
  name: string;
  userId: string;
  memberId: number;
  role: "STUDENT" | "ADMIN" | "DEVELOPER";
}
