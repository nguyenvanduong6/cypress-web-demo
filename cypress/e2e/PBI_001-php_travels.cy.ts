/* PBI_000-Sample
 *
 * As an User
 * I want to Home page
 */

//  Import

//  Const content
const popularCity = [
  "Dubai, United Arab Emirates",
  "Phuket, Thailand",
  "Kuala Lumpur, Malaysia",
  "Delhi, India",
  "Singapore, Singapore",
  "Jeddah, Saudi Arabia",
];

const danangResult = ["Da Nang, Vietnam"];

//  Common function
const clearLocalstorage = () => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
};

const goToHotelsPage = () => {
  clearLocalstorage();
  Cypress.on("uncaught:exception", () => {
    return false;
  });
  cy.visit("https://phptravels.net/hotels");
};

const inputData = (element, value) => {
  cy.get(element).should("be.visible").type(value);
};

//Sennario;
describe("Scenario-001: User should see the Search box is working correct function", () => {
  context("Given User go to Hotels page", () => {
    before(() => {
      goToHotelsPage();
    });

    it("When User click on Search By City DDL", () => {
      cy.get("#select2-hotels_city-container").should("be.visible").click();
    });

    it("Then User should see list popular city is display correct", () => {
      cy.get("div.most--popular-hotels strong").then((elms) => {
        elms.each((index, elm) => {
          const text = elm.innerText.replace(/\n/, "");
          expect(text).to.eq(popularCity[index]);
        });
      });
    });
  });
});

describe("Scenario-002: User should see the suggestion display", () => {
  context("Given User go to Hotels page", () => {
    before(() => {
      goToHotelsPage();
    });

    it('When User input city is "Da Nang" into Search By City textbox', () => {
      cy.get("#select2-hotels_city-container").should("be.visible").click();
      inputData("input.select2-search__field", "Da Nang");
    });

    it("Then User should see the correct suggetion display", () => {
      cy.get("ul#select2-hotels_city-results li:not(.loading-results)").then(
        (elms) => {
          elms.each((index, elm) => {
            expect(elm).to.have.text(danangResult[index]);
          });
        }
      );
    });
  });
});

describe("Scenario-003: Check case fail", () => {
  context("Given User go to Hotels page", () => {
    before(() => {
      goToHotelsPage();
    });

    it('When User input city is "Da Nang" into Search By City textbox', () => {
      cy.get("#select2-hotels_city-container").should("be.visible").click();
      inputData("input.select2-search__field", "Da Nang");
    });

    it("Then User should see the correct suggetion display", () => {
      cy.get("ul#select2-hotels_city-results li:not(.loading-results)").then(
        (elms) => {
          elms.each((index, elm) => {
            expect(elm).to.have.text("This case will fail");
          });
        }
      );
    });
  });
});
