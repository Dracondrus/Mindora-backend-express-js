import usersCheckNew from "./usersCheckNew.js"; 
import usersCheck from "./usersCheck.js";
import userAddNewService from "./userAddNewService.js";
import userDeleteService from "./userDeleteService.js";
import userGetInfo from "./userGetInfo.js";
import userGetOwnTest from "./userGetOwnTest.js";

export default function usersService(app, sql) {
  userGetOwnTest(app,sql)
  usersCheckNew(app, sql);
  usersCheck(app, sql);
  userAddNewService(app, sql);
  userDeleteService(app, sql);
  userGetInfo(app, sql);
}
