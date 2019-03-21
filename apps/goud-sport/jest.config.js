module.exports = {
  name: "goud-sport",
  preset: "../../jest.config.js",
  coverageDirectory: "../../coverage/apps/goud-sport/",
  snapshotSerializers: [
    "jest-preset-angular/AngularSnapshotSerializer.js",
    "jest-preset-angular/HTMLCommentSerializer.js"
  ]
};
