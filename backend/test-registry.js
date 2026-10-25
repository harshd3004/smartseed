const registry = require("./src/services/generators");

console.log("Total generators:", registry.size);
console.log("Has email generator:", registry.has("internet.email"));
console.log("Generated name:", registry.get("person.fullName").generate());
console.log("Generated email:", registry.get("internet.email").generate());
console.log(
    "Generated age:",
    registry.get("number.integer").generate({ min: 18, max: 60 })
);
