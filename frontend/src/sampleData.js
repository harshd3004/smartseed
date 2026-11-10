
export const sampleGenerationPlan = {
  models: [
    {
      name: "Content",
      collection: "contents",
      count: 100,
      fields: [
        { name: "headline", type: "String", generator: "lorem.sentence", source: "ai", status: "resolved" },
        { name: "tagline", type: "String", generator: "lorem.sentence", source: "rule", status: "resolved" },
        { name: "manufacturer", type: "String", generator: "company.name", source: "ai", status: "resolved" },
        { name: "socialHandle", type: "String", generator: "internet.username", source: "ai", status: "resolved" },
        { name: "avatarUrl", type: "String", generator: "internet.url", source: "rule", status: "resolved" },
        { name: "region", type: "String", generator: "location.state", source: "ai", status: "resolved" },
        { name: "postal", type: "String", generator: "location.zipCode", source: "rule", status: "resolved" },
        { name: "visitCount", type: "Number", generator: "number.integer", source: "rule", status: "resolved" },
        { name: "averageScore", type: "Number", generator: "number.float", source: "ai", status: "resolved" },
        { name: "publishedOn", type: "Date", generator: "date.past", source: "ai", status: "resolved" },
        { name: "lastSeenAt", type: "Date", generator: "date.recent", source: "rule", status: "resolved" },
        { name: "internalNotes", type: "String", generator: "lorem.paragraph", source: "ai", status: "resolved" },
        { name: "membershipLevel", type: "String", generator: "lorem.word", source: "ai", status: "resolved" },
        { name: "isVerified", type: "Boolean", generator: "custom.boolean", source: "rule", status: "resolved" },
      ],
    },
  ],
};
