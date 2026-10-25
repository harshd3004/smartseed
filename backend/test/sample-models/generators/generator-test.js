const assert = require("node:assert/strict");
const registry = require("../../../src/services/generators");

function runTests() {
    console.log("\n--- SmartSeed Generator Registry Tests ---\n");

    // 1. Verify that generators were registered.
    assert.ok(registry.size > 0);
    assert.equal(registry.has("person.fullName"), true);
    assert.equal(registry.has("internet.email"), true);
    assert.equal(registry.has("number.integer"), true);

    console.log("PASS: Generators registered successfully.");

    // 2. Generate a person's name.
    const name = registry.get("person.fullName").generate();

    assert.equal(typeof name, "string");
    assert.ok(name.length > 0);

    console.log("PASS: Person name generation:", name);

    // 3. Generate an email.
    const email = registry.get("internet.email").generate();

    assert.equal(typeof email, "string");
    assert.ok(email.includes("@"));

    console.log("PASS: Email generation:", email);

    // 4. Test numeric options.
    const integer = registry
        .get("number.integer")
        .generate({ min: 10, max: 20 });

    assert.ok(Number.isInteger(integer));
    assert.ok(integer >= 10 && integer <= 20);

    console.log("PASS: Integer options:", integer);

    // 5. Test floating-point options.
    const float = registry
        .get("number.float")
        .generate({
            min: 1,
            max: 2,
            fractionDigits: 2
        });

    assert.ok(float >= 1 && float <= 2);

    console.log("PASS: Float options:", float);

    // 6. Test enum generation.
    const role = registry
        .get("custom.enum")
        .generate({
            values: ["admin", "user", "guest"]
        });

    assert.ok(["admin", "user", "guest"].includes(role));

    console.log("PASS: Enum generation:", role);

    // 7. Test constant generation.
    const constant = registry
        .get("custom.constant")
        .generate({ value: "active" });

    assert.equal(constant, "active");

    console.log("PASS: Constant generation:", constant);

    // 8. Test ObjectId generation.
    const objectId = registry
        .get("custom.objectId")
        .generate();

    assert.equal(typeof objectId.toHexString, "function");
    assert.equal(objectId.toHexString().length, 24);

    console.log(
        "PASS: ObjectId generation:",
        objectId.toHexString()
    );

    // 9. Test array generation.
    const array = registry
        .get("custom.array")
        .generate({
            count: 3,
            itemGenerator: index => index + 1
        });

    assert.deepEqual(array, [1, 2, 3]);

    console.log("PASS: Array generation:", array);

    // 10. Test category filtering.
    const personGenerators = registry.listByCategory("person");

    assert.ok(personGenerators.length > 0);
    assert.ok(
        personGenerators.every(
            generator => generator.category === "person"
        )
    );

    console.log(
        "PASS: Category filtering:",
        personGenerators.length,
        "person generators"
    );

    // 11. Test metadata.
    const generator = registry.get("person.fullName");

    assert.equal(generator.name, "person.fullName");
    assert.equal(generator.category, "person");
    assert.equal(generator.outputType, "String");
    assert.equal(typeof generator.description, "string");

    console.log("PASS: Generator metadata.");

    // 12. Test invalid generator lookup.
    assert.throws(
        () => registry.get("unknown.generator"),
        /is not registered/
    );

    console.log("PASS: Invalid generator lookup.");

    // 13. Test invalid registration.
    const GeneratorRegistry = require(
        "../../../src/services/generators/registry/generator-registry"
    );

    const temporaryRegistry = new GeneratorRegistry();

    assert.throws(
        () => temporaryRegistry.register({
            name: "invalid.generator"
        }),
        /Invalid generator/
    );

    console.log("PASS: Invalid registration.");

    // 14. Test duplicate registration.
    const existingGenerator = registry.get("person.fullName");

    assert.throws(
        () => registry.register(existingGenerator),
        /already registered/
    );

    console.log("PASS: Duplicate registration.");

    // 15. Test invalid numeric options.
    assert.throws(
        () => registry.get("number.integer").generate({
            min: 20,
            max: 10
        }),
        /min <= max/
    );

    console.log("PASS: Invalid numeric options.");

    console.log("\nAll generator tests passed.\n");
}

try {
    runTests();
} catch (error) {
    console.error("\nTEST FAILED:", error.message);
    process.exitCode = 1;
}