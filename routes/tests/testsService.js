import AddTestEdit from "./AddTestEdit.js";
import AddTestStandart from "./AddTestStandart.js";

export default function TestsService(app, sql) {
  AddTestStandart(app, sql);
  AddTestEdit(app,sql)
}
