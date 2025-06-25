import SharedActions from "./actions";

export default class SharedAssertions {
  sharedAction = new SharedActions();
  checkTableContainsValueInColumnByRow(
    rowNumber: number,
    headerName: string,
    value: string,
    isExist: boolean
  ) {
    this.sharedAction.getTableHeaderIndex(headerName).then((headerIndex) => {
      cy.get(".oxd-table-body")
        .find("div[role=row]")
        .eq(rowNumber)
        .find("div[role=cell]")
        .eq(headerIndex)
        .contains(value)
        .should(isExist ? "exist" : "not.exist");
    });
  }
}
