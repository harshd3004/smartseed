class GeneratorRegistry {
    constructor() {
        this.generators = new Map();
    }

    register(generator) {
        if (
            !generator ||
            typeof generator.name !== "string" ||
            !generator.name.trim() ||
            typeof generator.generate !== "function"
        ) {
            throw new Error(
                "Invalid generator: name and generate() are required."
            );
        }

        if (this.generators.has(generator.name)) {
            throw new Error(
                `Generator "${generator.name}" is already registered.`
            );
        }

        this.generators.set(generator.name, {
            name: generator.name,
            category: generator.category || "custom",
            outputType: generator.outputType || "Any",
            description: generator.description || "",
            generate: generator.generate
        });

        return this;
    }

    get(name) {
        const generator = this.generators.get(name);

        if (!generator) {
            throw new Error(
                `Generator "${name}" is not registered.`
            );
        }

        return generator;
    }

    has(name) {
        return this.generators.has(name);
    }

    list() {
        return Array.from(this.generators.values());
    }

    listByCategory(category) {
        return this.list().filter(
            generator => generator.category === category
        );
    }

    unregister(name) {
        return this.generators.delete(name);
    }

    clear() {
        this.generators.clear();
    }

    get size() {
        return this.generators.size;
    }
}

module.exports = GeneratorRegistry;