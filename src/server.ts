// import mongoose from "mongoose";
// import app from "./app";
// import { Server } from "http";
// import config from "./app/config";

// async function main() {
//   await mongoose.connect(config.dbUri as string);
// }
// let server: Server;
// server = app.listen(config.port, () => {
//   console.log(`Example app listening on port ${config.port}`);
// });
// main();
// process.on("unhandledRejection", () => {
//   console.log(` unahandledRejection is detected , shutting down ...`);
//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }
//   process.exit(1);
// });
// process.on("uncaughtException", () => {
//   console.log(`😈 uncaughtException is detected , shutting down ...`);
//   process.exit(1);
// });
// // console.log(hello);
import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";
import config from "./app/config";

// Main function for database connection
async function main() {
  try {
    await mongoose.connect(config.dbUri as string);
    console.log("Connected to the database successfully.");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process if the database connection fails
  }
}

let server: Server;

server = app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});

main();

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason: any) => {
  console.error("Unhandled Rejection detected:", reason);
  if (server) {
    server.close(() => {
      console.log("Server closed due to unhandled rejection.");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception detected:", error);
  process.exit(1);
});
