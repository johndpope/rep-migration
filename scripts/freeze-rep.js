#!/usr/bin/env node

const path = require("path");
const rpc = require("ethrpc");
const freezeRep = require("../lib/freeze-rep");

const FREEZE_REP_FILE = path.join(__dirname, "..", "data", "freeze-rep.json");

rpc.setDebugOptions({ connect: true, broadcast: false });

rpc.connect({
  httpAddresses: ["http://127.0.0.1:8545"],
  wsAddresses: ["ws://127.0.0.1:8546"],
  ipcAddresses: [process.env.GETH_IPC || path.join(process.env.HOME, ".ethereum", "geth.ipc")],
  errorHandler: () => {}
}, () => {
  if (rpc.getNetworkID() !== process.env.EXPECTED_NETWORK_ID) return process.exit(1);
  freezeRep(rpc, process.env.SENDER || rpc.getCoinbase(), FREEZE_REP_FILE, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(0);
  });
});
