import { users } from "./users.js";

users.map((user,i) => {
    let userinfo = `ID : ${user.id}, Name : ${user.name}`;
    console.log(userinfo); 
});