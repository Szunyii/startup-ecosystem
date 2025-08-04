// lib/sshDbConnect.ts
import { Client } from "ssh2";
import mysql from "mysql2/promise";

const sshConfig = {
  host: "10.100.200.85",
  port: 22,
  username: "startuproot",
  password: "RollingStones1964!",
};

const dbConfig = {
  host: "127.0.0.1",
  port: 3306,
  user: "oeiguser",
  password: "OnRouteOf66!",
  database: "oeig",
};

const forwardConfig = {
  srcHost: "127.0.0.1",
  srcPort: 3306,
  dstHost: "127.0.0.1",
  dstPort: 3306,
};

export async function getData() {
  const ssh = new Client();

  return new Promise<any[]>(async (resolve, reject) => {
    ssh.on("ready", () => {
      ssh.forwardOut(
        forwardConfig.srcHost,
        forwardConfig.srcPort,
        forwardConfig.dstHost,
        forwardConfig.dstPort,
        async (err, stream) => {
          if (err) {
            ssh.end();
            return reject(err);
          }

          try {
            const connection = await mysql.createConnection({
              ...dbConfig,
              stream: stream,
            });

            const [rows] = await connection.query(
              "SELECT * FROM pelda LIMIT 10"
            );
            await connection.end();
            ssh.end();

            resolve(rows as any[]);
          } catch (queryError) {
            ssh.end();
            reject(queryError);
          }
        }
      );
    });

    ssh.on("error", reject);
    ssh.connect(sshConfig);
  });
}
