
import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import fs from "fs";

import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),

    {
      name: "watch-and-write-json",

      configureServer(server) {
        server.middlewares.use((req, res, next) => {

          // =========================
          // POST - Add new name
          // =========================

          if (
            req.method === "POST" &&
            req.url === "/api/names"
          ) {
            let body = "";

            req.on("data", (chunk) => {
              body += chunk;
            });

            req.on("end", () => {
              const newName = JSON.parse(body);

              const filePath = path.resolve(
                __dirname,
                "data.json"
              );

              const data = JSON.parse(
                fs.readFileSync(filePath, "utf-8")
              );

              const newId =
                data.length > 0
                  ? Math.max(...data.map((item) => item.id)) + 1
                  : 1;

              const newItem = {
                id: newId,
                name: newName.name,
              };

              data.push(newItem);

              fs.writeFileSync(
                filePath,
                JSON.stringify(data, null, 2),
                "utf-8"
              );

              res.statusCode = 201;

              res.setHeader(
                "Content-Type",
                "application/json"
              );

              res.end(
                JSON.stringify(newItem)
              );
            });

            return;
          }


          // =========================
          // PUT - Edit existing name
          // =========================

          if (
            req.method === "PUT" &&
            req.url.startsWith("/api/names/")
          ) {
            const id = Number(
              req.url.split("/").pop()
            );

            let body = "";

            req.on("data", (chunk) => {
              body += chunk;
            });

            req.on("end", () => {
              const updatedName = JSON.parse(body);

              const filePath = path.resolve(
                __dirname,
                "data.json"
              );

              const data = JSON.parse(
                fs.readFileSync(filePath, "utf-8")
              );

              const item = data.find(
                (item) => item.id === id
              );

              if (!item) {
                res.statusCode = 404;

                res.setHeader(
                  "Content-Type",
                  "application/json"
                );

                res.end(
                  JSON.stringify({
                    error: "Name not found",
                  })
                );

                return;
              }

              item.name = updatedName.name;

              fs.writeFileSync(
                filePath,
                JSON.stringify(data, null, 2),
                "utf-8"
              );

              res.statusCode = 200;

              res.setHeader(
                "Content-Type",
                "application/json"
              );

              res.end(
                JSON.stringify(item)
              );
            });

            return;
          }


          // =========================
          // DELETE - Delete existing name
          // =========================

          if (
            req.method === "DELETE" &&
            req.url.startsWith("/api/names/")
          ) {
            const id = Number(
              req.url.split("/").pop()
            );

            const filePath = path.resolve(
              __dirname,
              "data.json"
            );

            const data = JSON.parse(
              fs.readFileSync(filePath, "utf-8")
            );

            const itemExists = data.some(
              (item) => item.id === id
            );

            if (!itemExists) {
              res.statusCode = 404;

              res.setHeader(
                "Content-Type",
                "application/json"
              );

              res.end(
                JSON.stringify({
                  error: "Name not found",
                })
              );

              return;
            }

            const updatedData = data.filter(
              (item) => item.id !== id
            );

            fs.writeFileSync(
              filePath,
              JSON.stringify(updatedData, null, 2),
              "utf-8"
            );

            res.statusCode = 200;

            res.setHeader(
              "Content-Type",
              "application/json"
            );

            res.end(
              JSON.stringify({
                success: true,
              })
            );

            return;
          }


          // =========================
          // Other requests
          // =========================

          next();
        });
      },
    },
  ],
});

