// Imports
const cds = require("@sap/cds");

/**
 * The service implementation with all service handlers
 */
module.exports = cds.service.impl(async function () {
   // Define constants for the Risk entity from the risk-service.cds file
   const { Risks } = this.entities;

   /**
    * Set criticality after a READ operation on /risks
    */
   this.after("READ", Risks, (data) => {
      const risks = Array.isArray(data) ? data : [data];

      risks.forEach((risk) => {
         if (risk.impact >= 100000) {
            risk.criticality = 1;
         } else {
            risk.criticality = 2;
         }
      });
   });
});
