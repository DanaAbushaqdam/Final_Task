export default class SharedActions {
  getTableHeaderIndex(headerName: string) {
    return cy
      .get(".oxd-table-header")
      .children()
      .first()
      .contains("[role=columnheader]", headerName)
      .invoke("index");
  }
}
